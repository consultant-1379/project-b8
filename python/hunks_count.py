from pydriller.metrics.process.hunks_count import HunksCount


def get_hunks_count(link, from_commit, to_commit):
    """

    :rtype: returns hunks count for each file
    """
    return HunksCount(path_to_repo=link, from_commit=from_commit, to_commit=to_commit).count()

