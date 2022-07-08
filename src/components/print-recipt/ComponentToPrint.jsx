import React from 'react';

import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import { useStyles } from '../../pages/pos/pos-page.style';
import { numberWithCommas } from '../../common/utils';

export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { cart, totalAmount } = props;
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.recieptPaper}>
      <TableContainer component={Paper} className={classes.invoice}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: 'large' }}>
                Mã sản phẩm{' '}
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', fontSize: 'large' }}
              >
                Số lượng
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', fontSize: 'large' }}
              >
                Giá
              </TableCell>
              <TableCell
                align="right"
                style={{ fontWeight: 'bold', fontSize: 'large' }}
              >
                Tổng giá
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart
              ? cart.map((cartProduct, key) => (
                  <TableRow key={key}>
                    <TableCell>{cartProduct.idProduct}</TableCell>
                    <TableCell align="right">{cartProduct.quantity}</TableCell>
                    <TableCell align="right">
                      {numberWithCommas(cartProduct.price)} vnđ
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(cartProduct.totalAmount)} vnđ
                    </TableCell>
                  </TableRow>
                ))
              : ''}

            <TableRow>
              <TableCell />
              <TableCell align="right" colSpan={2}>
                Tạm tính
              </TableCell>
              <TableCell align="right">
                {numberWithCommas(totalAmount)} vnđ
              </TableCell>
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
      </TableContainer>
    </div>
  );
});
