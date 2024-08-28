from datetime import datetime

from repo_metrics import *
from change_sets import get_change_sets
from code_churn import get_code_churn
from hunks_count import get_hunks_count
from major_minor_contributors import get_contributor_count
import pymongo
import uuid


def test_mongodb(db_link="mongodb://localhost:27017/"):
    myclient = pymongo.MongoClient(db_link)
    mydb = myclient["teamDb"]
    mycol = mydb["sites"]
    mydict = {"name": "google", "alexa": "10000", "url": "https://www.google.com"}
    x = mycol.insert_one(mydict)
    print(x)
    dblist = myclient.list_database_names()
    print(dblist)
    if "teamDb" in dblist:
        print("db exist")


def connect_to_db(db_link, db_name):
    myclient = pymongo.MongoClient(db_link)
    mydb = myclient[db_name]
    return mydb


def write_data_to_db(repo_link, db_link, db_name):
    try:
        # connect to database(requires db link and db name)
        mydb = connect_to_db(db_link, db_name)
        print("scanning......" + repo_link)

        repo_object = RepoMetrics(repo_link)
        repo_object.create_data()

        # All commits details
        all_commits_details = repo_object.get_all_commit_details()

        # Total number of commits
        total_number_of_commits = len(all_commits_details)

        # Total number of lines of code added
        total_number_of_lines_code_added = repo_object.get_number_of_lines_code_added()

        # Total number of lines of code removed
        total_number_of_lines_code_removed = repo_object.get_number_of_lines_code_removed()

        oldest_commit = all_commits_details[len(all_commits_details) - 1].get('hashValue')
        last_commit_added_to_the_repo = all_commits_details[0].get('hashValue')

        # print(total_number_of_commits)
        # print(total_number_of_lines_code_added)
        # print(total_number_of_lines_code_removed)
        #
        # print('======================= all commits =======================')
        # print(all_commits_details)

        change_sets_max, change_sets_average = get_change_sets(repo_link,
                                                               from_commit=oldest_commit,
                                                               to_commit=last_commit_added_to_the_repo)
        # print('======================= change sets =======================')
        # print(change_sets_max)
        # print(change_sets_average)

        # Code Churn
        code_churn_total, code_churn_max, code_churn_average = get_code_churn(repo_link,
                                                                              from_commit=oldest_commit,
                                                                              to_commit=last_commit_added_to_the_repo)

        # print('======================= code churn =======================')
        # print(code_churn_total)
        # print(code_churn_max)
        # print(code_churn_average)

        # Major and minor contributors per file
        major_contributors_per_file, minor_contributors_per_file = get_contributor_count(
            repo_link,
            from_commit=oldest_commit,
            to_commit=last_commit_added_to_the_repo)

        # print('======================= major and minor contributors per file =======================')
        #
        # print(major_contributors_per_file)
        # print(minor_contributors_per_file)

        # contributions per contributor
        contributor_information_dictionary = repo_object.get_all_contributor_information()

        # print('======================= major and minor contributors per file =======================')
        # for key, value in contributor_information_dictionary.items():
        #     print(key, "insertions:", value.get('insertions'), 'deletions:', value.get('deletions'))

        # hunks count
        hunks_count_per_file = get_hunks_count(repo_link,
                                               from_commit=oldest_commit,
                                               to_commit=last_commit_added_to_the_repo)

        # print('======================= hunks count per file =======================')
        # print(hunks_count_per_file)

        ####################### start to write data to database ########################
        # repo_id = uuid.uuid4()
        # repo_id = str(repo_id)

        currentdate = datetime.now()
        repo_id = write_standard_dashboard_data_to_db(total_number_of_commits,
                                                      all_commits_details[0].get('repoName'),
                                                      total_number_of_lines_code_added,
                                                      total_number_of_lines_code_removed,
                                                      change_sets_max,
                                                      change_sets_average,
                                                      len(contributor_information_dictionary.keys()),
                                                      all_commits_details[0].get('commitDate'),
                                                      all_commits_details[len(all_commits_details) - 1].get('commitDate'),
                                                      repo_link,
                                                      mydb,
                                                      "dashboard",
                                                      currentdate.strftime("%x")
                                                      )

        write_commit_history_to_db(all_commits_details, repo_link, mydb, "history", repo_id)

        write_contributor_to_db(contributor_information_dictionary, repo_link, mydb, "contributors", repo_id)

        write_file_history_to_db(all_commits_details[0].get('repoName'), code_churn_total, code_churn_max,
                                 code_churn_average,
                                 major_contributors_per_file,
                                 minor_contributors_per_file, hunks_count_per_file, repo_link, mydb, "file", repo_id, )
        print("Processed Successfully")
        return {"correct": True, "error": False}
    except Exception as err:
        print("Exception occurred")
        print(err)
        return {"correct": False, "error": True}


