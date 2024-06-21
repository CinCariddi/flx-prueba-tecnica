const stateInicial = {
    users: [],
    allUsers: [],
    user: [],
    searchError: ''
}

function rootReducer (state = stateInicial, action) {
    switch(action.type) {
        case 'GET_USERS' :
            return {
                ...state,
                users: action.payload,
                allUsers: action.payload,
            }
        case 'GET_BY_NAME':
            if (typeof action.payload === 'string') {
                return {
                    ...state,
                    users: [],
                    searchError: action.payload
                };
            } else {
                return {
                    ...state,
                    users: action.payload,
                    searchError: ''
                };
            }
        case 'FILTER_BY_STATUS':
            const filteredUsers = action.payload === "All"
                ? state.allUsers
                : state.allUsers.filter(user => user.status === action.payload);
            return {
                ...state,
                users : filteredUsers,
            };
        case 'GET_USER_BY_ID':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATE_USER':
            return {
                ...state,
                allUsers: state.users.map(user => user.id === action.payload.id ? action.payload : user)
            };
        case 'DELETE_USER':
            return {
                ...state,
                allUsers: state.users.filter(user => user.id !== action.payload)
            };
        case 'CLEAN_USERS':
            return {
                ...state,
                users: state.allUsers,
            }
        default:
            return state
    }
}

export default rootReducer