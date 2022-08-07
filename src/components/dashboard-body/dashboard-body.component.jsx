import * as React from 'react';
import { useStyles } from './dashboard-body.style';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Chart from '../line-chart/line-chart.component';

function ReportField() {
  const classes = useStyles();

  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboardHeader}>
        <h3>BÁO CÁO TỔNG QUAN</h3>
      </div>
      <div className={classes.dashboardBody}>
        <div className={classes.dashboardContent}>
          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>
                Doanh thu (theo ngày)
              </span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>0</span>
          </div>
          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>Số đơn hàng</span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>0</span>
          </div>

          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>
                Doanh số (theo tháng)
              </span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>0</span>
          </div>
          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>
                Lợi nhuận khách mới
              </span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>0</span>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
}

export default ReportField;
