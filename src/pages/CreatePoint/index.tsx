import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const neighborhood = ['Zeeburgereiland', 'Ijburg', 'Zeeburg'];
    // neighborhood = nbhd
    const [selectedNbhd, setSelectedNbhd] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0,0]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    function handleSelectNbhd(event: ChangeEvent<HTMLSelectElement>) {
        const neighborhood = event.target.value;
        setSelectedNbhd(neighborhood);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    return (
        <div id="page-create-point">
            <header >
                <img src={logo} alt="Logo" />
                <Link to="/">
                    <FiArrowLeft />
                    Back to Home
                </Link>
            </header>

            <form>
                <h1>Register a <br /> collection point</h1>

                <fieldset>
                    <legend>
                        <h2>Data</h2>
                    </legend>
                </fieldset>

                <div className="field">
                    <label htmlFor="name">Point name</label>
                    <input type="text" name="name" id="name" />
                </div>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" />
                </div>

                <fieldset>
                    <legend>
                        <h2>Address</h2>
                        <span>Select the address on the map</span>
                    </legend>
                </fieldset>

                <Map center={[52.372467, 4.963344]} zoom={15} onClick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={selectedPosition} />
                </Map>

                <div className="fiel-group">
                    <div className="field">
                        <label htmlFor="city">Neighborhood</label>
                        <select
                            name="city"
                            id="city"
                            onChange={handleSelectNbhd}
                            value={selectedNbhd}>

                            <option value="0">Select an Neighborhood</option>
                            {neighborhood.map(name => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <fieldset>
                    <legend>
                        <h2>Collection items</h2>
                        <span>Select one or more items below</span>
                    </legend>
                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>
                <button type="submit">
                    Register collection point
                </button>
            </form>
        </div>
    )
}

export default CreatePoint;