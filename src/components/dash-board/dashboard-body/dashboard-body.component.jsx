import * as React from 'react';

import { useStyles } from './dashboard-body.style';

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function ReportField() {
  const classes = useStyles();

  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboardHeader}>
        <h3>BÁO CÁO TỔNG QUAN</h3>
        <div>
          <FormControl fullWidth className={classes.formField}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
              Chi nhánh
            </InputLabel>
            <NativeSelect
              defaultValue={1}
              inputProps={{
                name: 'Chi nhánh',
                id: 'uncontrolled-native',
              }}
            >
              <option value={0}>Tất cả</option>
              <option value={1}>René</option>
            </NativeSelect>
          </FormControl>
        </div>
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
              <span className={classes.dashboardCardTitle}>
                Lợi nhuận (doanh thu - chí phí)
              </span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>Chưa thống kê</span>
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
              <span className={classes.dashboardCardTitle}>Hàng trả lại</span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>Chưa thống kê</span>
          </div>

          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>Chi phí</span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>Chưa thống kê</span>
          </div>

          <div className={classes.dashboardCard}>
            <div className={classes.metricLabel}>
              <span className={classes.dashboardCardTitle}>
                Tổng giá trị hàng khuyến mãi
              </span>
              <ArrowDropDownIcon />
            </div>
            <span className={classes.metricValue}>Chưa thống kê</span>
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
      </div>
    </div>
  );
}

export default ReportField;
