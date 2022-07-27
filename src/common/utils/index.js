import { toast } from 'react-toastify';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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

/**
 *
 */
export function showTextOrderStatus(statusCode) {
  let status = '',
    icon = <HourglassBottomIcon style={{ color: '#fff' }} />,
    color = '#f6dd00';
  switch (Number(statusCode)) {
    case 0:
      status = 'Đang xử lý';
      break;
    case 1:
      status = 'Đã xác nhận';
      icon = <ThumbUpAltIcon style={{ color: '#fff' }} />;
      color = '#1976d2';
      break;
    case 2:
      status = 'Đang giao hàng';
      icon = <LocalShippingIcon style={{ color: '#fff' }} />;
      color = '#1976d2';
      break;
    case 3:
      status = 'Đã thanh toán';
      color = '#06de06';
      icon = <DoneIcon style={{ color: '#fff' }} />;
      break;
    default:
      status = 'Không xác định';
      color = '#ccc';
      icon = <MoreHorizIcon style={{ color: '#fff' }} />;
      break;
  }

  return {
    status,
    icon,
    color,
  };
}
