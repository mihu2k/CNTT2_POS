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
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime, numberWithCommas } from '../../common/utils';
import {
  getProductsRequest,
  deleteProductRequest,
} from '../../redux/actions/product.action';
import EditProductForm from '../../components/edit-product-form';

function ProductsTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [editProduct, setEditProduct] = React.useState(false);
  const [idProduct, setIdProduct] = React.useState('');
  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });
  const [searchQuery, setSearchQuery] = React.useState('');

  const { product: productSelector } = useSelector((state) => state);

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

  const columns = [
    {
      field: 'code',
      headerName: 'Mã sản phẩm',
      width: 200,
    },
    { field: 'name', headerName: 'Tên sản phẩm', flex: 1 },
    { field: 'brand', headerName: 'Thương hiệu', width: 140 },
    {
      field: 'categoryId',
      headerName: 'Category',
      width: 140,
      valueFormatter: ({ value }) => value.name,
    },
    {
      field: 'created_at',
      headerName: 'Thời gian tạo',
      width: 160,
      align: 'left',
      valueFormatter: ({ value }) => formatDateTime(value),
    },
    {
      field: 'price',
      headerName: 'Giá (VNĐ)',
      align: 'right',
      type: 'number',
      width: 120,
      valueFormatter: ({ value }) => numberWithCommas(value),
    },
    {
      field: 'colors',
      headerName: 'Số lượng màu',
      width: 120,
      align: 'center',
      valueFormatter: ({ value }) => value.length,
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
            <ProductEdit id={params.row._id} />
          </div>
        );
      },
    },
  ];

  const ProductEdit = ({ id }) => {
    const handleEditClick = () => {
      // some action
      setEditProduct(true);
      setIdProduct(id);
    };
    const handleDeleteClick = () => {
      console.log(id);
      if (window.confirm('Bạn muốn xóa sản phẩm này?')) {
        dispatch(deleteProductRequest(id));
        dispatch(getProductsRequest(query));
      }
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

  const handleSearchProduct = (e) => {
    e.preventDefault();
    setQuery((prev) => ({ ...prev, page: 1 }));
    fetchProducts({ search: searchQuery, ...query, page: 1 });
  };

  const fetchProducts = (query = {}) => {
    dispatch(getProductsRequest(query));
  };

  React.useEffect(() => {
    fetchProducts({ ...query, search: searchQuery });
  }, [query]);

  return (
    <>
      {editProduct ? (
        <EditProductForm
          id={idProduct}
          onClick={() => {
            setEditProduct(false);
          }}
        />
      ) : (
        <div className={classes.content}>
          <div className={classes.filterWrapper}>
            <div className={classes.filterSearchWrap}>
              <Paper component="form" className={classes.filterSearch}>
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  fullWidth
                  placeholder="Tìm sản phẩm theo tên!"
                  inputProps={{ 'aria-label': 'Tìm sản phẩm theo tên!' }}
                  value={searchQuery}
                  onChange={(e) => {
                    if (!e.target.value)
                      setQuery((prev) => ({ ...prev, page: 1 }));
                    setSearchQuery(e.target.value);
                  }}
                />

                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton
                  type="submit"
                  sx={{ p: '10px' }}
                  aria-label="search"
                  onClick={handleSearchProduct}
                >
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
              rows={productSelector.products?.map((item, index) => ({
                ...item,
                id: index + 1 + query.per_page * (query.page - 1),
              }))}
              columns={columns}
              pageSize={query.per_page}
              rowsPerPageOptions={[5, 10]}
              onPageChange={(newPage) =>
                setQuery((prev) => ({ ...prev, page: Number(newPage) + 1 }))
              }
              onPageSizeChange={(newPage) =>
                setQuery((prev) => ({ ...prev, per_page: newPage }))
              }
              rowCount={productSelector.totalRecord}
              pagination
              paginationMode="server"
              page={query?.page - 1}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProductsTable;
