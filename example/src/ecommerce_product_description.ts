import "dotenv/config";

import { solution } from "nest-ai/solution";
import { teamwork } from "nest-aiamwork";

import { productDescriptionWorkflow } from "./ecommerce_product_description.config.js";

const result = await teamwork(productDescriptionWorkflow);

console.log(solution(result));
