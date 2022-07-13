import { useStyles } from './products.style';
import * as React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import HomeIcon from '@mui/icons-material/Home';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { numberWithCommas } from '../../common/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// pages
import SideBar from '../../components/side-bar';
import ProductsTable from '../../components/products-table';
import CreateProductForm from '../../components/add-product-form';

function Products() {
  const classes = useStyles();
  const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  });

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const [addProduct, setAddProduct] = React.useState(false);

  return (
    <SideBar>
      <div className={classes.wrapper}>
        {!addProduct ? (
          <div className={classes.header}>
            <Breadcrumbs aria-label="breadcrumb">
              <StyledBreadcrumb
                label="Sản phẩm"
                deleteIcon={<ExpandMoreIcon />}
                onDelete={handleClick}
              />
            </Breadcrumbs>
            <Stack spacing={2} direction="row" className={classes.buttonWrap}>
              <Button
                variant="contained"
                onClick={() => {
                  setAddProduct(true);
                }}
              >
                <AddRoundedIcon />
                Thêm sản phẩm
              </Button>
              <Button variant="outlined">Tạo mã vạch</Button>
              <Button variant="outlined">Nhập xuất Excel</Button>
            </Stack>
          </div>
        ) : (
          <div>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb component="a" href="#" label="Sản phẩm" />
                <StyledBreadcrumb
                  label="Thêm sản phẩm"
                  deleteIcon={<ExpandMoreIcon />}
                  onDelete={handleClick}
                />
              </Breadcrumbs>
            </div>
          </div>
        )}

        <div className={classes.container}>
          {!addProduct ? <ProductsTable /> : <CreateProductForm />}
        </div>
      </div>

      <ToastContainer />
    </SideBar>
  );
}

export default Products;
