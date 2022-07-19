import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';

import { useStyles } from '../../pages/pos/pos-page.style';
import { formatDateTime, numberWithCommas } from '../../common/utils';
export const ComponentToPrint = React.forwardRef((props, ref) => {
  const { order } = props;
  const classes = useStyles();

  return (
    <div ref={ref} className={classes.recieptPaper}>
      <div className={classes.recieptPaperHeader}>
        <h4>Rene</h4>
        <h4>Số điện thoại: 19006017</h4>
        <h4>
          Địa chỉ: Tầng 6 TTTM Giga Mall, 240, 242 Đ. Phạm Văn Đồng, Hiệp Bình
          Chánh, Thủ Đức, Thành phố Hồ Chí Minh 700000, Việt Nam.
        </h4>
        <h2 style={{ textAlign: 'center', margin: '20px 0' }}>
          HÓA ĐƠN THANH TOÁN
        </h2>

        <div className={classes.customerInfo}>
          <p>
            Ngày bán:&nbsp;<span>{formatDateTime(order?.created_at)}</span>
          </p>
          <p>
            Khách hàng:&nbsp;<span>{order?.fullName}</span>
          </p>
          <p>
            Số điện thoại:&nbsp;<span>{order?.phone}</span>
          </p>
          <p>
            Địa chỉ:&nbsp;<span>{order?.address || 'Chưa có thông tin.'}</span>
          </p>
        </div>
      </div>
      <TableContainer component={Paper} className={classes.invoice}>
        <Table sx={{ minWidth: 700 }} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell style={{ fontWeight: 'bold', fontSize: 'large' }}>
                Mã sản phẩm
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
            {order?.products?.length > 0
              ? order?.products?.map((product) => (
                  <TableRow key={product?._id}>
                    <TableCell>{product?.productId?.productId?.code}</TableCell>
                    <TableCell align="right">{product?.quantity}</TableCell>
                    <TableCell align="right">
                      {numberWithCommas(product?.price)}&nbsp;&#8363;
                    </TableCell>
                    <TableCell align="right">
                      {numberWithCommas(product?.quantity * product?.price)}
                      &nbsp;&#8363;
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
                {numberWithCommas(order?.total)}&nbsp;&#8363;
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
                {numberWithCommas(order?.total)}&nbsp;&#8363;
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classes.recieptPaperFooter}>
        <p>Cảm ơn quý khách, hẹn gặp lại!</p>
      </div>
    </div>
  );
});
