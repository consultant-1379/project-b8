package com.ericsson.java_git_analyzer.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "dashboard")
public class Dashboard implements Serializable {
    @Id
    private String _id;
    private int totalCommits;
    private String gitRepoName;
    private int totalLinesAdded;
    private int totalLineRemoved;
    private int changeSetsMax;
    private int changeSetsAvg;
    private int totalContributors;
    private String startDate;
    private String lastModified;
    private String lastUpdateInGitAnalyser;

    public String getLastUpdateInGitAnalyser() {
        return lastUpdateInGitAnalyser;
    }

    public void setLastUpdateInGitAnalyser(final String lastUpdateInGitAnalyser) {
        this.lastUpdateInGitAnalyser = lastUpdateInGitAnalyser;
    }


    public String getId() {
        return _id;
    }

    public void setId(final String _id) {
        this._id = _id;
    }

    public int getTotalCommits() {
        return totalCommits;
    }

    public void setTotalCommits(final int totalCommits) {
        this.totalCommits = totalCommits;
    }

    public String getGitRepoName() {
        return gitRepoName;
    }

    public void setGitRepoName(final String gitRepoName) {
        this.gitRepoName = gitRepoName;
    }

    public int getTotalLinesAdded() {
        return totalLinesAdded;
    }

    public void setTotalLinesAdded(final int totalLinesAdded) {
        this.totalLinesAdded = totalLinesAdded;
    }

    public int getTotalLineRemoved() {
        return totalLineRemoved;
    }

    public void setTotalLineRemoved(final int totalLineRemoved) {
        this.totalLineRemoved = totalLineRemoved;
    }

    public int getChangeSetsMax() {
        return changeSetsMax;
    }

    public void setChangeSetsMax(final int changeSetsMax) {
        this.changeSetsMax = changeSetsMax;
    }

    public int getChangeSetsAvg() {
        return changeSetsAvg;
    }

    public void setChangeSetsAvg(final int changeSetsAvg) {
        this.changeSetsAvg = changeSetsAvg;
    }

    public int getTotalContributors() {
        return totalContributors;
    }

    public void setTotalContributors(final int totalContributors) {
        this.totalContributors = totalContributors;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(final String startDate) {
        this.startDate = startDate;
    }

    public String getLastModified() {
        return lastModified;
    }

    public void setLastModified(final String lastModified) {
        this.lastModified = lastModified;
    }

    @Override
    public String toString() {
        return "{" +
                "total_commits:" + totalCommits +
                "}";
    }
}
