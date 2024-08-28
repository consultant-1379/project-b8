package com.ericsson.java_git_analyzer.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "contributors")
public class Contributors implements Serializable {
    private String contributorName;
    private int insertions;
    private int deletions;


    public int getContributions() {
        return contributions;
    }

    public void setContributions(final int contributions) {
        this.contributions = contributions;
    }

    private int contributions;

    public String getContributorName() {
        return contributorName;
    }

    public void setContributorName(final String contributorName) {
        this.contributorName = contributorName;
    }

    public int getInsertions() {
        return insertions;
    }

    public void setInsertions(final int insertions) {
        this.insertions = insertions;
    }

    public int getDeletions() {
        return deletions;
    }

    public void setDeletions(final int deletions) {
        this.deletions = deletions;
    }
}
