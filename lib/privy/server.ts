import { PrivyClient } from '@privy-io/node'

export async function getServerPrivyClient() {
  const appId = process.env.PRIVY_APP_ID
  const appSecret = process.env.PRIVY_APP_SECRET


  if (!appId || !appSecret) {
    throw new Error('Privy app ID or secret key is not defined')
  }

  return new PrivyClient({
    appId,
    appSecret,
  })
}
