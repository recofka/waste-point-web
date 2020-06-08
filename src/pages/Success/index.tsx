import React from 'react';
import Header from '../../components/Header';
import { FiCheckCircle } from 'react-icons/fi';

import './styles.css';

const SuccessCreatePoint = () => {
    return (
        <div id="page-create-point-success">
            <Header />

            <div className="success">
                <FiCheckCircle className="icon" />
                <h1>Success!</h1>
            </div>
        </div>
    );
};

export default SuccessCreatePoint;
