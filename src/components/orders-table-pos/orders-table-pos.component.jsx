import { FormControlLabel } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, numberWithCommas } from '../../common/utils';
import { getAllOrdersOfPosRequest } from '../../redux/actions/order.action';
import { useStyles } from './orders-table-pos.style';

function OrdersTableForPos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });
  const [orderDetails, setOrderDetails] = React.useState([]);
  const [orderInfo, setOrderInfo] = React.useState([]);
  const [orderView, setOrderView] = React.useState(false);

  const [category, setCategory] = React.useState('');
  const [orderstatus, setOrderStatus] = React.useState(0);

  const { order: orderSelector } = useSelector((state) => state);

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeOrderStatus = (event) => {
    setOrderStatus(event.target.value);
  };

  const ordersColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'code',
      headerName: 'Mã đơn hàng',
      flex: 1,
    },
    {
      field: 'fullName',
      headerName: 'Khách hàng',
      align: 'left',
      flex: 1,
    },
    {
      field: 'phone',
      headerName: 'Số điện thoại',
      align: 'left',
      flex: 1,
    },
    {
      field: 'created_at',
      headerName: 'Thời gian nhận đơn',
      flex: 1,
      align: 'left',
      valueFormatter: ({ value }) => formatDateTime(value),
    },
    {
      field: 'employee',
      headerName: 'Nhân viên bán hàng',
      flex: 1,
      align: 'center',
      valueFormatter: ({ value }) => value.full_name,
    },
    {
      field: 'total',
      headerName: 'Tổng tiền (VNĐ)',
      align: 'right',
      type: 'number',
      flex: 1,
      valueFormatter: ({ value }) => numberWithCommas(value),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      sortable: false,
      width: 100,
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

  const fetchOrders = (query = {}) => {
    dispatch(getAllOrdersOfPosRequest(query));
  };

  React.useEffect(() => {
    fetchOrders(query);
  }, [query]);

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
            rows={orderSelector.orders?.map((item, index) => ({
              ...item,
              id: index + 1 + query.per_page * (query.page - 1),
            }))}
            columns={ordersColumns}
            pageSize={query.per_page}
            rowsPerPageOptions={[5, 10]}
            onPageChange={(newPage) =>
              setQuery((prev) => ({ ...prev, page: Number(newPage) + 1 }))
            }
            onPageSizeChange={(newPage) =>
              setQuery((prev) => ({ ...prev, per_page: newPage }))
            }
            rowCount={orderSelector.totalRecord}
            pagination
            paginationMode="server"
            page={query?.page - 1}
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

export default OrdersTableForPos;
