import { useState, useEffect } from 'react';
import { validate } from '../../Utils/Validation';
import { Button } from 'antd';
import swal from 'sweetalert';
import './UserForm.css'
import Label from './Label';

export default function UserForm ({ initialUser, onSubmit, title }) {
    const [user, setUser] = useState(initialUser);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setUser(initialUser);
    }, [initialUser]);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
        setErrors(validate({ ...user, [e.target.name]: e.target.value }, errors));
    };

    const handleSelect = (e) => {
        setUser({
            ...user,
            status: e.target.value,
        });
        setErrors(validate({ ...user, status: e.target.value }, errors));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(user, errors));
        if (!Object.values(errors).some(error => error !== '') && user !== initialUser) {
            onSubmit(user);
        } else {
            swal({
                title: 'Formulario incompleto o con errores',
                icon: 'warning',
                button: 'Ok.',
            });
        }
    };

    return (
        <div className="form-user">
            <form onSubmit={handleSubmit}>
                <div className="form-user-container">
                    <div className="form-user-columns">
                        <Label title={"Usuario"} placeholder={"johndoe"} name={"username"} value={user.username} functionOnChange={handleChange} errorUser={errors.username} />
                        <Label title={"Nombre"} placeholder={"John"} name={"name"} value={user.name} functionOnChange={handleChange} errorUser={errors.name} />
                        <label>
                            Estado
                            <select name="status" value={user.status} onChange={handleSelect}>
                                <option value="">Seleccione un estado</option>
                                <option value="active">Activo</option>
                                <option value="inactive">Inactivo</option>
                            </select>
                            {errors.status && <span className="error">{errors.status}</span>}
                        </label>
                    </div>
                    <div className="form-user-columns">
                        <Label title={"Email"} placeholder={"johndoe@domain.com"} name={"email"} value={user.email} functionOnChange={handleChange} errorUser={errors.email} />
                        <Label title={"Apellido"} placeholder={"Doe"} name={"lastname"} value={user.lastname} functionOnChange={handleChange} errorUser={errors.lastname} />
                        <Label title={"Edad"} placeholder={"43"} name={"age"} value={user.age} functionOnChange={handleChange} errorUser={errors.age} />
                    </div>
                </div>
                <div className="form-user-btn-container">
                    <Button type="primary" shape='default' size='large' onSubmit={handleSubmit}>{title}</Button>
                </div>
            </form>
        </div>
    );
};