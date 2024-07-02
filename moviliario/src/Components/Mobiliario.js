import React, { useEffect, useState } from 'react';
import API_BASE_URL from './config'

export default function Mobiliario(props) {

    const { mobiliarios, setMobiliarios } = props;
    const [codigo, setCodigo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [editingId, setEditingId] = useState(null);

    const resetMobiliarios = () => {
        setMobiliarios(null)
    }

    useEffect(() => {
        // Función para obtener todos los mobiliarios al cargar el componente
        fetch(`${API_BASE_URL}/listadoMobiliario`)
            .then(response => response.json())
            .then(data => setMobiliarios(data))
            .catch(error => console.error('Error al listar mobiliarios:', error));
    }, [setMobiliarios]);

    const handleCreate = () => {
        const newMobiliario = { codigo, descripcion };

        fetch(`${API_BASE_URL }/save`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMobiliario)
        })
        .then(response => response.json())
        .then(createdMobiliario => {
            setMobiliarios([...mobiliarios, createdMobiliario]);
            setCodigo('');
            setDescripcion('');
        })
        .catch(error => console.error('Error al crear mobiliario:', error));
    };

    const handleDelete = (id) => {
        fetch(`${API_BASE_URL}/delete/${id}`, {
            method: 'DELETE'
        })
        .then(() => {
            setMobiliarios(mobiliarios.filter(mobiliario => mobiliario.id !== id));
        })
        .catch(error => console.error('Error deleting mobiliario:', error));
    };

    const handleUpdate = () => {
        const updatedMobiliario = { codigo, descripcion };

        fetch(`${API_BASE_URL}/update/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedMobiliario)
        })
        .then(response => response.json())
        .then(updatedMobiliario => {
            setMobiliarios(mobiliarios.map(mobiliario => (mobiliario.id === editingId ? updatedMobiliario : mobiliario)));
            setCodigo('');
            setDescripcion('');
            setEditingId(null);
        })
        .catch(error => console.error('Error updating mobiliario:', error));
    };

    const startEdit = (mobiliario) => {
        setCodigo(mobiliario.codigo);
        setDescripcion(mobiliario.descripcion);
        setEditingId(mobiliario.id);
    };

    return (
        <div>
            <h1>Listado de Mobiliario</h1>
            <br />
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Crear Mobiliario</button>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Código</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mobiliarios.map((mobiliario, index) => (
                        <tr key={mobiliario.id}>
                            <td>{mobiliario.id}</td>
                            <td>{mobiliario.codigo}</td>
                            <td>{mobiliario.descripcion}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => startEdit(mobiliario)} data-bs-toggle="modal" data-bs-target="#exampleModal">Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(mobiliario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <span className="btn btn-link" onClick={resetMobiliarios}>Volver a Home</span>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{editingId ? 'Editar Mobiliario' : 'Nuevo Mobiliario'}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="codigo" className="col-form-label">Código:</label>
                                    <input type="text" className="form-control" id="codigo" value={codigo} onChange={(e) => setCodigo(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="descripcion" className="col-form-label">Descripción:</label>
                                    <input type="text" className="form-control" id="descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                            <button type="button" className="btn btn-primary" onClick={editingId ? handleUpdate : handleCreate}>{editingId ? 'Actualizar' : 'Guardar'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
