import Card from '../../ui/dashboard/card/card';
import Chart from '../../ui/dashboard/chart/chart';
import styles from '../../ui/dashboard/dashboard.module.css';
import Rightbar from '../../ui/dashboard/rightbar/rightbar';
import Transactions from '../../ui/dashboard/transactions/transactions';

const Dashboard = () => {
  return (
    <div className=" gap-1 p-1 flex">
      <div className="flex-3 ">
        <div className="flex py-1 gap-4 justify-between">
          <Card />
          <Card />
          <Card />
        </div>
        <Transactions />
        <Chart />
      </div>
      <div className="flex-1">
        <Rightbar />
      </div>
    </div>
  );
};

export default Dashboard;
