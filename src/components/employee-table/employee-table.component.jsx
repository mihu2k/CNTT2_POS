import { FormControlLabel } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import EditIcon from '@mui/icons-material/Edit';
import { Chip } from '@mui/material';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDateTime } from '../../common/utils';
import { getEmployeesRequest } from '../../redux/actions/user.action';
import { EmployeeForm } from '../employee';
import { useStyles } from './employee-table.style';

function EmployeeTable() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [addEmployee, setAddEmployee] = React.useState(false);
  const [dataUser, setDataUser] = React.useState(null);

  const [query, setQuery] = React.useState({
    page: 1,
    per_page: 5,
  });

  const { user: userSelector } = useSelector((state) => state);

  const usersColumns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'username',
      headerName: 'Tên đăng nhập',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
    },
    {
      field: 'full_name',
      headerName: 'Tên nhân viên',
      flex: 1,
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      flex: 1,
      valueFormatter: ({ value }) =>
        value === 'employee'
          ? 'Nhân viên'
          : value === 'admin'
          ? 'Quản trị viên'
          : 'Khách hàng',
    },
    {
      field: 'created_at',
      headerName: 'Thời gian tạo',
      flex: 1,
      valueFormatter: ({ value }) => formatDateTime(value),
    },
    {
      field: 'isActive',
      headerName: 'Trạng thái',
      flex: 1,
      renderCell: (params) =>
        params?.row?.isActive ? (
          <Chip label="Active" color="success" style={{ minWidth: '80px' }} />
        ) : (
          <Chip label="InActive" color="error" style={{ minWidth: '80px' }} />
        ),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      sortable: false,
      width: 120,
      disableClickEventBubbling: true,
      align: 'center',
      renderCell: (params) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <EmployeeAction data={params.row} />
          </div>
        );
      },
    },
  ];

  const handleCloseForm = () => {
    setAddEmployee(false);
    fetchEmployee(query);
  };

  const EmployeeAction = ({ data }) => {
    const handleEditClick = () => {
      setDataUser(data);
      setAddEmployee(true);
    };
    const handleDeleteClick = () => {};

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

        {/* <FormControlLabel
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
        /> */}
      </div>
    );
  };

  const fetchEmployee = (query = {}) => {
    dispatch(getEmployeesRequest(query));
  };

  React.useEffect(() => {
    fetchEmployee(query);
  }, [query]);

  return (
    <div className={classes.content}>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end', margin: '20px' }}
      >
        {!addEmployee ? (
          <Button
            variant="contained"
            onClick={() => {
              setDataUser(null);
              setAddEmployee(true);
            }}
          >
            Thêm nhân viên
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => {
              setDataUser(null);
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
            rows={userSelector.users?.map((item, index) => ({
              ...item,
              id: index + 1 + query.per_page * (query.page - 1),
            }))}
            columns={usersColumns}
            pageSize={query.per_page}
            rowsPerPageOptions={[5, 10]}
            onPageChange={(newPage) =>
              setQuery((prev) => ({ ...prev, page: Number(newPage) + 1 }))
            }
            onPageSizeChange={(newPage) =>
              setQuery((prev) => ({ ...prev, per_page: newPage }))
            }
            rowCount={userSelector.totalRecord}
            pagination
            paginationMode="server"
            page={query?.page - 1}
          />
        ) : (
          <EmployeeForm onCloseForm={handleCloseForm} data={dataUser} />
        )}
      </div>
    </div>
  );
}

export default EmployeeTable;
