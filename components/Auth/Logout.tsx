import { Button } from 'antd'
import React, { useState } from 'react'

import { logout } from '../../services/firebase'

const Logout = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      await logout()
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button loading={loading} onClick={handleClick}>
      Logout
    </Button>
  )
}

export default Logout
