import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import './styles.css';

const SuccessCreatePoint = () => {
    return (
        <div id="page-create-point-success">
        <header >
            <Link to="/">
                <FiArrowLeft />
                Back to Home
            </Link>
        </header>
        <div>
            <FiCheckCircle />
            <h1>Success!</h1>
        </div>
        </div>
    );
};

export default SuccessCreatePoint;
