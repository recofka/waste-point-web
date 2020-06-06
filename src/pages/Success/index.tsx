import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import logo from '../../assets/logo.svg';
import './styles.css';

const SuccessCreatePoint = () => {
    return (
        <div id="page-create-point-success">
            <header >
                <img src={logo} alt="Logo" />
                <Link to="/">
                    <FiArrowLeft />
                    Back to Home
                </Link>
            </header>
            <div className="success">
                <FiCheckCircle className="icon" />
                <h1>Success!</h1>
            </div>
        </div>
    );
};

export default SuccessCreatePoint;
