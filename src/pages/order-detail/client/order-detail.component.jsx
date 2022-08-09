import Button from '@mui/material/Button';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OrderDetails from '../../../components/order-details/order-details.component';
import SideBar from '../../../components/side-bar';
import { getOrderByIdRequest } from '../../../redux/actions/order.action';
import routes from '../../../router/list.route';
import { useStyles } from './orders-table-pos.style';
import Typography from '@mui/material/Typography';

export function OrderDetail() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { order: orderSelector } = useSelector((state) => state);

  const fetchOrderById = (id) => {
    dispatch(getOrderByIdRequest(id));
  };

  React.useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  return (
    <SideBar>
      <div className={classes.content}>
        <div className={classes.filterWrapper}>
          <Typography variant="h5" fontWeight={600}>
            CHI TIẾT ĐƠN HÀNG
          </Typography>

          <div className={classes.filterSelectWrap}>
            <Button variant="outlined" onClick={() => navigate(routes.orders)}>
              Quay lại
            </Button>
          </div>
        </div>
        <div style={{ height: 400, width: '100%' }}>
          <OrderDetails order={orderSelector.order} />
        </div>
      </div>
    </SideBar>
  );
}
