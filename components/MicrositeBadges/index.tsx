require('./styles.less')

import { Input, Select, Table } from 'antd'
import React, { useState } from 'react'

const BADGE_BASE_URL = ''
const BASE_URL = `https://res.cloudinary.com/dhpk1grmy/image/upload/v1599579094/Act%20Now%20Badge/v2`

const { TextArea } = Input
const { Column } = Table
const { Option } = Select

const getCode = (customLink: string, image: string, width: string) =>
  `<a href="${customLink}" rel="nofollow" target="_blank"><img src="${image}" style="max-width:${width}px;width:100%;" alt="By Leaders for Climate Action" /></a>`

const attributionData = (url?: string | null, langPrefix?: string) => {
  const badgeWhite = `${BASE_URL}/badge-white.svg`
  const bigBlack = `${BASE_URL}/big-black.svg`
  const bigColorful = `${BASE_URL}/big-colorful.svg`
  const bigInverseColorful = `${BASE_URL}/big-inverse-colorful.svg`
  const bigInverseWhite = `${BASE_URL}/big-inverse-white.svg`
  const miniBlack = `${BASE_URL}/mini-black.svg`
  const miniWhite = `${BASE_URL}/mini-white.svg`
  const miniColorful = `${BASE_URL}/mini-colorful.svg`
  const smallBlack = `${BASE_URL}/small-black.svg`
  const smallInverseWhite = `${BASE_URL}/small-inverse-white.svg`
  const smallColorful = `${BASE_URL}/small-colorful.svg`
  const smallInverseColorful = `${BASE_URL}/small-inverse-colorful.svg`
  // Sizes
  const widthBig = `175`
  const widthSmall = `123`
  const widthMini = `67`
  const widthBadge = `186`
  // Url
  const customLink = `${BADGE_BASE_URL}${langPrefix}/e/${url}`
  return [
    {
      asset: {
        data: bigInverseWhite,
        type: 'inverse',
      },
      code: getCode(customLink, bigInverseWhite, widthBig),
      name: 'White',
    },
    {
      asset: {
        data: bigBlack,
        type: 'normal',
      },
      code: getCode(customLink, bigBlack, widthBig),
      name: 'Black',
    },
    {
      asset: {
        data: bigInverseColorful,
        type: 'inverse',
      },
      code: getCode(customLink, bigInverseColorful, widthBig),
      name: 'Colorful Inverse',
    },
    {
      asset: {
        data: bigColorful,
        type: 'normal',
      },
      code: getCode(customLink, bigColorful, widthBig),
      name: 'Colorful',
    },
    {
      asset: {
        data: smallInverseWhite,
        type: 'inverse',
      },
      code: getCode(customLink, smallInverseWhite, widthSmall),
      name: 'Small White Inverse',
    },
    {
      asset: {
        data: smallBlack,
        type: 'normal',
      },
      code: getCode(customLink, smallBlack, widthSmall),
      name: 'Small Black',
    },
    {
      asset: {
        data: smallInverseColorful,
        type: 'inverse',
      },
      code: getCode(customLink, smallInverseColorful, widthSmall),
      name: 'Small Colorful Inverse',
    },
    {
      asset: {
        data: smallColorful,
        type: 'normal',
      },
      code: getCode(customLink, smallColorful, widthSmall),
      name: 'Small Colorful',
    },
    {
      asset: {
        data: miniWhite,
        type: 'inverse',
      },
      code: getCode(customLink, miniWhite, widthMini),
      name: 'Mini White',
    },
    {
      asset: {
        data: miniBlack,
        type: 'normal',
      },
      code: getCode(customLink, miniBlack, widthMini),
      name: 'Mini Black',
    },
    {
      asset: {
        data: miniColorful,
        type: 'normal',
      },
      code: getCode(customLink, miniColorful, widthMini),
      name: 'Mini Colorful',
    },
    {
      asset: {
        data: badgeWhite,
        type: 'normal',
      },
      code: getCode(customLink, badgeWhite, widthBadge),
      name: 'Badge',
    },
  ]
}

export const MicrositeBadges = ({
  micrositeSlug,
}: {
  micrositeSlug?: string | null
}) => {
  const [langPrefix, setLangPrefix] = useState('')

  const changeLanguage = (val: string) => {
    setLangPrefix(val)
  }
  const data = attributionData(micrositeSlug, langPrefix)
  return (
    <div className="attribution-table">
      <p>
        {`Your microsite is available in multiple languages. However, currently you
        can only add your custom "about sections" in 1 language. Please select
        which one you would like to link to from the badge.`}
      </p>
      <Select
        defaultValue=""
        onSelect={changeLanguage}
        style={{ margin: '0 0 20px' }}
      >
        <Option value="">English</Option>
        <Option value="/de">German</Option>
      </Select>
      <Table dataSource={data} pagination={false} rowKey={'name'}>
        <Column
          dataIndex="asset"
          key="asset"
          render={(elem) => {
            return (
              <div
                className={`background ${
                  elem.type === 'inverse' ? 'inverse' : 'normal'
                }`}
              >
                <div className="inner">
                  <img src={elem.data} />
                </div>
              </div>
            )
          }}
          title="Asset"
          width="40%"
        />
        <Column
          dataIndex="code"
          key="code"
          render={(code) => (
            <div className="inner">
              <TextArea className="code" rows={5} value={code} />
            </div>
          )}
          title="Code"
        />
      </Table>
    </div>
  )
}
