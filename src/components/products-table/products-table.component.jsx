import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControlLabel } from '@material-ui/core';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue, red } from '@material-ui/core/colors';
import { useStyles } from './products-table.style';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
// import { numberWithCommas } from '../../common/utils';

import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function ProductsTable() {
  const classes = useStyles();
  const [products, setProducts] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(false);
  const [category, setCategory] = React.useState({
    brand: '',
    status: '',
    filter: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(category);
  };

  const currencyFormatter = new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'VND',
  });

  const vndPrice = {
    type: 'number',
    width: 130,
    valueFormatter: ({ value }) => currencyFormatter.format(value),
  };
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    { field: 'idProduct', headerName: 'Mã sản phẩm', width: 130 },
    { field: 'name', headerName: 'Tên sản phẩm', width: 300 },

    { field: 'brand', headerName: 'Thương hiệu', width: 130 },
    {
      field: 'price',
      headerName: 'Giá',
      type: 'number',
      width: 120,
      ...vndPrice,
    },
    { field: 'status', headerName: 'Trạng thái', width: 130 },
    { field: 'category', headerName: 'Category', width: 130 },
    {
      field: 'color',
      headerName: 'Số lượng màu',
      width: 120,
      align: 'center',
    },

    {
      field: 'actions',
      headerName: 'Thao tác',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      align: 'right',
      renderCell: (params) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <ProductEdit index={params.row.id} />
          </div>
        );
      },
    },
  ];

  const ProductEdit = ({ index }) => {
    const handleEditClick = () => {
      // some action
      console.log(index);
    };
    const handleDeleteClick = () => {
      // some action
      console.log(index);
    };
    return (
      <div>
        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={handleEditClick}
            >
              <EditIcon style={{ color: blue[500] }} />
            </IconButton>
          }
        />
        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              aria-label="add an alarm"
              onClick={handleDeleteClick}
            >
              <DeleteIcon style={{ color: red[500] }} />
            </IconButton>
          }
        />
      </div>
    );
  };

  // fetch data from JSON server
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // setIsLoading(true);
    const result = await axios.get('products');
    setProducts(await result.data);
    // setIsLoading(false);
  };

  return (
    <div className={classes.content}>
      <div className={classes.filterWrapper}>
        <div className={classes.filterSearchWrap}>
          <Paper component="form" className={classes.filterSearch}>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              fullWidth
              placeholder="Tìm sản phẩm!"
              inputProps={{ 'aria-label': 'Tìm sản phẩm!' }}
            />

            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className={classes.filterSelectWrap}>
          <FormControl sx={{ m: 1 }} className={classes.filterSelect}>
            <InputLabel id="demo-simple-select-helper-label-brand">
              Chọn nhãn hiệu
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label-brand"
              id="demo-simple-select-helper-brand"
              value={category.brand}
              label="Chọn nhãn hiệu "
              name="brand"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={10}>SAMSUNG</MenuItem>
              <MenuItem value={20}>JBL</MenuItem>
              <MenuItem value={30}>Sony</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1 }} className={classes.filterSelect}>
            <InputLabel id="demo-simple-select-helper-label-stt">
              Trạng thái
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label-stt"
              id="demo-simple-select-helper-stt"
              value={category.status}
              label="Trạng thái"
              name="status"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value={10}>Còn hàng</MenuItem>
              <MenuItem value={20}>Hết hàng</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 1 }} className={classes.filterSelect}>
            <InputLabel id="demo-simple-select-helper-label-filter">
              Sắp xếp
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label-filter"
              id="demo-simple-select-helper-filter"
              value={category.filter}
              label="Sắp xếp"
              name="filter"
              onChange={handleChange}
            >
              <MenuItem value={10}>Giá: Cao đến thấp</MenuItem>
              <MenuItem value={20}>Giá: Thấp đến cao</MenuItem>
              <MenuItem value={30}>Tên: A đến Z</MenuItem>
              <MenuItem value={40}>Tên: Z đến A</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
    </div>
  );
}

export default ProductsTable;
