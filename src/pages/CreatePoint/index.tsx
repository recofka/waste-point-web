import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import logo from '../../assets/logo.svg';
import api from '../../services/api';

import './styles.css';


const CreatePoint = () => {
    useEffect(() => {
        api.get('items').then(response => {
         
          console.log(response.data)
        })
      }, [])


    return (
        <div id="page-create-point">
            <header >
                <img src={logo} alt="Logo" />
                <Link to="/">
                    <FiArrowLeft />
                    Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br /> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>
                </fieldset>

                <div className="field">
                    <label htmlFor="name">Nome da entidade</label>
                    <input type="text" name="name" id="name" />
                </div>

                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" />
                </div>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>
                </fieldset>

                <Map center={[52.372467, 4.963344]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[52.372467, 4.963344]} />
                </Map>

                <div className="fiel-group">
                    <div className="field">
                        <label htmlFor="city">Cidade</label>
                        <select name="city" id="city">
                            <option value="0">Selecione uma cidade</option>
                        </select>
                    </div>
                </div>

                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>
                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>

                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>

                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>

                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>

                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>

                        <li>
                            <img src="http://localhost:3333/uploads/lamp.svg" alt="" />
                            <span>Lamp</span>
                        </li>
                    </ul>
                </fieldset>
                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    )
}

export default CreatePoint;