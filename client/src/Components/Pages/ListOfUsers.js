import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getUsers } from "../../Redux/Actions";
import Loading from "../Common/Loading";
import Paginated from "../Specific/Paginated";
import CreateUser from "../Specific/CreateUser";
import SearchBar from "../Specific/SearchBar";
import FilterByStatus from "../Specific/FilterUser";
import EditUser from "../Specific/EditUser";
import DeleteUser from "../Specific/DeleteUser";
import "./ListOfUsers.css"

export default function ListOfUsers() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    const searchError = useSelector(state => state.searchError);
    const [isLoading, setIsloading] = useState(true)
    const [actualPage, setActualPage] = useState(1);
    const usersPerPage = 9;
    const totalUsers = 51
    const start = (actualPage - 1) * usersPerPage;

    useEffect(() => {
        dispatch(getUsers(usersPerPage, start))
        setIsloading(false)
    }, [dispatch, actualPage, start])

    useEffect(() => {
        setIsloading(true)
    }, [start])

    const page = (numPage) => {
        setActualPage(numPage);
    };

    return (
        <div className="list-users">
            <div className="list-title">
                <p className="list-title-1">Usuarios /</p>
                <p className="list-title-2">Lista de usuarios</p>
            </div>
            <div className="list-nav-bar">
                <div className="list-nav-bar-filter">
                    <SearchBar isLoading={isLoading} setIsloading={setIsloading}/>
                    <FilterByStatus setActualPage={setActualPage}/>
                </div>
                <CreateUser />
            </div>
            <table>
                <thead>
                    <tr style={{backgroundColor: "rgba(217, 217, 217, 0.08)"}}>
                        <th><div className="table-th">Usuario</div></th>
                        <th><div className="table-th">Nombre</div></th>
                        <th><div className="table-th">Apellido</div></th>
                        <th><div className="table-th">Estado</div></th>
                        <th><div className="table-th">Acciones</div></th>
                    </tr>
                </thead>
                <tbody>
                    {!isLoading 
                        ? users?.map(user => (
                            <tr key={user.id} style={{backgroundColor: "rgba(255, 255, 255, 1)"}}>
                                <td>{user.username}</td>
                                <td>{user.name}</td>
                                <td>{user.lastname}</td>
                                <td>
                                    <div className={user.status === "active" ? "user-active user-status" : "user-inactive user-status"}>{
                                        user.status === "active" ? "Activo" : "Inactivo"
                                    }</div>
                                </td>
                                <td>
                                    <div className="list-user-actions">
                                        <EditUser userId={user.id}/>
                                        <DeleteUser username={user.username} id={user.id} />
                                    </div>
                                </td>
                            </tr>
                        ))
                        :<tr><td colSpan={5}>{searchError ? searchError : <Loading />}</td></tr>
                    }
                </tbody>
            </table>
            <Paginated
                totalRecords={totalUsers}
                recordsPerPage={usersPerPage}
                page={page}
                actualPage={actualPage}
            />
        </div>
    )
}