import "dotenv/config";

import { solution } from "nest-ai/solution";
import { teamwork } from "nest-aiamwork";

import { wrapUpTheNewsWorkflow } from "./news_wrap_up.config.js";

const result = await teamwork(wrapUpTheNewsWorkflow);

console.log(solution(result));
