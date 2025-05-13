import 'dotenv/config'

import { solution } from 'nest-ai/solution'
import { teamwork } from 'nest-aiamwork'

import { preVisitNoteWorkflow } from './medical_survey.config.js'

const result = await teamwork(preVisitNoteWorkflow)

console.log(solution(result))
