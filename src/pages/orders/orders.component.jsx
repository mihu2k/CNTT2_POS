import { useStyles } from './orders.style';
import * as React from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// import { numberWithCommas } from '../../common/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// pages
import SideBar from '../../components/side-bar';
import OrdersTable from '../../components/orders-table';

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

  const date = new Date();
  const currentDate = date.getDate();
  date.setDate(currentDate);
  const defaultValue = date.toLocaleDateString('en-CA');

  return (
    <SideBar>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              label="Đơn hàng"
              deleteIcon={<ExpandMoreIcon />}
              onDelete={handleClick}
            />
          </Breadcrumbs>
          <Stack spacing={2} direction="row" className={classes.buttonWrap}>
            <Button variant="outlined">Nhập xuất Excel</Button>
            <TextField
              type="date"
              defaultValue={defaultValue}
              id="outlined-basic"
              variant="outlined"
            />
          </Stack>
        </div>

        <div className={classes.container}>
          <OrdersTable />
        </div>
      </div>

      <ToastContainer />
    </SideBar>
  );
}

export default Products;
