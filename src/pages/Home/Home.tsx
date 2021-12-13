import './Home.scss';
import { Typography } from '@mui/material';
import TreeChart from '../../components/TreeChart/TreeChart';

const Home = () => {
  return (
    <div className="home">
      <div className="overview">
        <Typography variant="h3">
          Dashboard
        </Typography>

        <Typography variant="h5">
          Check how many trees were planted on each day!
        </Typography>

        <div className="gradient"/>
      </div>

      <TreeChart/>
    </div>
  );
};

export default Home
