import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { UploadFile } from 'antd/lib/upload/interface'
import React, { useEffect, useState } from 'react'

import { handleCustomRequest, UPLOAD_API } from './helper'

interface CloudinaryResponse {
  bytes: number
  secure_url: string
}

export interface File {
  source: string
  mimeType: string
  fileName: string
  fileSize: number
}

interface FileUploadProps {
  accept?: string
  customPreset?: string
  maxFiles?: number
  onChange?: (files: File[]) => void
  value?: File[]
}

const valueToFileList = (
  value?: File[]
): UploadFile<CloudinaryResponse>[] | undefined => {
  return value?.map((file, i) => {
    return {
      name: file.fileName,
      response: {
        bytes: file.fileSize,
        secure_url: file.source,
      },
      siz: file.fileSize,
      thumbUrl: file.source,
      type: file.mimeType,
      uid: `${file.fileName}_${i}`,
    }
  })
}

export const FileUpload = ({
  accept = '*',
  customPreset,
  maxFiles = 1,
  onChange,
  value,
}: FileUploadProps) => {
  const [fileList, setFileList] = useState<
    UploadFile<CloudinaryResponse>[] | undefined
  >(valueToFileList(value))

  useEffect(() => {
    setFileList(valueToFileList(value))
  }, [value])

  const handleChange = (
    info: UploadChangeParam<UploadFile<CloudinaryResponse>>
  ) => {
    setFileList(info.fileList)
    if (info.file.status === 'done') {
      onChange?.(
        info.fileList
          // Filter out failed uploads
          .filter((f) => !!f.response)
          .map((f) => ({
            fileName: f.name,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            fileSize: f.response!.bytes,
            mimeType: f.type || '',
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            source: f.response!.secure_url,
          }))
      )
    }
  }

  return (
    <div className="clearfix">
      <Upload
        accept={accept}
        action={UPLOAD_API}
        customRequest={(props) => handleCustomRequest(props, customPreset)}
        fileList={fileList}
        listType="picture-card"
        maxCount={maxFiles}
        onChange={handleChange}
      >
        {(fileList?.length || 0) < maxFiles ? (
          <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
          </div>
        ) : null}
      </Upload>
    </div>
  )
}
