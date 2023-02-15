//Class responsible for getting additional stats for users. 

class StatsProvider {
    constructor() {
        this.baseUrl = 'https://api.github.com';
    }

    //All Stats Given
    async getStats(username) {

        const repos = await this._getRepos(username);
        const numStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const numForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

        //Runs these in parellel to get faster load time
        const [numCommits, numPullRequest, numIssues, numOrganizations] = await Promise.all([
            this.getCommitCount(username, repos),
            this.getPullRequestCount(username, repos),
            this.getIssueCount(username, repos),
            this.getOrganizationCount(username),
        ]);

        //Was having issues with this. FIXME
       // const numDiscussions = await this.getDiscussionCount(username);


        return {
            numStars,
            numForks,
            numCommits,
            numPullRequest,
            numIssues,
            //numDiscussions
            numOrganizations
        };
    }

    //Specific Counts
    async getCommitCount(username, repos) {
        let commitCount = 0;
        for (const repo of repos) {
            const commits = await this._getCommits(repo.url);
            commitCount += commits.length;
        }
        console.log(`${username} has ${commitCount} total commits.`);
        return commitCount;
    }

    async getPullRequestCount(username, repos) {
        let pullRequestCount = 0;
        for (const repo of repos) {
            const pullRequests = await this._getPullRequests(repo.url);
            pullRequestCount += pullRequests.length;
        }
        console.log(`${username} has created ${pullRequestCount} pull requests.`);
        return pullRequestCount;
    }

    async getIssueCount(username, repos) {
        let issueCount = 0;
        for (const repo of repos) {
            const issues = await this._getIssues(repo.url);
            issueCount += issues.length;
        }
        console.log(`${username} has opened ${issueCount} issues.`);
        return issueCount;
    }

    async getDiscussionCount(username) {
        const repos = await this._getRepos(username);
        let discussionCount = 0;
        for (const repo of repos) {
            const discussions = await this._getDiscussions(repo.url);
            discussionCount += discussions.length;
        }
        console.log(`${username} has opened ${discussionCount} discussions.`);
        return discussionCount;
    }

    async getOrganizationCount(username) {
        const orgs = await this._getOrganizations(username);
        console.log(`${username} has created ${orgs.length} organizations.`);
        return orgs.length;
    }


    //API Calls
    async _getRepos(username) {
        const response = await fetch(`${this.baseUrl}/users/${username}/repos`);
        if (!response.ok) {
            throw new Error(`Failed to get repos for ${username}`);
        }
        return await response.json();
    }

    async _getPullRequests(repoUrl) {
        const response = await fetch(`${repoUrl}/pulls`);
        if (!response.ok) {
            throw new Error(`Failed to get pull requests for ${repoUrl}`);
        }
        return await response.json();
    }

    async _getIssues(repoUrl) {
        const response = await fetch(`${repoUrl}/issues`);
        if (!response.ok) {
            throw new Error(`Failed to get issues for ${repoUrl}`);
        }
        return await response.json();
    }

    async _getDiscussions(repoUrl) {
        const response = await fetch(`${repoUrl}/discussions`);
        if (!response.ok) {
            throw new Error(`Failed to get discussions for ${repoUrl}`);
        }
        return await response.json();
    }

    async _getOrganizations(username) {
        const response = await fetch(`${this.baseUrl}/users/${username}/orgs`);
        if (!response.ok) {
            throw new Error(`Failed to get organizations for ${username}`);
        }
        return await response.json();
    }

    async _getCommits(repoUrl) {
        const response = await fetch(`${repoUrl}/commits`);
        if (!response.ok) {
            throw new Error(`Failed to get commits for ${repoUrl}`);
        }
        return await response.json();
    }
}

export { StatsProvider };

