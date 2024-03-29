import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
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
import TextField from '@mui/material/TextField';
import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { numberWithCommas, showToastMsg } from '../../common/utils';
import { ComponentToPrint } from '../../components/print-recipt/ComponentToPrint';
import ProductBox from '../../components/product-box/product-box.component';
import User from '../../components/user';
import useDebounce from '../../hooks/useDebounce';
import { createOrderRequest } from '../../redux/actions/order.action';
import { getProductsRequest } from '../../redux/actions/product.action';
import { useStyles } from './pos-page.style';

const phoneRegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function Pos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState({ search: '', per_page: 9 });
  const [productsOrder, setProductsOrder] = React.useState([]);
  const {
    product: productReducer,
    auth: authSelector,
    order: orderSelector,
  } = useSelector((state) => state);
  // start invoice cpn
  const [selectUser, setSelectUser] = React.useState(1);
  const handleChangeUser = (event) => {
    setSelectUser(event.target.value);
  };
  // end invoice cpn
  const [infoCustomer, setInfoCustomer] = React.useState({
    email: '',
    address: '',
    fullName: '',
    phone: '',
  });

  const handleChange = (e) => {
    setInfoCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (
      !infoCustomer.email.match(emailRegExp) ||
      infoCustomer.fullName === '' ||
      !infoCustomer.phone.match(phoneRegExp)
    ) {
      showToastMsg('error', 'Thông tin sai.', { toastId: 1 });
      return;
    }
    const data = {
      ...infoCustomer,
      products: productsOrder,
      total: productsOrder.reduce(
        (total, product) => total + product.price * product.quantity,
        0,
      ),
    };
    dispatch(
      createOrderRequest(data, () => {
        showToastMsg('success', 'Thanh toán thành công.', {
          onClose: () => handleReactToPrint(),
          autoClose: 2500,
        });
      }),
    );
  };

  const removeProductOrder = (product) => {
    const newStore = [...productsOrder];
    const newProduct = newStore.filter(
      (item) =>
        item._id !== product._id || item.colorValue !== product.colorValue,
    );
    setProductsOrder(newProduct);
  };

  // print receipt function
  const componentRef = React.useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePushToOrder = (product, color) => {
    const newStore = [...productsOrder];

    const index = newStore.findIndex(
      (item) => item._id === product._id && item.colorValue === color.value,
    );
    const data = {
      ...product,
      colorValue: color.value,
      colorName: color.name,
      colorImage: color.image,
      quantity: 1,
    };

    if (index > -1) {
      newStore[index].quantity = newStore[index].quantity + 1;
    } else {
      newStore.push(data);
    }
    setProductsOrder(newStore);
  };

  const fetchProducts = (query = {}) => {
    dispatch(getProductsRequest(query));
  };

  const debouncedValue = useDebounce(query, 500);

  React.useEffect(() => {
    // if (!debouncedValue.search.trim()) {
    //   return;
    // }
    dispatch(getProductsRequest(query));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  React.useEffect(() => {
    fetchProducts(query);
  }, []);

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.searchWrap}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder={'Tìm hàng hóa'}
            onChange={(e) =>
              setQuery((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </div>
        <User />
      </header>

      <div className={classes.container}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <InfiniteScroll
                dataLength={productReducer.products?.length}
                next={() => {
                  setQuery((prev) => ({
                    ...query,
                    per_page: prev.per_page + 9,
                  }));
                  fetchProducts({
                    ...query,
                    per_page: query.per_page + 9,
                  });
                }}
                hasMore={
                  productReducer.products?.length < productReducer.totalRecord
                }
                // loader={<Loading />}
                // loader={<h4>Loading...</h4>}
                // scrollThreshold={1}
                height="calc(100vh - 60px)"
              >
                <div className={classes.containerRow}>
                  <Grid container spacing={2}>
                    {productReducer.products?.length > 0 ? (
                      productReducer.products?.map((product) => (
                        <ProductBox
                          key={product._id}
                          product={product}
                          onPush={handlePushToOrder}
                        />
                      ))
                    ) : (
                      <p style={{ marginTop: '20px' }}>
                        {query.search
                          ? 'Không tìm thấy sản phẩm nào.'
                          : 'Chưa có sản phẩm nào.'}
                      </p>
                    )}
                  </Grid>
                </div>
              </InfiniteScroll>
            </Grid>

            <Grid item xs={5} className={classes.invoiceWrapper}>
              <div style={{ display: 'none' }}>
                <ComponentToPrint
                  order={orderSelector.order}
                  ref={componentRef}
                />
              </div>

              <TableContainer
                component={Paper}
                className={classes.invoice}
                id="invoice"
              >
                <Table aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <FormControl sx={{ minWidth: '100%' }}>
                          <InputLabel id="demo-simple-select-autowidth-label">
                            Nhân viên
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={selectUser}
                            onChange={handleChangeUser}
                            autoWidth
                            label="Nhân viên"
                            disabled
                          >
                            {/* <MenuItem value={0}>Rene</MenuItem> */}
                            <MenuItem value={1}>
                              {authSelector.profile?.full_name}
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      {/* <TableCell colSpan={3}>
                        <Button
                          fullWidth
                          variant="text"
                          onClick={() => setNewCustomer(true)}
                        >
                          Thông tin khách hàng
                        </Button>
                      </TableCell> */}
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={2}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Tên khách hàng"
                          type="text"
                          fullWidth
                          variant="outlined"
                          name="fullName"
                          value={infoCustomer.fullName}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell colSpan={3}>
                        <TextField
                          margin="dense"
                          label="Email"
                          type="email"
                          name="email"
                          fullWidth
                          variant="outlined"
                          value={infoCustomer.email}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell colSpan={3}>
                        <TextField
                          margin="dense"
                          label="Địa chỉ"
                          type="text"
                          name="address"
                          fullWidth
                          variant="outlined"
                          value={infoCustomer.address}
                          onChange={handleChange}
                        />
                      </TableCell>
                      <TableCell colSpan={3}>
                        <TextField
                          margin="dense"
                          label="Số điện thoại"
                          type="tel"
                          name="phone"
                          fullWidth
                          variant="outlined"
                          value={infoCustomer.phone}
                          onChange={handleChange}
                        />
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell>Mã sản phẩm </TableCell>
                      <TableCell align="right">Số lượng</TableCell>
                      <TableCell align="right">Giá</TableCell>
                      <TableCell align="right">Tổng giá</TableCell>
                      <TableCell align="center">Xóa</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productsOrder.length > 0
                      ? productsOrder?.map((product) => (
                          <TableRow key={product._id + product.colorValue}>
                            <TableCell>
                              {product.code}&nbsp;({product.colorName})
                            </TableCell>
                            <TableCell align="right">
                              {product.quantity}
                            </TableCell>
                            <TableCell align="right">
                              {numberWithCommas(product.price)}&nbsp;&#8363;
                            </TableCell>
                            <TableCell align="right">
                              {numberWithCommas(
                                product.price * product.quantity,
                              )}
                              &nbsp;&#8363;
                            </TableCell>
                            <TableCell align="center">
                              <DeleteIcon
                                style={{ cursor: 'pointer' }}
                                onClick={() => removeProductOrder(product)}
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      : null}

                    <TableRow>
                      <TableCell />
                      <TableCell align="right" colSpan={2}>
                        Tạm tính
                      </TableCell>
                      <TableCell align="right">
                        <span>
                          {numberWithCommas(
                            productsOrder.reduce(
                              (total, product) =>
                                total + product.price * product.quantity,
                              0,
                            ),
                          )}
                          &nbsp;&#8363;
                        </span>
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
                        <p>
                          {numberWithCommas(
                            productsOrder.reduce(
                              (total, product) =>
                                total + product.price * product.quantity,
                              0,
                            ),
                          )}
                          &nbsp;&#8363;
                        </p>
                      </TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <div className={classes.invoiceFooter}>
                <Button
                  className={classes.invoicePaymentBtn}
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={productsOrder.length === 0}
                >
                  Thanh toán
                </Button>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}

export default Pos;
