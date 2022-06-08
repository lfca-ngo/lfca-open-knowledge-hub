import { v2 as cloudinary } from 'cloudinary'
import type { NextApiRequest, NextApiResponse } from 'next'

import { createShareToken, getImageName } from '../../utils-server-only'

const getSharingImage = (country: string) => {
  switch (country) {
    case 'oc-AU':
      return `Backgrounds/light_linkedin_ADD-LOGO-AU_haziqz.jpg`
    case 'eu-TR':
      return `Backgrounds/light_linkedin_ADD-LOGO-TUR_cwbses.jpg`
    default:
      return `Backgrounds/light_linkedin_ADD-LOGO-INT_qe0eyr.jpg`
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).send({ message: 'Only POST requests allowed' })
  }

  const {
    country,
    sender,
    senderImage,
    socialDescription = '',
    socialImage,
    socialTitle = '',
    uid,
  } = req.body

  const token = createShareToken({
    sender,
    uid,
  })

  cloudinary.config({
    cloud_name: 'dhpk1grmy',
    secure: true,
  })

  const imageName = getImageName(senderImage)
  const imageUrl = getSharingImage(country)

  const image = cloudinary.url(imageUrl, {
    transformation: [
      { crop: 'fill', gravity: 'south', height: 630, width: 1200 },
      {
        crop: 'crop',
        gravity: 'face',
        overlay: `members:${imageName}`,
      },
      {
        crop: 'fill',
        flags: 'layer_apply',
        gravity: 'south_east',
        height: 156,
        radius: 12,
        width: 133,
        x: 215,
        y: 154,
      },
    ],
  })

  const shareLink = `${process.env.NEXT_PUBLIC_URL}/signup?invite=${token}`
  const ogImageUrl = socialImage || image

  // Create short link
  try {
    const response = await fetch(
      `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
      {
        body: JSON.stringify({
          dynamicLinkInfo: {
            androidInfo: {
              androidFallbackLink: shareLink,
            },
            domainUriPrefix: 'share.lfca.earth',
            iosInfo: {
              iosFallbackLink: shareLink,
            },
            link: shareLink,
            navigationInfo: {
              enableForcedRedirect: true,
            },
            socialMetaTagInfo: {
              socialDescription,
              socialImageLink: ogImageUrl,
              socialTitle,
            },
          },
          suffix: {
            option: 'SHORT',
          },
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    )
    const { shortLink } = await response.json()

    res.status(200).json({ ogImageUrl, shortLink })
  } catch (e: any) {
    throw new Error(e.message || e)
  }
}
