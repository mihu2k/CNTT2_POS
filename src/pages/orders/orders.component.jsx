import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { emphasize, styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useStyles } from './orders.style';

// import { numberWithCommas } from '../../common/utils';
// pages
import OrdersTable from '../../components/orders-table';
import OrdersTablePos from '../../components/orders-table-pos';
import SideBar from '../../components/side-bar';

export default function Orders() {
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

  // tab
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [orderTable, setOrderTable] = React.useState(0);

  const handleChangeOrderTable = (event, newValue) => {
    setOrderTable(newValue);
  };

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
            {/* <Button variant="outlined">Nhập xuất Excel</Button> */}
            <TextField
              type="date"
              defaultValue={defaultValue}
              id="outlined-basic"
              variant="outlined"
            />
          </Stack>
        </div>

        <div className={classes.container}>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={orderTable} onChange={handleChangeOrderTable}>
                <Tab label="Website" {...a11yProps(0)} />
                <Tab label="POS" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={orderTable} index={0}>
              <OrdersTable />
            </TabPanel>
            <TabPanel value={orderTable} index={1}>
              <OrdersTablePos />
            </TabPanel>
          </Box>
        </div>
      </div>
    </SideBar>
  );
}
