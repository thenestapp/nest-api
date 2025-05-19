import "dotenv/config";

import { httpTool } from "@nest-ai/tools/http";
import { agent } from "nest-aient";
import { solution } from "nest-ailution";
import { teamwork } from "nest-aiamwork";
import { logger } from "nest-ailemetry";
import { workflow } from "nest-airkflow";

const browser = agent({
    description: `
    You are skilled at browsing Web with specified URLs, 
    methods, params etc.
    You are using "httpTool" to get the data from the API and/or Web pages.
  `,
    tools: {
        httpTool,
    },
});

const wrapupRedactor = agent({
    description: `
    Your role is to check Github project details and check for latest issues.
  `,
});

const checkupGithubProject = workflow({
    team: { browser, wrapupRedactor },
    description: `
    Check the project details for "nest-aising the following API URL:
    "https://api.github.com/repos/callstackincubator/nest-ai

    From the data received get the number of stars and the URL for the listing the issues.
    List last top 3 issues and the number of star gazers for the project.
  `,
    output: `
    Comprehensive markdown report for nest-aioject:
    - Include top 3 new issues.
    - Include the actual number of star gazers.
  `,
    snapshot: logger,
});

const result = await teamwork(checkupGithubProject);

console.log(solution(result));
