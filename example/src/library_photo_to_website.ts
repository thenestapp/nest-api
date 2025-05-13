import 'dotenv/config'

import { solution } from 'nest-ai/solution'
import { teamwork } from 'nest-aiamwork'

import { bookLibraryWorkflow } from './library_photo_to_website.config.js'

const result = await teamwork(bookLibraryWorkflow)

console.log(solution(result))
