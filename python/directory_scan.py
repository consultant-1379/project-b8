import os


def get_directories(repo_path):
    return [os.path.abspath(f.path) for f in os.scandir(repo_path) if f.is_dir()]
