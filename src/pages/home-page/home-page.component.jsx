import DashBoard from '../../components/dash-board';
import { useStyles } from './home-page.style';

function HomePage() {
  const classes = useStyles();

  return (
    <div>
      <DashBoard />
    </div>
  );
}

export default HomePage;
