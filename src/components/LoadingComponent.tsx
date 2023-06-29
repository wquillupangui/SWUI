import React from 'react';
import { CircularProgress } from '@mui/material';

const LoadingComponent: React.FC = () => {
    return (
        <div data-testid="Loading" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <CircularProgress />
        </div>
    );
};

export default LoadingComponent;
