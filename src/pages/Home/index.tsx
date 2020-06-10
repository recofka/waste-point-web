import React from 'react';
import Header from '../../components/Header';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './styles.css'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <Header />
                <main>
                    <h1>Your waste collection marketplace.</h1>
                    <p>We help people find collection waste points efficiently.</p>

                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Register a collection point</strong>
                    </Link>
                </main>
            </div>
        </div>
    )
}

export default Home; 