import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  BrowserRouter as Router,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import { useStyles } from './user.style';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import routes from '../../router/list.route';
import {
  checkTokenRequest,
  logoutRequest,
} from '../../redux/actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';

function User() {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const { auth: authSelector } = useSelector((state) => state);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logoutRequest());
    navigate(routes.login);
  };

  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(
        checkTokenRequest(
          localStorage.getItem('token'),
          navigate,
          routes.dashboard,
        ),
      );
    }
  }, []);

  return (
    <div className={classes.userBtn}>
      <div
        className={classes.userWrap}
        id="basic-button"
        aria-hidden={false}
        onClick={handleClick}
      >
        <AccountCircleIcon />
        <span>{authSelector.profile?.full_name}</span>
      </div>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <Link to="#">
          <MenuItem onClick={handleClose}>Thiết lập tài khoản</MenuItem>
        </Link>
        <Link to={routes.dashboard}>
          <MenuItem>Quản lý</MenuItem>
        </Link>

        <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}

export default User;
