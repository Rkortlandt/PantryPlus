import React from 'react';
import { isLoggedInAsCoordinator } from '../contexts/pocketbase';

const FamilyDashboard = () => {
  if (isLoggedInAsCoordinator()) {
    return <></>;
  } else {
    return <></>;
  }
};

export default FamilyDashboard;
