const safeJsonStringify = require('safe-json-stringify');
import { getEntries } from './api'

export const fetchAllActions = async () => {

  const res = await getEntries({
    content_type: 'action',
    include: 3,
    locale: 'en-US',
  })

  const stringifiedData = safeJsonStringify(res.items);
  const actions = JSON.parse(stringifiedData);

  return actions
}
