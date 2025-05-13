import { ollama } from 'nest-ai/providers/ollama'
import { solution } from 'nest-ailution'
import { teamwork } from 'nest-aiamwork'

import { preVisitNoteWorkflow } from './medical_survey.config.js'

const result = await teamwork({
  ...preVisitNoteWorkflow,
  provider: ollama({
    model: 'llama3.1',
  }),
})

console.log(solution(result))
