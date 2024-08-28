package com.ericsson.java_git_analyzer;

import com.ericsson.java_git_analyzer.entity.CommitHistory;
import com.ericsson.java_git_analyzer.entity.Contributors;
import com.ericsson.java_git_analyzer.entity.Dashboard;
import com.ericsson.java_git_analyzer.entity.FileHistory;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class DashboardInfoRetrieval implements Serializable {
    private List<FileHistory> fileHistories = new ArrayList<>();
    private List<Contributors> contributorsInfo = new ArrayList<>();
    private List<CommitHistory> commitHistories = new ArrayList<>();
    private Dashboard dashboardInfo = new Dashboard();

    public List<FileHistory> getFileHistories() {
        return fileHistories;
    }

    public void setFileHistories(List<FileHistory> fileHistories) {
        this.fileHistories = fileHistories;
    }

    public List<Contributors> getContributorsInfo() {
        return contributorsInfo;
    }

    public void setContributorsInfo(List<Contributors> contributorsInfo) {
        this.contributorsInfo = contributorsInfo;
    }

    public List<CommitHistory> getCommitHistories() {
        return commitHistories;
    }

    public void setCommitHistories(List<CommitHistory> commitHistories) {
        this.commitHistories = commitHistories;
    }

    public Dashboard getDashboardInfo() {
        return dashboardInfo;
    }

    public void setDashboardInfo(Dashboard dashboardInfo) {
        this.dashboardInfo = dashboardInfo;
    }
}
