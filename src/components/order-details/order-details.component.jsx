import React from 'react';
import { useStyles } from './order-details.style';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  formatDateTime,
  numberWithCommas,
  showTextOrderStatus,
  showToastMsg,
} from '../../common/utils';
import { Typography } from '@mui/material';
import { orderStatusConfig } from '../../config/order-status.config';
import { useDispatch } from 'react-redux';
import { updateOrderStatusRequest } from '../../redux/actions/order.action';

export default function OrderDetails({ order }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [orderStatus, setOrderStatus] = React.useState('default');

  const handleChangeOrderStatus = (event) => {
    if (event.target.value === 'default') return setOrderStatus('default');
    const statusText = showTextOrderStatus(event.target.value).status;
    const confirmOrder = window.confirm(
      `Bạn có chắc chắn thay đổi trạng thái đơn hàng thành ${statusText}?`,
    );
    if (confirmOrder) {
      dispatch(updateOrderStatusRequest(order?._id, event.target.value));
    }
    setOrderStatus('default');
  };

  const handlePrintOrder = () => {
    showToastMsg('warning', 'Chức năng chưa hoàn thành.', {
      toastId: 'MH',
      autoClose: 2500,
    });
  };

  // console.log(order, 'ORDER');

  return (
    <Grid item xs={12} className={classes.invoiceWrapper}>
      <TableContainer component={Paper} className={classes.invoice}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}>
                <div className={classes.settingBtns}>
                  {/* <Button variant="contained">Hủy đơn hàng</Button> */}
                  {/* <Button variant="outlined" onClick={handlePrintOrder}>
                    In đơn hàng
                  </Button> */}
                  {order?.status !== 3 && (
                    <FormControl>
                      <InputLabel id="order-status-settings">
                        Thiết lập trạng thái
                      </InputLabel>
                      <Select
                        className={classes.settingStatusBtn}
                        labelId="order-status-settings"
                        value={orderStatus}
                        label="Thiết lập trạng thái"
                        onChange={handleChangeOrderStatus}
                      >
                        <MenuItem key="default" value="default">
                          ---Chọn trạng thái---
                        </MenuItem>
                        {orderStatusConfig
                          .filter((status) => status.value > order?.status)
                          .filter((status) =>
                            order?.shipMethod === 1 ? status.value !== 2 : true,
                          )
                          .map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                              {status.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <p>Mã đơn hàng:&nbsp;{order?.code}</p>
                <p>Tạo lúc:&nbsp;{formatDateTime(order?.created_at)}</p>
                <p className="d-f" style={{ alignItems: 'center' }}>
                  Trạng thái:&nbsp;
                  {showTextOrderStatus(order?.status)?.status}
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <p>Khách hàng:&nbsp;{order?.fullName}</p>
                <p>Số điện thoại người nhận:&nbsp;{order?.phone}</p>
                <p>
                  Phương thức nhận hàng:&nbsp;
                  {order?.shipMethod === 0 && 'Giao hàng tận nơi'}
                  {order?.shipMethod === 1 && 'Nhận tại cửa hàng'}
                </p>
                {order?.shipMethod === 0 && (
                  <p>Địa chỉ giao hàng:&nbsp;{order?.deliveryAddress}</p>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Mã sản phẩm </TableCell>
              <TableCell align="right">Tên Sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: 'scroll' }}>
            {order?.products?.length > 0 ? (
              order?.products?.map((product, index) => (
                <TableRow key={product?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div style={{ alignItems: 'center' }} className="d-f">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${product?.productId?.colorImage}`}
                        alt={product?.productId?.productId?.name}
                        loading="lazy"
                        style={{
                          width: '50px',
                          height: '50px',
                          border: '1px solid #f1f1f1',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product?.productId?.productId?.code}</TableCell>
                  <TableCell align="right">
                    {product?.productId?.productId?.name}
                  </TableCell>
                  <TableCell align="right">{product?.quantity}</TableCell>
                  <TableCell align="right">
                    {numberWithCommas(product?.price)}&nbsp;&#8363;
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>Lỗi hiển thị sản phẩm.</p>
            )}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="right" colSpan={2}>
                Tạm tính:
              </TableCell>
              <TableCell align="right">
                <span>{numberWithCommas(order?.total)}&nbsp;&#8363;</span>
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell
                align="right"
                colSpan={2}
                style={{ fontWeight: 'bold', fontSize: 'large' }}
              >
                Tổng cộng:
              </TableCell>
              <TableCell
                align="right"
                style={{
                  fontWeight: 'bold',
                  fontSize: 'large',
                  display: 'block',
                  padding: '16px 0',
                }}
              >
                <span>{numberWithCommas(order?.total)}&nbsp;&#8363;</span>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
