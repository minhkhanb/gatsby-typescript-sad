import React from 'react';
import DataListProvider from '@src/components/DataListProvider';
import VehicleList from '@src/components/List/VehicleList';

const Dashboard: React.FunctionComponent = () => {
  return (
    <div>
      <DataListProvider>
        <VehicleList />
      </DataListProvider>
    </div>
  );
};

export default Dashboard;
