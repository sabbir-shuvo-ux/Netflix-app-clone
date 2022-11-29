import { toast } from 'react-toastify';

let styles = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  progress: undefined,
  theme: "dark"
}

export const success = (text) => toast.success(text, styles);
export const info = (text) => toast.info(text, styles);
export const error = (text) => toast.error(text, styles);
