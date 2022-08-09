import React from 'react';
import { numberWithCommas } from '../../common/utils';
import { OrderService } from '../../services/order.service';
import Chart from '../line-chart/line-chart.component';
import Loading from '../loading/loading.component';
import { useStyles } from './dashboard-body.style';

function ReportField() {
  const classes = useStyles();
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const revenueByYear = React.useMemo(() => {
    let totalByYear = 0;
    if (data) {
      const revenue = data.revenue.filter(
        (item) => item._id.year === currentYear,
      );
      const revenuePos = data.revenuePos.filter(
        (item) => item._id.year === currentYear,
      );

      const totalRevenue = revenue.reduce(
        (total, item) => total + item.total,
        0,
      );
      const totalRevenuePos = revenuePos.reduce(
        (total, item) => total + item.total,
        0,
      );
      totalByYear = totalRevenue + totalRevenuePos;
    }
    return totalByYear;
  }, [data, currentYear]);

  const revenueByMonth = React.useMemo(() => {
    let totalByMonth = 0;
    if (data) {
      const revenue = data.revenue.filter(
        (item) => item._id.month === currentMonth,
      );
      const revenuePos = data.revenuePos.filter(
        (item) => item._id.month === currentMonth,
      );

      const totalRevenue = revenue.reduce(
        (total, item) => total + item.total,
        0,
      );
      const totalRevenuePos = revenuePos.reduce(
        (total, item) => total + item.total,
        0,
      );
      totalByMonth = totalRevenue + totalRevenuePos;
    }
    return totalByMonth;
  }, [data, currentMonth]);

  const fetchStatistic = () => {
    setLoading(true);
    OrderService.getStatistic()
      .then(({ data }) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  React.useEffect(() => {
    fetchStatistic();
  }, []);

  return (
    <div className={classes.dashboard}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={classes.dashboardHeader}>
            <h3>BÁO CÁO TỔNG QUAN</h3>
          </div>
          <div className={classes.dashboardBody}>
            <div className={classes.dashboardContent}>
              <div className={classes.dashboardCard}>
                <div className={classes.metricLabel}>
                  <span className={classes.dashboardCardTitle}>
                    Doanh thu trong tháng (VNĐ)
                  </span>
                  {/* <ArrowDropDownIcon /> */}
                </div>
                <span className={classes.metricValue}>
                  {numberWithCommas(revenueByMonth)}
                </span>
              </div>
              <div className={classes.dashboardCard}>
                <div className={classes.metricLabel}>
                  <span className={classes.dashboardCardTitle}>
                    Doanh số trong năm (VNĐ)
                  </span>
                  {/* <ArrowDropDownIcon /> */}
                </div>
                <span className={classes.metricValue}>
                  {numberWithCommas(revenueByYear)}&nbsp;
                </span>
              </div>
              <div className={classes.dashboardCard}>
                <div className={classes.metricLabel}>
                  <span className={classes.dashboardCardTitle}>
                    Đơn hàng hoàn thành (Web)
                  </span>
                  {/* <ArrowDropDownIcon /> */}
                </div>
                <span className={classes.metricValue}>
                  {numberWithCommas(data?.totalCompleteOrder ?? 0)}
                </span>
              </div>
              <div className={classes.dashboardCard}>
                <div className={classes.metricLabel}>
                  <span className={classes.dashboardCardTitle}>
                    Đơn hàng hoàn thành (POS)
                  </span>
                  {/* <ArrowDropDownIcon /> */}
                </div>
                <span className={classes.metricValue}>
                  {numberWithCommas(data?.totalCompleteOrderPos ?? 0)}
                </span>
              </div>
            </div>
            <Chart revenueData={data} />
          </div>
        </>
      )}
    </div>
  );
}

export default ReportField;
