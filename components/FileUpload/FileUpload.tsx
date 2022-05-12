import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CLOUDINARY_CLOUD_NAME = 'dhpk1grmy'
const CLOUDINARY_PRESET = 'zj42agid'
const CLOUDINARY_API_KEY = '933727136379134'
const UPLOAD_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

interface FileUploadProps {
  value?: any
  onChange?: any
  customPreset?: any
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  customPreset,
  value = {},
}) => {
  const initialValue = value || []
  const [fileList, setFileList] = useState(initialValue)

  useEffect(() => {
    setFileList(initialValue)
  }, [value])

  const handleCustomRequest = ({
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }: any) => {
    const formData = new FormData()
    const preset = customPreset || CLOUDINARY_PRESET
    formData.append('file', file)
    formData.append('tags', '')
    formData.append('upload_preset', `${preset}`)
    formData.append('api_key', `${CLOUDINARY_API_KEY}`)
    formData.append('timestamp', `${+new Date()}`)

    axios
      .post(action, formData, {
        headers,
        onUploadProgress: ({ loaded, total }) => {
          onProgress({ percent: Math.round((loaded / total) * 100) }, file)
        },
        withCredentials,
      })
      .then(({ data: response }) => {
        onSuccess(response, file)
      })
      .catch(onError)

    return {
      abort() {
        // noop
      },
    }
  }

  const parseFileList = (fileList: any) => {
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

  const handleChange = (info: any) => {
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
        customRequest={handleCustomRequest}
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
