import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { FormControlLabel } from '@material-ui/core';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue, red } from '@material-ui/core/colors';
import { useStyles } from './employee-table.style';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function EmployeeTable() {
  const classes = useStyles();
  const [employee, setEmployee] = React.useState([]);
  const [addEmployee, setAddEmployee] = React.useState(false);
  const [role, setRole] = React.useState('');

  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };

  // employee columns

  const ordersColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'userName',
      headerName: 'Tên đăng nhập',
      width: 160,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 260,
      align: 'left',
    },
    {
      field: 'fullName',
      headerName: 'Tên nhân viên',
      align: 'left',
      width: 180,
    },

    {
      field: 'role',
      headerName: 'Vai trò',
      width: 120,
      align: 'left',
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      align: 'right',
      renderCell: (params) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <EmployeeAction data={params.row} />
          </div>
        );
      },
    },
  ];
  const EmployeeAction = ({ data }) => {
    const handleEditClick = () => {
      // some action
      console.log(data);
    };
    const handleDeleteClick = () => {
      // some action
      console.log(data);
    };

    return (
      <div>
        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              style={{ color: blue[500] }}
              size="small"
              onClick={handleEditClick}
            >
              <EditIcon />
            </IconButton>
          }
        />

        <FormControlLabel
          control={
            <IconButton
              color="secondary"
              style={{ color: red[500] }}
              size="small"
              onClick={handleDeleteClick}
            >
              <DeleteIcon />
            </IconButton>
          }
        />
      </div>
    );
  };
  // fetch data from JSON server
  React.useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const result = await axios.get('employee');
    setEmployee(await result.data);
  };
  return (
    <div className={classes.content}>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}
      >
        {!addEmployee ? (
          <Button
            variant="contained"
            onClick={() => {
              setAddEmployee(true);
            }}
          >
            Thêm nhân viên
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setAddEmployee(false);
            }}
          >
            Trở về
          </Button>
        )}
      </div>

      <div style={{ height: 400, width: '100%' }}>
        {!addEmployee ? (
          <DataGrid
            rows={employee}
            columns={ordersColumns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        ) : (
          <Grid item xs={12} className={classes.invoiceWrapper}>
            <form autoComplete="off" method="post">
              <div className={classes.content}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Tên Nhân viên"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Địa chỉ email"
                      variant="outlined"
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      type="number"
                      fullWidth
                      label="Số điện thoại"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="select-role-label">Chức vụ</InputLabel>
                      <Select
                        labelId="select-role-label"
                        id="select-role"
                        value={role}
                        label="Chức vụ"
                        onChange={handleChangeRole}
                      >
                        <MenuItem value={10}>Nhân viên</MenuItem>
                        <MenuItem value={20}>Quản lý</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Địa chỉ"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Tên đăng nhập"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Mật khẩu"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Xác nhận mật khẩu"
                      type="password"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} mt={2} className={classes.actionBtns}>
                    <Button variant="contained">Tạo nhân viên mới</Button>
                  </Grid>
                </Grid>
              </div>
            </form>
          </Grid>
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;
