package com.ericsson.java_git_analyzer.controller;

import com.ericsson.java_git_analyzer.DashboardInfoRetrieval;
import com.ericsson.java_git_analyzer.entity.CommitHistory;
import com.ericsson.java_git_analyzer.entity.Contributors;
import com.ericsson.java_git_analyzer.entity.Dashboard;
import com.ericsson.java_git_analyzer.entity.FileHistory;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class DBController {

    @Autowired
    MongoTemplate mongoTemplate;

    private static final String REPO_ID = "repoId";
    private static final String DASHBOARD_ID = "_id";

    //Get All repository Information
    @GetMapping("/repository")
    public String getAllRepositoryInformation() throws JsonProcessingException {
        final List<Dashboard> allRepositoryInfo = mongoTemplate.findAll(Dashboard.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(allRepositoryInfo);
        return jsonString;
    }

    // Get Dashboard with git repo url
    @GetMapping("/repository/{repoId}")
    public String getrepositoryInformationFromRepoId(@PathVariable final String repoId) throws JsonProcessingException {
        final Query query = new Query(Criteria.where(DASHBOARD_ID).is(repoId));
        final Dashboard repositoryInfo = mongoTemplate.findOne(query, Dashboard.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(repositoryInfo);
        return jsonString;
    }

    //Get All commit History records from Database
    @GetMapping("/commithistory")
    public String getCommitHistory() throws JsonProcessingException {
        final List<CommitHistory> commitHistory = mongoTemplate.findAll(CommitHistory.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(commitHistory);
        return jsonString;
    }

    // Commit history with git repo url
    @GetMapping("/commithistory/{repoId}")
    public String getCommitHistoryFromRepoId(@PathVariable final String repoId) throws JsonProcessingException {
        final Query query = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<CommitHistory> commitHistoryInfo = mongoTemplate.find(query, CommitHistory.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(commitHistoryInfo);
        return jsonString;
    }

    //Get All contributor information from Database
    @GetMapping(value = "/contributor")
    @ResponseBody
    public List<Contributors> getContributorInformation() {
        return mongoTemplate.findAll(Contributors.class);
    }

    // Commit Contributor with git repo url
    @GetMapping("/contributor/{repoId}")
    public String getContributionInfoFromRepoId(@PathVariable final String repoId) throws JsonProcessingException {
        final Query query = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<Contributors> contributorsInfo = mongoTemplate.find(query, Contributors.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(contributorsInfo);
        return jsonString;
    }

    //Get All file information from Database
    @GetMapping("/fileHistory")
    public String getFileHistory() throws JsonProcessingException {
        final List<FileHistory> allFileHistory = mongoTemplate.findAll(FileHistory.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(allFileHistory);
        return jsonString;
    }

    // Commit File history information with git repo url
    @GetMapping("/fileHistory/{repoId}")
    public String getFileHistoryInfoFromRepoId(@PathVariable final String repoId) throws JsonProcessingException {
        final Query query = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<FileHistory> fileHistory = mongoTemplate.find(query, FileHistory.class);
        final ObjectMapper mapper = new ObjectMapper();
        String jsonString = null;
        jsonString = mapper.writeValueAsString(fileHistory);
        return jsonString;
    }

    // Get Dashboard information
    @GetMapping("/dashboard/{repoId}")
    public DashboardInfoRetrieval getDashboardInformationFromRepoId(@PathVariable final String repoId) {

        final DashboardInfoRetrieval dashboardInfoRetrieval = new DashboardInfoRetrieval();

        // Get file history data
        final Query queryFile = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<FileHistory> fileHistories = mongoTemplate.find(queryFile, FileHistory.class);
        dashboardInfoRetrieval.setFileHistories(fileHistories);

        // Get Repository Information data
        final Query queryRepo = new Query(Criteria.where(DASHBOARD_ID).is(repoId));
        final Dashboard repositoryInfo = mongoTemplate.findOne(queryRepo, Dashboard.class);
        dashboardInfoRetrieval.setDashboardInfo(repositoryInfo);

        //Get commit history data
        final Query queryCommitHistory = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<CommitHistory> commitHistoryInfo = mongoTemplate.find(queryCommitHistory, CommitHistory.class);
        dashboardInfoRetrieval.setCommitHistories(commitHistoryInfo);

        // Get contributor Info
        final Query queryContributor = new Query(Criteria.where(REPO_ID).is(repoId));
        final List<Contributors> contributorsInfo = mongoTemplate.find(queryContributor, Contributors.class);
        dashboardInfoRetrieval.setContributorsInfo(contributorsInfo);

        return dashboardInfoRetrieval;
    }

}
