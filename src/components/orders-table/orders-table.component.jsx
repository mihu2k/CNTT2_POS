import { FormControlLabel } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Chip } from '@mui/material';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  formatDateTime,
  numberWithCommas,
  showTextOrderStatus,
} from '../../common/utils';
import { getAllOrdersRequest } from '../../redux/actions/order.action';
import { useStyles } from './orders-table.style';

export default function OrdersTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusQuery, setStatusQuery] = React.useState('all');

  const { order: orderSelector } = useSelector((state) => state);

  const orderColumns = [
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
      field: 'created_at',
      headerName: 'Thời gian nhận đơn',
      flex: 1,
      align: 'left',
      valueFormatter: ({ value }) => formatDateTime(value),
    },
    {
      field: 'paymentMethod',
      headerName: 'Thanh toán',
      flex: 1,
      valueFormatter: ({ value }) =>
        value === 0
          ? 'Thẻ quốc tế'
          : value === 1
          ? 'ATM/QR/Ví điện tử'
          : 'Tiền mặt',
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      align: 'center',
      renderCell: (params) => <ViewStatus order={params.row} />,
    },
    {
      field: 'total',
      headerName: 'Tổng tiền (VNĐ)',
      type: 'number',
      align: 'right',
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
      renderCell: (params) => (
        <div style={{ cursor: 'pointer' }}>
          <ViewOrder data={params.row} />
        </div>
      ),
    },
  ];

  const ViewOrder = ({ data }) => {
    const handleViewOrder = () => {
      navigate(`/orders/${data._id}`);
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
    dispatch(getAllOrdersRequest(query));
  };

  const handleSearchOrder = (e) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, page: 1 }));
    fetchOrders({ search: searchQuery, ...query, page: 1 });
  };

  const handleChangeStatusFilter = (e) => {
    setStatusQuery(e.target.value);
    setQuery((prev) => ({ ...prev, page: 1 }));
    fetchOrders({
      search: searchQuery,
      ...query,
      page: 1,
      status: e.target.value,
    });
  };

  React.useEffect(() => {
    fetchOrders({ ...query, search: searchQuery, status: statusQuery });
  }, [query]);

  return (
    <div className={classes.content}>
      <div className={classes.filterWrapper}>
        <div className={classes.filterSearchWrap}>
          <Paper component="form" className={classes.filterSearch}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              fullWidth
              placeholder="Tìm đơn hàng bằng mã đơn hàng!"
              inputProps={{ 'aria-label': 'Tìm đơn hàng bằng mã đơn hàng!' }}
              value={searchQuery}
              onChange={(e) => {
                if (!e.target.value) setQuery((prev) => ({ ...prev, page: 1 }));
                setSearchQuery(e.target.value);
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleSearchOrder}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>

        <div className={classes.filterSelectWrap}>
          <FormControl fullWidth sx={{ m: 1 }} className={classes.filterSelect}>
            <InputLabel id="demo-simple-select-helper-label-category">
              Xem đơn hàng
            </InputLabel>
            <Select
              style={{ width: '100px' }}
              labelId="demo-simple-select-helper-label-category"
              id="demo-simple-select-helper-brand"
              value={statusQuery}
              label="Xem đơn hàng"
              name="status"
              onChange={handleChangeStatusFilter}
            >
              <MenuItem value={'all'}>Tất cả đơn hàng</MenuItem>
              <MenuItem value={0}>Đang xử lý</MenuItem>
              <MenuItem value={1}>Đã xác nhận</MenuItem>
              <MenuItem value={2}>Đang giao hàng</MenuItem>
              <MenuItem value={3}>Đã giao hàng</MenuItem>
              <MenuItem value={-1}>Không xác định</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={orderSelector.orders?.map((item, index) => ({
            ...item,
            id: index + 1 + query.per_page * (query.page - 1),
          }))}
          columns={orderColumns}
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
      </div>
    </div>
  );
}

function ViewStatus({ order }) {
  const { status, icon, color } = showTextOrderStatus(order?.status);

  return (
    <Chip
      icon={icon}
      label={status}
      style={{ backgroundColor: color, color: '#fff', width: '142px' }}
    />
  );
}
