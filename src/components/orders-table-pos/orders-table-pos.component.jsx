import { FormControlLabel } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { formatDateTime, numberWithCommas } from '../../common/utils';
import { getAllOrdersOfPosRequest } from '../../redux/actions/order.action';
import { useStyles } from './orders-table-pos.style';

function OrdersTableForPos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const { order: orderSelector } = useSelector((state) => state);

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
      navigate(`/orders/pos/${data._id}`);
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

  const handleSearchOrder = (e) => {
    e.preventDefault();
    fetchOrders({ search: searchQuery, ...query, page: 1 });
  };

  React.useEffect(() => {
    fetchOrders({ ...query, search: searchQuery });
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
              type="submit"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={handleSearchOrder}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
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
      </div>
    </div>
  );
}

export default OrdersTableForPos;
