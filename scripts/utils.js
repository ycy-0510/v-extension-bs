import { resolve } from 'path'
import { bgCyan, black } from 'kolorist'

export const PORT = parseInt(process.env.PORT || '') || 3309
export const r = (...args) => resolve(import.meta.dirname, '..', ...args)
export const IS_DEV = process.env.NODE_ENV !== 'production'

export function logger(name, message) {
  // eslint-disable-next-line no-console
  console.log(black(bgCyan(` ${name} `)), message)
}
