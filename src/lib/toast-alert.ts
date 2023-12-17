import { toast } from 'react-toastify'

const position = 'top-right'
const theme = 'dark' // 'colored' | 'dark'
const hideProgressBar = true
const autoClose = 5000

type ToastService = {
  showSuccessMessage: (message: string) => void
  showInfoMessage: (message: string) => void
  showErrorMessage: (message: string) => void
}

const toastService: ToastService = {
  showSuccessMessage: (message: string) => {
    toast.success(message, {
      position,
      theme,
      hideProgressBar,
      autoClose,
    })
  },

  showInfoMessage: (message: string) => {
    toast.info(message, {
      position,
      hideProgressBar,
      theme,
      autoClose,
    })
  },

  showErrorMessage: (message: string) => {
    toast.error(message, {
      position,
      hideProgressBar,
      theme,
      autoClose,
    })
  },
}

export default toastService
