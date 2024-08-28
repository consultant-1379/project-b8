from pydriller import RepositoryMining


class RepoMetrics:

    def __init__(self, repo_link):
        self.__repo_object = RepositoryMining(repo_link, order='reverse')
        self.__contributor_data = {}
        self.__all_commit_details = []
        self.__total_number_of_lines_added = 0
        self.__total_number_of_lines_removed = 0

    def create_data(self):
        for commit in self.__repo_object.traverse_commits():
            self.contributor_information(commit)
            self.add_commit_detail(commit)
            self.add_lines_code_added(commit)
            self.add_lines_code_removed(commit)

    def contributor_information(self, commit):
        if commit.author.name not in self.__contributor_data:
            self.__contributor_data[commit.author.name] = {'insertions': commit.insertions,
                                                           'deletions': commit.deletions,
                                                           'contributions': 0}
        else:
            self.__contributor_data[commit.author.name]['insertions'] += commit.insertions
            self.__contributor_data[commit.author.name]['deletions'] += commit.deletions
            self.__contributor_data[commit.author.name]['contributions'] += 1

    # Function to get all commit details and number of commits using length
    def add_commit_detail(self, commit):
        self.__all_commit_details.append({
            'hashValue': commit.hash,
            'authorName': commit.author.name,
            'commitMessage': commit.msg,
            'commitInsertion': commit.insertions,
            'commitDeletion': commit.deletions,
            'commitDate': "{}-{}-{}".format(commit.committer_date.date().day, commit.committer_date.date().month, commit.committer_date.date().year),
            'repoName': commit.project_name,
        })

    # Return total number of lines of code added in the repo
    def add_lines_code_added(self, commit):
        self.__total_number_of_lines_added += commit.insertions

    # Return total number of lines of code removed in the repo
    def add_lines_code_removed(self, commit):
        self.__total_number_of_lines_removed += commit.deletions

    def get_all_contributor_information(self):
        return self.__contributor_data

    def get_all_commit_details(self):
        return self.__all_commit_details

    def get_number_of_lines_code_added(self):
        return self.__total_number_of_lines_added

    def get_number_of_lines_code_removed(self):
        return self.__total_number_of_lines_removed
