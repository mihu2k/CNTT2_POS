import { yupResolver } from '@hookform/resolvers/yup';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  createEmployeeRequest,
  updateEmployeeRequest,
} from '../../../redux/actions/user.action';
import * as types from '../../../redux/types';
import Loading from '../../loading/loading.component';
import { useStyles } from './employee-form.style';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập.')
    .min(4, 'Tên đăng nhập phải ít nhất 4 kí tự.'),
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không đúng định dạng.'),
  full_name: yup.string().required('Vui lòng nhập họ và tên.'),
  role: yup.string().required('Vui lòng chọn role.'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu.')
    .min(6, 'Mật khẩu phải ít nhất 6 kí tự.'),
  confirmPassword: yup
    .string()
    .required('Vui lòng nhập lại mật khẩu.')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Không trùng khớp với mật khẩu.'),
    }),
});

const schemaEdit = yup.object().shape({
  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập.')
    .min(4, 'Tên đăng nhập phải ít nhất 4 kí tự.'),
  email: yup
    .string()
    .required('Vui lòng nhập email.')
    .email('Email không đúng định dạng.'),
  full_name: yup.string().required('Vui lòng nhập họ và tên.'),
  isActive: yup.boolean().required(),
  role: yup.string().required('Vui lòng chọn role.'),
});

export function EmployeeForm({ onCloseForm, data = null }) {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { user: userSelector } = useSelector((state) => state);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(!data ? schema : schemaEdit),
  });

  const onSubmit = (dataForm) => {
    if (dataForm.password) {
      dispatch(createEmployeeRequest(dataForm, onCloseForm));
      return;
    }
    dispatch(updateEmployeeRequest(data?._id, dataForm, onCloseForm));
  };

  React.useEffect(() => {
    if (data) {
      reset({
        full_name: data.full_name,
        username: data.username,
        email: data.email,
        role: data.role,
      });
    }
  }, [data]);

  return (
    <>
      {userSelector.status === types.CREATE_EMPLOYEE_REQUEST && <Loading />}
      <Grid item xs={12} className={classes.invoiceWrapper}>
        <form autoComplete="off" noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.content}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Tên Nhân viên"
                  disabled={!!data}
                  variant="outlined"
                  required
                  {...register('full_name')}
                  error={!!errors?.full_name?.message}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Địa chỉ email"
                  variant="outlined"
                  disabled={!!data}
                  required
                  {...register('email')}
                  error={!!errors?.email?.message}
                />
              </Grid>

              {/* <Grid item xs={6}>
              <TextField
                autoComplete="off"
                type="number"
                fullWidth
                label="Số điện thoại"
                variant="outlined"
              />
            </Grid> */}
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="select-role-label">Chức vụ</InputLabel>
                  <Select
                    labelId="select-role-label"
                    id="select-role"
                    required
                    label="Chức vụ"
                    defaultValue={!data ? 'employee' : data?.role}
                    {...register('role')}
                    error={!!errors?.role?.message}
                  >
                    <MenuItem value="employee">Nhân viên</MenuItem>
                    {/* <MenuItem value="admin">Quản trị viên</MenuItem> */}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={data ? 6 : 12}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Tên đăng nhập"
                  variant="outlined"
                  required
                  disabled={!!data}
                  {...register('username')}
                  error={!!errors?.username?.message}
                />
              </Grid>
              {data ? (
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="select-isActive-label">
                      Trạng thái
                    </InputLabel>
                    <Select
                      labelId="select-isActive-label"
                      id="select-isActive"
                      required
                      label="Trạng thái"
                      defaultValue={!!data?.isActive}
                      {...register('isActive')}
                      error={!!errors?.isActive?.message}
                    >
                      <MenuItem value={true}>Active</MenuItem>
                      <MenuItem value={false}>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              ) : (
                <>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Mật khẩu"
                      type="password"
                      variant="outlined"
                      required
                      {...register('password')}
                      error={!!errors?.password?.message}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      autoComplete="off"
                      fullWidth
                      label="Xác nhận mật khẩu"
                      type="password"
                      variant="outlined"
                      required
                      {...register('confirmPassword')}
                      error={!!errors?.confirmPassword?.message}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} mt={2} className={classes.actionBtns}>
                <Button variant="contained" type="submit">
                  {data ? 'Lưu' : 'Tạo'}
                </Button>
              </Grid>
            </Grid>
          </div>
        </form>
      </Grid>
    </>
  );
}
