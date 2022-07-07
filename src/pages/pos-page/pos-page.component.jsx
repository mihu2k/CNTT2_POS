import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
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
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStyles } from './pos-page.style';
import User from '../../components/user';
import axios from 'axios';

import { numberWithCommas } from '../../common/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../components/print-recipt/ComponentToPrint';

function PosPage() {
  const classes = useStyles();

  // start invoice cpn
  const [selectUser, setSelectUser] = React.useState(1);
  const handleChangeUser = (event) => {
    setSelectUser(event.target.value);
  };

  // end invoice cpn

  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cart, setCart] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  // add product into cart
  const addProductToCart = async (product) => {
    //check if the adding product exist
    let findProductInCart = await cart.find((item) => {
      return item.id === product.id;
    });

    if (findProductInCart) {
      let newCart = [];
      let newItem;
      cart.forEach((cartItem) => {
        if (cartItem.id === product.id) {
          newItem = {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            totalAmount: cartItem.price * (cartItem.quantity + 1),
          };
          newCart.push(newItem);
        } else {
          newCart.push(cartItem);
        }
      });
      setCart(newCart);
      toast(`Đã thêm 1 sản phẩm có mã ${newItem.idProduct}!`);
    } else {
      let addingProduct = {
        ...product,
        quantity: 1,
        totalAmount: product.price,
      };
      setCart([...cart, addingProduct]);
      toast(`Đã thêm 1 sản phẩm có mã ${addingProduct.idProduct}!`);
    }
  };

  // Delete product out of cart
  const removeProduct = async (product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
    toast(`Đã xóa sản phẩm có mã ${product.idProduct}!`);
  };

  // set totalAmount of all product in cart when  cart chnage
  React.useEffect(() => {
    let newTotalAmount = 0;
    cart.forEach((itemCart) => {
      newTotalAmount = newTotalAmount + parseInt(itemCart.totalAmount);
    });
    setTotalAmount(newTotalAmount);
  }, [cart]);

  // print recipt function
  const componentRef = React.useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePrint = () => {
    handleReactToPrint();
  };

  // fetch data from JSON server
  React.useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    const result = await axios.get('products');
    setProducts(await result.data);
    setIsLoading(false);
  };

  return (
    <div>
      <header className={classes.header}>
        <div className={classes.searchWrap}>
          <input
            type="text"
            className={classes.searchInput}
            placeholder={'Tìm hàng hóa'}
          />
        </div>
        <User />
      </header>

      <div className={classes.container}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              {isLoading ? (
                'Loading'
              ) : (
                <div className={classes.containerRow}>
                  <Grid container spacing={2}>
                    {
                      // eslint-disable-next-line array-callback-return
                      products.map((product, index) => (
                        <Grid key={index} item xs={4}>
                          <div
                            className={classes.productWrap}
                            onClick={() => addProductToCart(product)}
                          >
                            <img
                              src={product.image}
                              className={classes.imgFluid}
                              alt={product.name}
                            />
                            <p className={classes.productName}>
                              {product.name}
                            </p>
                            <p className={classes.productId}>
                              Mã sản phẩm: {product.idProduct}
                            </p>

                            <p className={classes.productPrice}>
                              {numberWithCommas(product.price)} vnđ
                            </p>
                          </div>
                        </Grid>
                      ))
                    }
                  </Grid>
                </div>
              )}
            </Grid>
            <Grid item xs={5} className={classes.invoiceWrapper}>
              <div style={{ display: 'none' }}>
                <ComponentToPrint
                  cart={cart}
                  totalAmount={totalAmount}
                  ref={componentRef}
                />
              </div>

              <TableContainer component={Paper} className={classes.invoice}>
                <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <FormControl sx={{ m: 1, minWidth: '100%' }}>
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
                          >
                            <MenuItem value={0}>Rene</MenuItem>
                            <MenuItem value={1}>Trương Minh Hưng</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <TextField
                          fullWidth
                          id="outlined-basic"
                          label="Nhập email khách hàng"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell colSpan={1}>
                        <Button fullWidth variant="text">
                          Thêm mới
                        </Button>
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
                  <TableBody style={{ overflowY: 'scroll' }}>
                    {cart ? (
                      cart.map((cartProduct, key) => (
                        <TableRow key={key}>
                          <TableCell>{cartProduct.idProduct}</TableCell>
                          <TableCell align="right">
                            {cartProduct.quantity}
                          </TableCell>
                          <TableCell align="right">
                            {numberWithCommas(cartProduct.price)} vnđ
                          </TableCell>
                          <TableCell align="right">
                            {numberWithCommas(cartProduct.totalAmount)} vnđ
                          </TableCell>
                          <TableCell align="center">
                            <DeleteIcon
                              style={{ cursor: 'pointer' }}
                              onClick={() => removeProduct(cartProduct)}
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <span> No item in cart</span>
                    )}

                    <TableRow>
                      <TableCell />
                      <TableCell align="right" colSpan={2}>
                        Tạm tính
                      </TableCell>
                      <TableCell align="right">
                        {numberWithCommas(totalAmount)} vnđ
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
                        style={{ fontWeight: 'bold', fontSize: 'large' }}
                      >
                        {numberWithCommas(totalAmount)} vnđ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>

                <div className={classes.invoiceFooter}>
                  {totalAmount !== 0 ? (
                    <Button
                      className={classes.invoicePaymentBtn}
                      variant="contained"
                      onClick={handlePrint}
                    >
                      Thanh toán
                    </Button>
                  ) : (
                    <span className={classes.invoicePaymentText}>
                      Chưa có sản phẩm nào trong giỏ hàng!
                    </span>
                  )}
                </div>
              </TableContainer>
            </Grid>
          </Grid>
        </Box>
      </div>

      <ToastContainer />
    </div>
  );
}

export default PosPage;
