import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
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
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    // neighborhood = nbhd
    const [selectedNbhd, setSelectedNbhd] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    const history = useHistory();

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, [])

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

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

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alredySelected = selectedItems.findIndex(item => item === id);

        if (alredySelected > 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }

    };


    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, email } = formData;
        const neighborhood = selectedNbhd;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('neighborhood', neighborhood);
        data.append('items', items.join(','));

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        await api.post('points', data);
        history.push('/create-point-sucess');
    };


    return (
        <div id="page-create-point">
            <div className="content">
                <Header />
                <form onSubmit={handleSubmit}>
                    <h1>Register a <br /> collection point</h1>

                    <Dropzone onFileUploaded={setSelectedFile} />

                    <fieldset>
                        <legend>
                            <h2>Data</h2>
                        </legend>
                    </fieldset>

                    <div className="field">
                        <label htmlFor="name">Point name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleInputChange}
                        />
                    </div>

                    <fieldset>
                        <legend>
                            <h2>Address</h2>
                            <span>Select the address on the map</span>
                        </legend>
                    </fieldset>



                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="fiel-group">
                        <div className="field">
                            <label htmlFor="neighborhood">Neighborhood</label>
                            <select
                                name="neighborhood"
                                id="neighborhood"
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
                                <li
                                    key={item.id}
                                    onClick={() => handleSelectItem(item.id)}
                                    className={selectedItems.includes(item.id) ? 'selected' : 'non-selected'}
                                >
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
        </div>
    )
}

export default CreatePoint;