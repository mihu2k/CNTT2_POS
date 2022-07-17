import { toast } from 'react-toastify';

export function numberWithCommas(number, separate = '.') {
  return number
    ?.toString()
    .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, separate);
}

export const showToastMsg = (type = 'info', msg, options = {}) => {
  toast[type](msg, {
    position: 'bottom-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    ...options,
  });
};
