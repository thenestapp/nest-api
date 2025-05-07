import z, { ZodTypeAny } from 'zod'

import { Message } from './messages.js'
import { Provider } from './models.js'

export type Tool<P extends ZodTypeAny = any> = {
  description: string
  parameters: P
  execute: (
    parameters: z.infer<P>,
    context: { provider: Provider; messages: Message[] }
  ) => Promise<string>
}

/**
 * Helper function to infer the type of the parameters.
 */
export const tool = <P extends ZodTypeAny>(tool: Tool<P>): Tool<P> => tool
