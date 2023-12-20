import React, { useEffect } from 'react';
import Pagination from '../components/Pagination';

const Dashboard = ({ searchParams }: { searchParams: { page: string } }) => {
  return (
    <div>
      <Pagination
        currentPage={parseInt(searchParams.page)}
        itemCount={100}
        pageSize={10}
      />
    </div>
  );
};

export default Dashboard;
