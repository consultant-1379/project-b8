from pydriller.metrics.process.contributors_count import ContributorsCount


def get_contributor_count(link, from_commit, to_commit):
    metric = ContributorsCount(path_to_repo=link, from_commit=from_commit, to_commit=to_commit)
    return metric.count(), metric.count_minor()

