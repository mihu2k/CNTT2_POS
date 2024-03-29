import { useStyles } from './employee.style';
import * as React from 'react';
import { emphasize, styled } from '@mui/material/styles';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Chip from '@mui/material/Chip';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// pages
import SideBar from '../../components/side-bar';
import EmployeeTable from '../../components/employee-table';
import routes from '../../router/list.route';

function Employee() {
  const classes = useStyles();
  const navigate = useNavigate();
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

  const { auth: authSelector } = useSelector((state) => state);

  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  React.useEffect(() => {
    if (authSelector.profile?.role === 'employee') navigate(routes.dashboard);
  }, [authSelector]);

  return (
    <SideBar>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              label="Nhân viên"
              deleteIcon={<ExpandMoreIcon />}
              onDelete={handleClick}
            />
          </Breadcrumbs>
        </div>

        <div className={classes.container}>
          <EmployeeTable />
        </div>
      </div>
    </SideBar>
  );
}

export default Employee;
