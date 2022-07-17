import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControlLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { blue } from '@material-ui/core/colors';
import { useStyles } from './orders-table.style';
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
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { numberWithCommas } from '../../common/utils';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function OrdersTable() {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [orderInfo, setOrderInfo] = React.useState([]);
  const [orderView, setOrderView] = React.useState(false);

  const [category, setCategory] = React.useState('');
  const [orderstatus, setOrderStatus] = React.useState(0);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
  };
  // orders columns
  const currencyFormatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  const vndPrice = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
  };

  const ordersColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'idOrder',
      headerName: 'Mã đơn hàng',
      width: 130,
    },
    {
      field: 'customerName',
      headerName: 'Khách hàng',
      align: 'left',
      width: 160,
    },

    {
      field: 'timeOrder',
      headerName: 'Thời gian nhận đơn',
      width: 180,
      align: 'left',
    },
    {
      field: 'employeeName',
      headerName: 'Nhân viên bán hàng',
      width: 160,
      align: 'center',
    },

    {
      field: 'totalAmount',
      headerName: 'Tổng tiền',
      align: 'right',
      type: 'number',
      width: 120,
      ...vndPrice,
    },
    { field: 'status', headerName: 'Trạng thái', width: 130, align: 'center' },
    {
      field: 'paymentMethod',
      headerName: 'Thanh toán',
      width: 130,
      align: 'center',
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      sortable: false,
      width: 80,
      disableClickEventBubbling: true,
      align: 'right',
      renderCell: (params) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <ViewOrder data={params.row} />
          </div>
        );
      },
    },
  ];
  const ViewOrder = ({ data }) => {
    const handleViewOrder = () => {
      // some action
      setOrderView(true);
      setOrderDetails(data.products);
      setOrderInfo(data);
    };
    return (
      <FormControlLabel
        control={
          <IconButton
            color="secondary"
            style={{ color: blue[500] }}
            size="small"
            onClick={handleViewOrder}
          >
            <VisibilityIcon />
          </IconButton>
        }
      />
    );
  };
  // fetch data from JSON server
  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const result = await axios.get('orders');
    setOrders(await result.data);
  };
  return (
    <div className={classes.content}>
      <div className={classes.filterWrapper}>
        <div className={classes.filterSearchWrap}>
          {!orderView ? (
            <Paper component="form" className={classes.filterSearch}>
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                fullWidth
                placeholder="Tìm đơn hàng bằng mã đơn hàng!"
                inputProps={{ 'aria-label': 'Tìm đơn hàng bằng mã đơn hàng!' }}
              />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          ) : undefined}
        </div>

        <div className={classes.filterSelectWrap}>
          {!orderView ? (
            <FormControl
              fullWidth
              sx={{ m: 1 }}
              className={classes.filterSelect}
            >
              <InputLabel id="demo-simple-select-helper-label-category">
                Xem đơn hàng
              </InputLabel>
              <Select
                style={{ width: '100px' }}
                labelId="demo-simple-select-helper-label-category"
                id="demo-simple-select-helper-brand"
                value={category}
                label="Xem đơn hàng"
                name="category"
                onChange={handleChangeCategory}
              >
                <MenuItem value={10}>Tất cả đơn hàng</MenuItem>
                <MenuItem value={20}>Chưa thanh toán</MenuItem>
                <MenuItem value={30}>Đã thanh toán</MenuItem>
                <MenuItem value={30}>Đã xác nhận</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Button
              variant="outlined"
              onClick={() => {
                setOrderView(false);
              }}
            >
              Quay lại
            </Button>
          )}
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        {!orderView ? (
          <DataGrid
            rows={orders}
            columns={ordersColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
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
                          Nhân viên: <span>{orderInfo.employeeName}</span>
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={5}>
                        <p>Khách hàng: {orderInfo.recipientName}</p>
                        <p>Địa chỉ giao hàng: {orderInfo.address}</p>
                        <p>Số điện thoại người nhận: {orderInfo.phone}</p>
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
        )}
      </div>
    </div>
  );
}

export default OrdersTable;
