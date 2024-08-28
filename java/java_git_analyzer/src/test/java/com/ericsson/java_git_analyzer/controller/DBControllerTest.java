package com.ericsson.java_git_analyzer.controller;

import com.ericsson.java_git_analyzer.DashboardInfoRetrieval;
import com.ericsson.java_git_analyzer.entity.CommitHistory;
import com.ericsson.java_git_analyzer.entity.Contributors;
import com.ericsson.java_git_analyzer.entity.Dashboard;
import com.ericsson.java_git_analyzer.entity.FileHistory;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

/***
 * NOTE:
 * To run the test, please change your database to the Test database : DBTest
 */

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class DBControllerTest {

    @Autowired
    private TestRestTemplate restTemplate;

    private List<Dashboard> dashboardList;

    private Dashboard dashboardOne;
    private Dashboard dashboardTwo;

    private CommitHistory commitHistoryOne;
    private CommitHistory commitHistoryTwo;

    private Contributors contributorOne;
    private Contributors contributorTwo;

    private FileHistory fileHistoryOne;
    private FileHistory fileHistoryTwo;

    private List<CommitHistory> commitHistoryList;

    private List<Contributors> contributorList;

    private List<FileHistory> fileHistoryList;

    private DashboardInfoRetrieval dashboardInfoRetrieval;

    @BeforeEach
    void setUp() {
        setMockData();
    }

    @Test
    public void getAllRepositoryRecordsFromDB() throws Exception {
        // when
        final ResponseEntity<String> response = restTemplate.getForEntity("/repository", String.class);
        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(dashboardList),
                response.getBody()
        );
    }

    @Test
    public void getRepositoryRecordFromDB_By_Repo_Id() throws Exception {
        //  when
        // Test: repo_id: 6040cca2e52d7b794a72658e
        final ResponseEntity<String> response = restTemplate.getForEntity("/repository/6040cca2e52d7b794a72658e", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(dashboardOne),
                response.getBody()
        );
    }

    @Test
    public void getAllCommitHistoryRecordsFromDB() throws Exception {
        //  when
        final ResponseEntity<String> response = restTemplate.getForEntity("/commithistory", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(commitHistoryList),
                response.getBody()
        );
    }

    @Test
    public void getCommitHistoryRecordFromDB_By_Repo_Id() throws Exception {
        //given
        commitHistoryList.remove(commitHistoryTwo); //remove commitHistoryTwo mock record

        // when
        // Test: Repo_id = 6040cca2e52d7b794a72658e
        final ResponseEntity<String> response = restTemplate.getForEntity("/commithistory/6040cca2e52d7b794a72658e", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(commitHistoryList),
                response.getBody()
        );
    }

    @Test
    public void getAllContributorRecordsFromDB() throws Exception {
        //  when
        final ResponseEntity<String> response = restTemplate.getForEntity("/contributor", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(contributorList),
                response.getBody()
        );
    }

    @Test
    public void getContributorRecordFromDB_By_Repo_Id() throws Exception {
        //given
        contributorList.remove(contributorTwo); // Remove contributorTwo mock record

        // when
        // Test: repo_id: 6040cca2e52d7b794a72658e
        final ResponseEntity<String> response = restTemplate.getForEntity("/contributor/6040cca2e52d7b794a72658e", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(contributorList),
                response.getBody()
        );
    }

    @Test
    public void getAllFileHistoryRecordsFromDB() throws Exception {
        // when
        final ResponseEntity<String> response = restTemplate.getForEntity("/fileHistory", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(fileHistoryList),
                response.getBody()
        );
    }

    @Test
    public void getFileHistoryRecordFromDB_By_Repo_Id() throws Exception {
        //given
        fileHistoryList.remove(fileHistoryTwo); // Remove fileHistoryTwo mock record

        // when
        // Test: repo_id: 6040cca2e52d7b794a72658e
        final ResponseEntity<String> response = restTemplate.getForEntity("/fileHistory/6040cca2e52d7b794a72658e", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(fileHistoryList),
                response.getBody()
        );
    }

    @Test
    public void getAllDashboardInfoFromDB_By_Repo_Id() throws Exception {
        //given
        fileHistoryList.remove(fileHistoryTwo);
        contributorList.remove(contributorTwo);
        commitHistoryList.remove(commitHistoryTwo);
        dashboardInfoRetrieval.setFileHistories(fileHistoryList);
        dashboardInfoRetrieval.setContributorsInfo(contributorList);
        dashboardInfoRetrieval.setCommitHistories(commitHistoryList);
        dashboardInfoRetrieval.setDashboardInfo(dashboardOne);

        // Test: repo_id: 6040cca2e52d7b794a72658e
        final ResponseEntity<String> response = restTemplate.getForEntity("/dashboard/6040cca2e52d7b794a72658e", String.class);

        // then
        final ObjectMapper objectMapper = new ObjectMapper();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(
                objectMapper.writeValueAsString(dashboardInfoRetrieval),
                response.getBody()
        );
    }

    public void setMockData() {
        // given
        dashboardList = new ArrayList<>();
        dashboardOne = new Dashboard();
        dashboardOne.setId("6040cca2e52d7b794a72658e");
        dashboardOne.setTotalCommits(17);
        dashboardOne.setGitRepoName("chat-application");
        dashboardOne.setTotalLinesAdded(7461);
        dashboardOne.setTotalLineRemoved(198);
        dashboardOne.setChangeSetsMax(9);
        dashboardOne.setChangeSetsAvg(4);
        dashboardOne.setTotalContributors(2);
        dashboardOne.setStartDate("2018-12-07");
        dashboardOne.setLastModified("2020-06-08");
        dashboardList.add(dashboardOne);

        dashboardTwo = new Dashboard();
        dashboardTwo.setId("6041164d9ee9e73a77b6264d");
        dashboardTwo.setTotalCommits(22);
        dashboardTwo.setGitRepoName("chat-application");
        dashboardTwo.setTotalLinesAdded(3213);
        dashboardTwo.setTotalLineRemoved(112);
        dashboardTwo.setChangeSetsMax(16);
        dashboardTwo.setChangeSetsAvg(12);
        dashboardTwo.setTotalContributors(2);
        dashboardTwo.setStartDate("2018-12-07");
        dashboardTwo.setLastModified("2020-06-08");
        dashboardList.add(dashboardTwo);

        commitHistoryList = new ArrayList<>();
        commitHistoryOne = new CommitHistory();
        commitHistoryOne.setHashValue("5ca06ad690c51e8e6cff65d7e5f5d2e08734104d");
        commitHistoryOne.setAuthorName("omijo");
        commitHistoryOne.setCommitMessage("Style changes");
        commitHistoryOne.setCommitInsertion(11);
        commitHistoryOne.setCommitDeletion(14);
        commitHistoryOne.setCommitDate("2020-06-08");
        commitHistoryOne.setRepoName("chat-application");
        commitHistoryList.add(commitHistoryOne);

        commitHistoryTwo = new CommitHistory();
        commitHistoryTwo.setHashValue("5ca06ad690c51e8e6cff65d7e5f5d2e08734104d");
        commitHistoryTwo.setAuthorName("omijo2");
        commitHistoryTwo.setCommitMessage("Style changes");
        commitHistoryTwo.setCommitInsertion(33);
        commitHistoryTwo.setCommitDeletion(22);
        commitHistoryTwo.setCommitDate("2020-06-08");
        commitHistoryTwo.setRepoName("chat-application");
        commitHistoryList.add(commitHistoryTwo);

        contributorList = new ArrayList<>();
        contributorOne = new Contributors();
        contributorOne.setContributorName("Omkar");
        contributorOne.setDeletions(184);
        contributorOne.setInsertions(7450);
        contributorList.add(contributorOne);

        contributorTwo = new Contributors();
        contributorTwo.setContributorName("Omkar2");
        contributorTwo.setDeletions(333);
        contributorTwo.setInsertions(4444);
        contributorList.add(contributorTwo);

        fileHistoryList = new ArrayList<>();
        fileHistoryOne = new FileHistory();
        fileHistoryOne.setFilename("public\\css\\style.css");
        fileHistoryOne.setCodeChurnTotal(192);
        fileHistoryOne.setCodeChurnMax(195);
        fileHistoryOne.setCodeChurnAvg(96);
        fileHistoryOne.setMajorContributors(1);
        fileHistoryOne.setMinorContributors(0);
        fileHistoryOne.setHunksCount(2.5);
        fileHistoryOne.setGitRepo("chat-application");
        fileHistoryList.add(fileHistoryOne);

        fileHistoryTwo = new FileHistory();
        fileHistoryTwo.setFilename("public\\css\\style.css");
        fileHistoryTwo.setCodeChurnTotal(543);
        fileHistoryTwo.setCodeChurnMax(321);
        fileHistoryTwo.setCodeChurnAvg(54);
        fileHistoryTwo.setMajorContributors(2);
        fileHistoryTwo.setMinorContributors(1);
        fileHistoryTwo.setHunksCount(2.5);
        fileHistoryTwo.setGitRepo("chat-application");
        fileHistoryList.add(fileHistoryTwo);

        dashboardInfoRetrieval = new DashboardInfoRetrieval();
    }

    @AfterEach
    void tearDown() {

    }

}