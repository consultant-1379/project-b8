package com.ericsson.java_git_analyzer.entity;

import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;

@Document(collection = "file")
public class FileHistory implements Serializable {
    private String filename;
    private int codeChurnTotal;
    private int codeChurnMax;
    private int codeChurnAvg;
    private int majorContributors;
    private int minorContributors;
    private double hunksCount;
    private String gitRepo;

    public String getFilename() {
        return filename;
    }

    public void setFilename(final String filename) {
        this.filename = filename;
    }

    public int getCodeChurnTotal() {
        return codeChurnTotal;
    }

    public void setCodeChurnTotal(final int codeChurnTotal) {
        this.codeChurnTotal = codeChurnTotal;
    }

    public int getCodeChurnMax() {
        return codeChurnMax;
    }

    public void setCodeChurnMax(final int codeChurnMax) {
        this.codeChurnMax = codeChurnMax;
    }

    public int getCodeChurnAvg() {
        return codeChurnAvg;
    }

    public void setCodeChurnAvg(final int codeChurnAvg) {
        this.codeChurnAvg = codeChurnAvg;
    }

    public int getMajorContributors() {
        return majorContributors;
    }

    public void setMajorContributors(final int majorContributors) {
        this.majorContributors = majorContributors;
    }

    public int getMinorContributors() {
        return minorContributors;
    }

    public void setMinorContributors(final int minorContributors) {
        this.minorContributors = minorContributors;
    }

    public double getHunksCount() {
        return hunksCount;
    }

    public void setHunksCount(final double hunksCount) {
        this.hunksCount = hunksCount;
    }

    public String getGitRepo() {
        return gitRepo;
    }

    public void setGitRepo(final String gitRepo) {
        this.gitRepo = gitRepo;
    }
}
