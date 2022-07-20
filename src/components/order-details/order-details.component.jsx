import * as React from 'react';
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
import { numberWithCommas } from '../../common/utils';
import 'react-toastify/dist/ReactToastify.css';

function OrderDetails() {
  const classes = useStyles();

  const [orderDetails, setOrderDetails] = React.useState([]);
  const [orderInfo, setOrderInfo] = React.useState([]);
  const [orderView, setOrderView] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [orderstatus, setOrderStatus] = React.useState(0);
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
  };

  return (
    <>
      <Grid item xs={12} className={classes.invoiceWrapper}>
        <form>
          <TableContainer component={Paper} className={classes.invoice}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <p>
                      Nhân viên: <span></span>
                    </p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5}>
                    <p>Khách hàng: </p>
                    <p>Địa chỉ giao hàng: </p>
                    <p>Số điện thoại người nhận: </p>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Mã sản phẩm </TableCell>
                  <TableCell align="right">Tên Sản phẩm</TableCell>
                  <TableCell align="right">Số lượng</TableCell>
                  <TableCell align="right">Giá</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ overflowY: 'scroll' }}>
                {orderDetails
                  ? orderDetails.map((orderDetails, key) => (
                      <TableRow key={key}>
                        <TableCell>{orderDetails.id}</TableCell>

                        <TableCell>{orderDetails.idProduct}</TableCell>

                        <TableCell align="right">
                          {orderDetails.nameProduct}
                        </TableCell>

                        <TableCell align="right">
                          {orderDetails.quantityProduct}
                        </TableCell>

                        <TableCell align="right">
                          {numberWithCommas(orderDetails.price)} đ
                        </TableCell>
                      </TableRow>
                    ))
                  : undefined}
                <TableRow>
                  <TableCell />
                  <TableCell align="right" colSpan={2}>
                    Tạm tính
                  </TableCell>
                  <TableCell align="right">
                    <span>{numberWithCommas(orderInfo.totalAmount)} đ</span>
                  </TableCell>
                  <TableCell />
                </TableRow>
                <TableRow>
                  <TableCell />
                  <TableCell
                    align="right"
                    colSpan={2}
                    style={{ fontWeight: 'bold', fontSize: 'large' }}
                  >
                    Tổng cộng
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
                    <span>{numberWithCommas(orderInfo.totalAmount)} đ</span>
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
            <div className={classes.settingBtns}>
              <Button variant="contained">Hủy đơn hàng</Button>
              <Button variant="outlined">In đơn hàng</Button>
              <FormControl>
                <InputLabel id="order-status-settings">
                  Thiết lập trạng thái
                </InputLabel>
                <Select
                  className={classes.settingStatusBtn}
                  labelId="order-status-settings"
                  value={orderstatus}
                  label="Thiết lập trạng thái"
                  onChange={handleChangeOrderStatus}
                >
                  <MenuItem value={0}>Đang xử lý</MenuItem>
                  <MenuItem value={1}>Đã xác nhận</MenuItem>
                  <MenuItem value={2}>Đang vận chuyển</MenuItem>
                  <MenuItem value={3}>Đã giao hàng</MenuItem>
                </Select>
              </FormControl>
            </div>
          </TableContainer>
        </form>
      </Grid>
    </>
  );
}

export default OrderDetails;
