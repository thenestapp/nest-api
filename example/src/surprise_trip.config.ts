import 'dotenv/config'

import { agent } from 'nest-ai/agent'
import { workflow } from 'nest-airkflow'

import { lookupWikipedia } from './tools/wikipedia.js'

const personalizedActivityPlanner = agent({
  description: `
    You are skilled at researching and finding cool things to do at the destination,
    including activities and events that match the traveler's interests and age group.
  `,
})

const landmarkScout = agent({
  description: `
    You are skilled at researching and finding interesting landmarks at the destination.
    Your find historical landmarks, museums, and other interesting places.
  `,
  tools: {
    lookupWikipedia,
  },
})

const restaurantScout = agent({
  description: `
    As a food lover, you know the best spots in town for a delightful culinary experience.
    You also have a knack for finding picturesque and entertaining locations.
    Your find highly-rated restaurants and dining experiences at the destination,
    and recommend scenic locations and fun activities.
  `,
})

const itineraryCompiler = agent({
  description: `
    With an eye for detail, you organize all the information into a coherent and enjoyable travel plan.
  `,
})

export const researchTripWorkflow = workflow({
  team: {
    personalizedActivityPlanner,
    restaurantScout,
    landmarkScout,
    itineraryCompiler,
  },
  description: `
    Research and find cool things to do in Wrocław, Poland.

    Focus:
      - activities and events that match the traveler's age group.
      - highly-rated restaurants and dining experiences.
      - landmarks with historic context.
      - picturesque and entertaining locations.
  `,
  knowledge: `
    Traveler's information:
      - Origin: New York, USA
      - Destination: Wrocław, Poland
      - Age of the traveler: 30
      - Hotel location: Hilton, Main Square, Wrocław
      - Flight information: Flight AA123, arriving on 2023-12-15
      - How long is the trip: 7 days
      - Likes: history, italian food, vintage cars.
    
    Flights and hotels are already confirmed.
  `,
  output: `
    Comprehensive day-by-day plan for the trip to Wrocław, Poland.
    Ensure the plan includes flights, hotel information, and all planned activities and dining experiences.
  `,
  // Claude
  // provider: openrouter({
  //   model: 'anthropic/claude-3.5-haiku-20241022:beta',
  //   structured_output: false,
  // }),
  // Grok
  // provider: grok(),
})
