import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControlLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { blue } from '@material-ui/core/colors';
import { useStyles } from './orders-table.style';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { numberWithCommas, formatDateTime } from '../../common/utils';
import 'react-toastify/dist/ReactToastify.css';
import OrderDetails from '../../components/order-details';
import axios from 'axios';

function OrdersTable() {
  const classes = useStyles();
  const [orders, setOrders] = React.useState([]);
  const [orderView, setOrderView] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  // orders columns
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
      valueFormatter: ({ value }) => formatDateTime(value),
    },
    {
      field: 'totalAmount',
      headerName: 'Tổng tiền',
      align: 'right',
      type: 'number',
      width: 120,
      valueFormatter: ({ value }) => numberWithCommas(value),
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
          // detail order
          <OrderDetails />
        )}
      </div>
    </div>
  );
}

export default OrdersTable;
