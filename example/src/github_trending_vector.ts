import 'dotenv/config'

import { solution } from 'nest-ai/solution'
import { teamwork } from 'nest-aiamwork'

import { wrapUpTrending } from './github_trending_vector.config.js'

const result = await teamwork(wrapUpTrending)

console.log(solution(result))
