import 'dotenv/config'

import { solution } from 'nest-ai/solution'
import { teamwork } from 'nest-aiamwork'

import { wikipediaResearch } from './wikipedia_vector.config.js'

const result = await teamwork(wikipediaResearch)

console.log(solution(result))
