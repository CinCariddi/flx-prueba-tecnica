export function validate(user, errors) {
    const newErrors = { ...errors };
    if (!user.username || user.username === '') {
        newErrors.username = 'Usuario requerido';
    } else {
        newErrors.username = '';
    }
    if (!user.name || user.name === '') {
        newErrors.name = 'Nombre requerido';
    } else {
        newErrors.name = '';
    }
    if (!user.lastname || user.lastname === '') {
        newErrors.lastname = 'Apellido requerido';
    } else {
        newErrors.lastname = '';
    }
    if (!user.email || user.email === '') {
        newErrors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
        newErrors.email = 'Email invalido';
    } else {
        newErrors.email = '';
    }
    if (!user.status || user.status === '') {
        newErrors.status = 'Estado requerido';
    } else {
        newErrors.status = '';
    }
    if (!user.age || user.age <= 18 || user.age === 0) {
        newErrors.age = 'Edad debe ser mayor a 18';
    } else {
        newErrors.age = '';
    }
    return newErrors;
}