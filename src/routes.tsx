import React from 'react';
import { Route, BrowserRouter} from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';
import SuccessCreatePoint from './pages/Success';

const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path={"/"}  exact/>
            <Route component={CreatePoint} path={"/create-point"} />
            <Route component={SuccessCreatePoint} path={"/create-point-sucess"} />
        </BrowserRouter>
    )
}

export default Routes;