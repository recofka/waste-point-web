import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg'
import './styles.css'


const Header = () => {
    return (
        <header>
            <Link to="/" className="logo-link">
                <img src={logo} alt="Logo" />
            </Link>
            <Link to="/" className="back-to-home">
                <FiArrowLeft />
                    Back to Home
                </Link>
        </header>

    )
}

export default Header; 
