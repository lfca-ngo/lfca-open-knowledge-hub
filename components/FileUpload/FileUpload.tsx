import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import React, { useEffect, useState } from 'react'

import { handleCustomRequest, UPLOAD_API } from './helper'

interface FileUploadProps {
  value?: any
  onChange?: any
  customPreset?: any
}

export const FileUpload: React.FC<FileUploadProps> = ({
  customPreset,
  onChange,
  value,
}) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(value)

  useEffect(() => {
    setImageUrl(value)
  }, [value])

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      onChange?.(info?.file?.response?.secure_url)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <div className="clearfix">
      <Upload
        accept={'image/*'}
        action={UPLOAD_API}
        customRequest={(props) => handleCustomRequest(props, customPreset)}
        listType="picture-card"
        onChange={handleChange}
        showUploadList={false}
      >
        {imageUrl ? (
          <img alt="avatar" src={imageUrl} style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
