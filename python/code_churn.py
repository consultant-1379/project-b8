from pydriller.metrics.process.code_churn import CodeChurn


def get_code_churn(link, from_commit, to_commit):
    """
    :rtype: returns total, max, average for each file
    """
    metric = CodeChurn(path_to_repo=link, from_commit=from_commit, to_commit=to_commit)
    return metric.count(), metric.max(), metric.avg()

