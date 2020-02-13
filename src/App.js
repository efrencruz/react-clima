import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

function App() {
    const [busqueda, guardarbusqueda] = useState({ ciudad: '', pais: '' });
    const [consultar, guardarConsulta] = useState(false);
    const [resultado, guardarResultado] = useState({});
    const [error, guardarError] = useState(false);

    const { ciudad, pais } = busqueda;

    useEffect(() => {
        if (consultar) {
            const consultarAPI = async () => {
                const appId = '61b75cfffdb7b9b7f8fbf5a6419c74d1';
                const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
                const respuesta = await fetch(url);
                const resultado = await respuesta.json();
                guardarResultado(resultado);
            };
            consultarAPI();
            guardarConsulta(false);

            resultado.cod === '404' ? guardarError(true) : guardarError(false);
        }
        // eslint-disable-next-line
    }, [consultar]);

    const componente = error ? <Error mensaje="No hay resultados" /> : <Clima resultado={resultado} />;

    return (
        <Fragment>
            <Header titulo="Clima React App" />
            <div className="contenedor-form">
                <div className="container">
                    <div className="row">
                        <div className="col m6 s12">
                            <Formulario
                                busqueda={busqueda}
                                guardarbusqueda={guardarbusqueda}
                                guardarConsulta={guardarConsulta}
                            />
                        </div>
                        <div className="col m6 s12">{componente}</div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default App;
