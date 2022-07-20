import { FormControlLabel } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, numberWithCommas } from '../../common/utils';
import { getAllOrdersOfPosRequest } from '../../redux/actions/order.action';
import { useStyles } from './orders-table-pos.style';
import OrderDetails from '../../components/order-details';

function OrdersTableForPos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });

  const [orderView, setOrderView] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const { order: orderSelector } = useSelector((state) => state);
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          // detail order
          <OrderDetails />
        )}
      </div>
    </div>
  );
}

export default OrdersTableForPos;
