import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import OrderDetailsForPos from '../../../components/order-detail-pos';
import SideBar from '../../../components/side-bar';
import routes from '../../../router/list.route';
import { useStyles } from './orders-table-pos.style';
import { getOrderByIdOfPosRequest } from '../../../redux/actions/order.action';
import Typography from '@mui/material/Typography';

export function OrderDetailForPos() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { order: orderSelector } = useSelector((state) => state);

  const fetchOrderById = (id) => {
    dispatch(getOrderByIdOfPosRequest(id));
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
          <OrderDetailsForPos order={orderSelector.order} />
        </div>
      </div>
    </SideBar>
  );
}
