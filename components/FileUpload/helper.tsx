import { UploadChangeParam, UploadFile } from 'antd/lib/upload'
import axios, { AxiosRequestHeaders } from 'axios'
import type { UploadRequestOption } from 'rc-upload/lib/interface'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyUploadFile = UploadFile<any>
export type UploadInfo = UploadChangeParam<AnyUploadFile>

export interface CustomRequestOptions {
  action: string
  file: File
  headers: AxiosRequestHeaders
  onError: (event: Error, body?: Record<string, unknown>) => void
  onProgress: (event: { percent: number }, file: File) => void
  onSuccess: (response: Record<string, unknown>, file: File) => void
  withCredentials: boolean
}

export const CLOUDINARY_CLOUD_NAME = 'dhpk1grmy'
export const CLOUDINARY_API_KEY = '933727136379134'
export const UPLOAD_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`
export const CLOUDINARY_PRESETS = {
  certificates: 'e3mez9mx',
  commentAttachments: 'zymzhm5w',
  companyAboutPictures: 'nmuuuqmv',
  companyLogos: 'bnjotquc',
  profilePictures: 'zj42agid',
}
export const CLOUDINARY_DEFAULT_PRESET = CLOUDINARY_PRESETS.profilePictures

export const handleCustomRequest = (
  {
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }: UploadRequestOption,
  customPreset?: string
) => {
  const formData = new FormData()
  const preset = customPreset || CLOUDINARY_DEFAULT_PRESET
  formData.append('file', file)
  formData.append('tags', '')
  formData.append('upload_preset', `${preset}`)
  formData.append('api_key', `${CLOUDINARY_API_KEY}`)
  formData.append('timestamp', `${+new Date()}`)

  axios
    .post(action, formData, {
      headers,
      onUploadProgress: ({ loaded, total }) => {
        onProgress?.({ percent: Math.round((loaded / total) * 100) })
      },
      withCredentials,
    })
    .then(({ data: response }) => {
      onSuccess?.(response)
    })
    .catch(onError)

  return {
    abort() {
      // noop
    },
  }
}
