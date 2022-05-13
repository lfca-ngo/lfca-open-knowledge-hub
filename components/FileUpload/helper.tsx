import axios from 'axios'

export const CLOUDINARY_CLOUD_NAME = 'dhpk1grmy'
export const CLOUDINARY_PRESET = 'zj42agid'
export const CLOUDINARY_API_KEY = '933727136379134'
export const UPLOAD_API = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`

export const handleCustomRequest = (
  {
    action,
    file,
    headers,
    onError,
    onProgress,
    onSuccess,
    withCredentials,
  }: any,
  customPreset: any
) => {
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
