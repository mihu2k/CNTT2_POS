import * as React from 'react';

import { useStyles } from './products.style';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { numberWithCommas } from '../../common/utils';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SideBar from '../../components/side-bar';

function CreactProduct() {
  const classes = useStyles();

  return (
    <SideBar>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <h3>Sản phẩm</h3>
          <Stack spacing={2} direction="row" className={classes.buttonWrap}>
            <Button variant="contained">Thêm sản phẩm</Button>
            <Button variant="contained">Tạo mã vạch</Button>
            <Button variant="contained">Nhập xuất Excel</Button>
          </Stack>
        </div>
        <div className={classes.container}>
          <div className={classes.content}></div>
        </div>
      </div>

      <ToastContainer />
    </SideBar>
  );
}

export default CreactProduct;
