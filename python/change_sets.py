from pydriller.metrics.process.change_set import ChangeSet


def get_change_sets(link, from_commit, to_commit):
    """

    :rtype: returns max, average for all commits
    """
    metric = ChangeSet(path_to_repo=link,
                       from_commit=from_commit,
                       to_commit=to_commit)

    return metric.max(), metric.avg()

