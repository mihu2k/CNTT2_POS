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

/**
 * @author MH
 * @param {*} timestamp
 * @returns {string} dd/MM/YYYY HH:mm
 */
export function formatDateTime(timestamp) {
  const m = new Date(timestamp);
  const dateString =
    ('0' + m.getDate()).slice(-2) +
    '/' +
    ('0' + (m.getMonth() + 1)).slice(-2) +
    '/' +
    m.getFullYear() +
    ' - ' +
    ('0' + m.getHours()).slice(-2) +
    ':' +
    ('0' + m.getMinutes()).slice(-2);

  return dateString;
}
