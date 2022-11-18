import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'

import {
  AnyUploadFile,
  handleCustomRequest,
  UPLOAD_API,
  UploadInfo,
} from './helper'

interface ImageUploadMultiProps {
  value?: AnyUploadFile[]
  onChange?: (fileList: AnyUploadFile[]) => void
  customPreset?: string
}

export const ImageUploadMulti: React.FC<ImageUploadMultiProps> = ({
  onChange,
  customPreset,
  value = [],
}) => {
  const initialValue = useMemo(() => value || [], [value])
  const [fileList, setFileList] = useState<AnyUploadFile[]>(initialValue)

  useEffect(() => {
    setFileList(initialValue)
  }, [initialValue])

  const parseFileList = (fileList: AnyUploadFile[]) => {
    const formatted = []
    // check for all values if they have "fileList" attribute
    for (const file of fileList) {
      formatted.push({
        name: file.name,
        status: file.status || 'done',
        uid: file.uid,
        url: file.url || file.response?.secure_url,
      })
    }
    return formatted
  }

  const handleChange = (info: UploadInfo) => {
    const fileList = [...info.fileList]
    setFileList(fileList)
    const parsedFileList = parseFileList(fileList)
    onChange && onChange(parsedFileList)
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  return (
    <div className="clearfix">
      <Upload
        accept={'image/*'}
        action={UPLOAD_API}
        customRequest={(props) => handleCustomRequest(props, customPreset)}
        defaultFileList={value}
        fileList={fileList}
        listType="picture-card"
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
    </div>
  )
}
