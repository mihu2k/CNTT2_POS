import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import {
  formatDateTime,
  numberWithCommas,
  showToastMsg,
} from '../../common/utils';
import { useStyles } from './order-detail-pos.style';

export default function OrderDetailsForPos({ order }) {
  const classes = useStyles();

  const handlePrintOrder = () => {
    showToastMsg('warning', 'Chức năng chưa hoàn thành.', {
      toastId: 'MH',
      autoClose: 2500,
    });
  };

  return (
    <Grid item xs={12} className={classes.invoiceWrapper}>
      <TableContainer component={Paper} className={classes.invoice}>
        <Table aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant="h5" fontWeight={600}>
                  CHI TIẾT ĐƠN HÀNG
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <p>Mã đơn hàng:&nbsp;{order?.code}</p>
                <p>
                  Tạo bởi nhân viên:&nbsp;{order?.employee?.full_name}
                  &nbsp;-&nbsp;Lúc:&nbsp;{formatDateTime(order?.created_at)}
                </p>
                <p className="d-f" style={{ alignItems: 'center' }}>
                  Trạng thái:&nbsp;&nbsp;
                  <CheckCircleIcon color="success" fontSize="small" />
                  &nbsp;&nbsp;(Đã hoàn thành)
                </p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <p>Khách hàng:&nbsp;{order?.fullName}</p>
                <p>Email:&nbsp;{order?.email}</p>
                <p>Số điện thoại:&nbsp;{order?.phone}</p>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Hình ảnh</TableCell>
              <TableCell>Mã sản phẩm</TableCell>
              <TableCell align="right">Tên sản phẩm</TableCell>
              <TableCell align="right">Số lượng</TableCell>
              <TableCell align="right">Giá (VNĐ)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ overflowY: 'scroll' }}>
            {order?.products?.length > 0 ? (
              order?.products?.map((product, index) => (
                <TableRow key={product?._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div style={{ alignItems: 'center' }} className="d-f">
                      <img
                        src={`${process.env.REACT_APP_API_BASE_URL}${product?.productId?.colorImage}`}
                        alt={product?.productId?.productId?.name}
                        loading="lazy"
                        style={{
                          width: '50px',
                          height: '50px',
                          border: '1px solid #f1f1f1',
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>{product?.productId?.productId?.code}</TableCell>
                  <TableCell align="right">
                    {product?.productId?.productId?.name}
                  </TableCell>
                  <TableCell align="right">{product?.quantity}</TableCell>
                  <TableCell align="right">
                    {numberWithCommas(product?.price)}&nbsp;&#8363;
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <p>Lỗi hiển thị sản phẩm.</p>
            )}
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align="right" colSpan={2}>
                Tạm tính:
              </TableCell>
              <TableCell align="right">
                <span>{numberWithCommas(order?.total)}&nbsp;&#8363;</span>
              </TableCell>
              <TableCell />
            </TableRow>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell
                align="right"
                colSpan={2}
                style={{ fontWeight: 'bold', fontSize: 'large' }}
              >
                Tổng cộng:
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
                <span>{numberWithCommas(order?.total)}&nbsp;&#8363;</span>
              </TableCell>
              <TableCell />
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.settingBtns}>
          <Button variant="contained" onClick={handlePrintOrder}>
            In đơn hàng
          </Button>
        </div>
      </TableContainer>
    </Grid>
  );
}
