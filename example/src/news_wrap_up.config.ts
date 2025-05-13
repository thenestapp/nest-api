import 'dotenv/config'

import { getCurrentDate } from '@nest-ai/tools/date'
import { getApiKey } from '@nest-aiols/utils'
import { createWebSearchTools } from '@nest-aiols/webSearch'
import { agent } from 'nest-aient'
import { logger } from 'nest-ailemetry'
import { workflow } from 'nest-airkflow'

const apiKey = await getApiKey('Serply.io API', 'SERPLY_API_KEY')

const { googleSearch } = createWebSearchTools({
  apiKey,
})

const newsResearcher = agent({
  description: `
    You are skilled at searching the News over Web.
    Your job is to get the news from the last week.
  `,
  tools: {
    googleSearch,
    getCurrentDate,
  },
})

const newsReader = agent({
  description: `
    You're greatly skilled at reading and summarizing news headlines.
    Other team members rely on you to get the gist of the news.
    You always tries to be objective, not halucinating neither adding your own opinion.
  `,
})

const wrapupRedactor = agent({
  description: `
    Your role is to wrap up the news and trends for the last week into a comprehensive report.
    Generalization is also one of your powerfull skills, however you're not a fortune teller.
    You're famous for precisely getting the overal picture, trends and summarizing it all.
  `,
})

export const wrapUpTheNewsWorkflow = workflow({
  team: { newsResearcher, newsReader, wrapupRedactor },
  description: `
    Research the top news and trends for the last week.
  `,
  output: `
    Comprehensive markdown report with the listing including top news headlines for the last week.
    - Include one sentence summary for each article.
    - Include top takeaways - bulletpoints from each article.
  `,
  snapshot: logger,
})
