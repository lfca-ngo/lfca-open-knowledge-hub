import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

import { handleCustomRequest, UPLOAD_API, UploadInfo } from './helper'
import styles from './styles.module.less'

interface ImageUploadProps {
  value?: string
  onChange?: (fileUrl: string) => void
  customPreset?: string
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  customPreset,
  onChange,
  value,
}) => {
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState(value)

  useEffect(() => {
    setImageUrl(value)
  }, [value])

  const handleChange = (info: UploadInfo) => {
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
    <div className={classNames(styles['image-upload'], 'clearfix')}>
      <Upload
        accept={'image/*'}
        action={UPLOAD_API}
        customRequest={(props) => handleCustomRequest(props, customPreset)}
        listType="picture-card"
        onChange={handleChange}
        showUploadList={false}
      >
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img alt="avatar" src={imageUrl} style={{ width: '100%' }} />
        ) : (
          uploadButton
        )}
      </Upload>
    </div>
  )
}
