import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { emphasize, styled } from '@mui/material/styles';
import * as React from 'react';
import { useStyles } from './products.style';

// pages
import CreateProductForm from '../../components/add-product-form';
import ProductsTable from '../../components/products-table';
import SideBar from '../../components/side-bar';

export default function Products() {
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

  const [openAddProduct, setOpenAddProduct] = React.useState(false);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <SideBar
      onClick={() => {
        setOpenAddProduct(false);
      }}
    >
      <div className={classes.wrapper}>
        {!openAddProduct ? (
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
                variant="outlined"
                onClick={() => {
                  setOpenAddProduct(true);
                }}
              >
                Thêm sản phẩm
              </Button>
              {/* <Button variant="outlined">Tạo mã vạch</Button>
              <Button variant="outlined">Nhập xuất Excel</Button> */}
            </Stack>
          </div>
        ) : (
          <div>
            <div role="presentation" onClick={handleClick}>
              <Breadcrumbs aria-label="breadcrumb">
                <StyledBreadcrumb
                  component="p"
                  label="Sản phẩm"
                  onClick={() => setOpenAddProduct(false)}
                />
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
          {!openAddProduct ? (
            <ProductsTable />
          ) : (
            <CreateProductForm onClick={() => setOpenAddProduct(false)} />
          )}
        </div>
      </div>
    </SideBar>
  );
}
