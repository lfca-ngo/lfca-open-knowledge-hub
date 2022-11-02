/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require('axios')
const path = require('path')
const fs = require('fs')

const fetchAndSaveByKey = async (key) => {
  const options = {
    data: {
      query: `
        query companyTagStats { 
          companyTagStats {
            count
            tagName
          }
        }`,
    },
    headers: {
      Authorization: `Bearer ${process.env.LFCA_BACKED_ADMIN_TOKEN}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
    url: process.env.NEXT_PUBLIC_LFCA_BACKED_URL,
  }

  try {
    const response = await axios.request(options)

    const companyStats = response.data.data.companyTagStats.reduce(
      (acc, val) => {
        acc[val.tagName] = val.count
        return acc
      },
      {}
    )

    const FILE_PATH = path.join(__dirname, `/data/${key}.json`)
    fs.writeFileSync(FILE_PATH, JSON.stringify(companyStats), 'utf8')
  } catch (e) {
    console.error(`Failed to fetch sector stats`, e)
  }
}

exports.fetchAndSaveByKey = fetchAndSaveByKey
