import 'dotenv/config'

import { solution } from 'nest-ai/solution'
import { teamwork } from 'nest-aiamwork'

import { researchTripWorkflow } from './surprise_trip.config.js'

const result = await teamwork(researchTripWorkflow)

console.log(solution(result))
