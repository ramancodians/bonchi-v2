import Layout from '@/components/Layout';
import { Route, Routes } from 'react-router-dom';
import UserHome from './User/UserHome';
import UserAppointments from './User/UserAppointments';
import UserSupport from './User/UserSupport';
import FourOFour from '../FourOFour';

const Dashboard = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/appointments" element={<UserAppointments />} />
        <Route path="/support" element={<UserSupport />} />
        <Route path="*" element={<FourOFour />} />
      </Routes>
    </Layout>
  );
};

export default Dashboard;
