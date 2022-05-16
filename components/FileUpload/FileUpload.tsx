import { FileOutlined, LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import React, { useEffect, useState } from 'react'

import { handleCustomRequest, UPLOAD_API } from './helper'

interface FileUploadProps {
  value?: any
  onChange?: any
  customPreset?: any
}

export const FileUpload = ({
  customPreset,
  onChange,
  value,
}: FileUploadProps) => {
  const [loading, setLoading] = useState(false)
  const [fileUrl, setFileUrl] = useState(value)

  useEffect(() => {
    setFileUrl(value)
  }, [value])

  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return
    }
    if (info.file.status === 'done') {
      const fileUrl = info?.file?.response?.secure_url
      setFileUrl(fileUrl)
      onChange?.(fileUrl)
    }
    // @TODO: else throw error
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
        accept={'*'}
        action={UPLOAD_API}
        customRequest={(props) => handleCustomRequest(props, customPreset)}
        listType="picture-card"
        onChange={handleChange}
        showUploadList={false}
      >
        {fileUrl ? (
          <span>
            <FileOutlined /> <a href={fileUrl}> file</a>
          </span>
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
