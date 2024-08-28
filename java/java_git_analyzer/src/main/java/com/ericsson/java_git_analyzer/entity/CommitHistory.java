package com.ericsson.java_git_analyzer.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "history")
public class CommitHistory implements Serializable {

    private String authorName;
    private String hashValue;
    private String commitMessage;
    private int commitInsertion;
    private int commitDeletion;
    private String commitDate;
    private String repoName;

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getHashValue() {
        return hashValue;
    }

    public void setHashValue(String hashValue) {
        this.hashValue = hashValue;
    }

    public String getCommitMessage() {
        return commitMessage;
    }

    public void setCommitMessage(String commitMessage) {
        this.commitMessage = commitMessage;
    }

    public int getCommitInsertion() {
        return commitInsertion;
    }

    public void setCommitInsertion(int commitInsertion) {
        this.commitInsertion = commitInsertion;
    }

    public int getCommitDeletion() {
        return commitDeletion;
    }

    public void setCommitDeletion(int commitDeletion) {
        this.commitDeletion = commitDeletion;
    }

    public String getCommitDate() {
        return commitDate;
    }

    public void setCommitDate(String commitDate) {
        this.commitDate = commitDate;
    }

    public String getRepoName() {
        return repoName;
    }

    public void setRepoName(String repoName) {
        this.repoName = repoName;
    }
}
