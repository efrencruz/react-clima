import React, { useState } from 'react';
import Error from './Error';
import PropTypes from 'prop-types';

const Formulario = ({ busqueda, guardarbusqueda, guardarConsulta }) => {
    const [error, guardarError] = useState(false);

    const { ciudad, pais } = busqueda;

    const handleChange = e => {
        guardarbusqueda({ ...busqueda, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();

        if (ciudad === '' || pais === '') {
            guardarError(true);
            return;
        }

        guardarError(false);

        guardarConsulta(true);
    };

    return (
        <form onSubmit={handleSubmit}>
            {error ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <div className="input-field col s12">
                <input type="text" name="ciudad" id="ciudad" value={ciudad} onChange={handleChange} />
                <label htmlFor="ciudad">Ciudad</label>
            </div>
            <div className="input-field col s12">
                <select name="pais" id="pais" value={pais} onChange={handleChange}>
                    <option value="">- Selecciona un país -</option>
                    <option value="US">Estados Unidos</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País</label>
            </div>
            <div className="input-filed col s12">
                <input
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                    type="submit"
                    value="Buscar clima"
                />
            </div>
        </form>
    );
};

Formulario.propTypes = {
    busqueda: PropTypes.object.isRequired,
    guardarbusqueda: PropTypes.func.isRequired,
    guardarConsulta: PropTypes.func.isRequired
};

export default Formulario;
