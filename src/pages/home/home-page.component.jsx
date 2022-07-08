import { useStyles } from './home-page.style';

import DashBoard from '../../components/dashboard-body';
import SideBar from '../../components/side-bar';
function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <SideBar>
        <DashBoard></DashBoard>
      </SideBar>
    </div>
  );
}

export default HomePage;
