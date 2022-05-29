import jwt from 'jsonwebtoken'

interface ShareToken {
  sender: string
  uid: string
}

export function createShareToken({ sender, uid }: ShareToken) {
  return jwt.sign(
    {
      iat: 1648205376, // Prevent the default timestamp to always create the same token for the same input
      sender,
      uid,
    },
    process.env.JWT_TOKEN_PRIVATE_KEY || ''
  )
}

export function decodeShareToken(token: string) {
  try {
    const { sender = null, uid = null } = jwt.verify(
      token,
      process.env.JWT_TOKEN_PRIVATE_KEY || ''
    ) as ShareToken

    return {
      sender,
      uid,
    }
  } catch (e) {
    return null
  }
}