def write_commit_history_to_db(history, repo_link, mydb, set_name, repo_id):
    table = mydb[set_name]
    for ele in history:
        ele["commitDate"] = str(ele["commitDate"])
    # print(history)

    delete_history_data = {"repoUrl": repo_link}
    table.delete_many(delete_history_data)
    # table.insert_many(history)
    for line in history:
        # print(type(line))
        line["repoUrl"] = repo_link
        line["repoId"] = repo_id
        table.insert_one(line)


def write_contributor_to_db(data, repo_link, mydb, set_name, repo_id):
    collection = mydb[set_name]
    delete_contributor_data = {"repoUrl": repo_link}
    collection.delete_many(delete_contributor_data)
    for key, value in data.items():
        collection.insert_one({
            'contributorName': key,
            'insertions': value.get('insertions'),
            'deletions': value.get('deletions'),
            'contributions': value.get('contributions'),
            'repoUrl': repo_link,
            'repoId': repo_id
        }
        )


def write_file_history_to_db(reponame, code_churn_total, code_churn_max, code_churn_avg, contributors_major,
                             contributors_minor, hunks, repo_url, mydb, set_name, repo_id):
    collection = mydb[set_name]

    delete_file_history_data = {"repoUrl": repo_url}
    collection.delete_many(delete_file_history_data)
    for key, value in code_churn_total.items():
        collection.insert_one(
            {
                'filename': key,
                'codeChurnTotal': value,
                'codeChurnMax': code_churn_max[key] if key in code_churn_max else 0,
                'codeChurnAvg': code_churn_avg[key] if key in code_churn_avg else 0,
                'majorContributors': contributors_major[key] if key in contributors_major else 0,
                'minorContributors': contributors_minor[key] if key in contributors_minor else 0,
                'hunksCount': hunks[key] if key in hunks else 0,
                'gitRepo': reponame,
                'repoUrl': repo_url,
                'repoId': repo_id
            }
        )


def write_standard_dashboard_data_to_db(total_commits,
                                        git_repo_name,
                                        total_lines_added,
                                        total_line_removed,
                                        change_sets_max,
                                        change_sets_avg,
                                        total_contributors,
                                        last_modified,
                                        start_date,
                                        repo_url,
                                        mydb,
                                        set_name,
                                        last_updated_in_mongo
                                        ):
    collection = mydb[set_name]
    dashboard_result = collection.update_one({
        "repoUrl": repo_url
    },
        {"$set": {
            'totalCommits': total_commits,
            'gitRepoName': git_repo_name,
            'totalLinesAdded': total_lines_added,
            'totalLineRemoved': total_line_removed,
            'changeSetsMax': change_sets_max,
            'changeSetsAvg': change_sets_avg,
            'totalContributors': total_contributors,
            'startDate': start_date,
            'lastModified': last_modified,
            'repoUrl': repo_url,
            'lastUpdateInGitAnalyser': last_updated_in_mongo
        }
        }, upsert=True
    )
    repos_id = dashboard_result.upserted_id
    if repos_id is None:
        result = collection.find_one({"repoUrl": repo_url})
        return str(result["_id"])

    return str(repos_id)

# # test_mongodb()
# repos = ['https://github.com/omijoshi09/chat-application.git', 'https://github.com/masons40/CodeSmell.git',
#          'https://github.com/Nosleep2008/doormate-teamwork-ucd']
# write_data_to_db('https://github.com/omijoshi09/chat-application.git', "mongodb://mongo:27017/", "Team2db")
#
