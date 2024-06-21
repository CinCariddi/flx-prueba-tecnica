import axios from 'axios'

const GET_USERS = 'GET_USERS'
const GET_BY_NAME = 'GET_BY_NAME'
const FILTER_BY_STATUS = 'FILTER_BY_STATUS'
const CLEAN_USERS = 'CLEAN_USERS'
const POST_USER = 'POST_USER'
const GET_USER_BY_ID = 'GET_USER_BY_ID'
const UPDATE_USER = 'UPDATE_USER'
const DELETE_USER = 'DELETE_USER'


export function getUsers(limit, start){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:4000/users?_limit=${limit}&_start=${start}`)
            setTimeout(() => {
                return dispatch({
                    type: GET_USERS,
                    payload: response.data
                })
            }, 2000);
        }catch(error) {
            console.log(error)
        }
    }
}

export function getUserByName(name) {
    return async function(dispatch){
        try {
            const response = await axios.get('http://localhost:4000/users');
            const users = response.data;
            const filteredUsers = users.filter(user =>
                user.name.toLowerCase().includes(name.toLowerCase()) ||
                user.lastname.toLowerCase().includes(name.toLowerCase())
            );
            setTimeout(() => {
                if (filteredUsers.length > 0) {
                    dispatch({
                        type: GET_BY_NAME,
                        payload: filteredUsers
                    });
                } else {
                    dispatch({
                        type: GET_BY_NAME,
                        payload: "Usuario no existente"
                    });
                }
            }, 2000);
        } catch (error) {
            console.log(error);
        }
    }
}

export function filterByStatus(payload) {
    return {
        type: FILTER_BY_STATUS,
        payload
    };
}

export function clearUsers(){
    return {
        type: CLEAN_USERS
    }
}

export function postUser(user) {
    return async function(dispatch) {
        try {
            const response = await axios.post('http://localhost:4000/users', user);
            dispatch({
                type: POST_USER,
                payload: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export function getUserById(id){
    return async function(dispatch){
        try {
            const response = await axios.get(`http://localhost:4000/users/${id}`)
            dispatch({
                type: GET_USER_BY_ID,
                payload: response.data
            })
        } catch (error) {
            console.error(error);
        }
    }
}

export function updateUser(id, user) {
    return async function(dispatch) {
        try {
            const response = await axios.put(`http://localhost:4000/users/${id}`, user);
            dispatch({
                type: UPDATE_USER,
                payload: response.data
            });
        } catch (error) {
            console.error(error);
        }
    };
}

export function deleteUser(id) {
    return async function(dispatch) {
        try {
            await axios.delete(`http://localhost:4000/users/${id}`);
            dispatch({
                type: DELETE_USER,
                payload: id
            });
        } catch (error) {
            console.error(error);
        }
    };
}