import { useDispatch } from "react-redux";
import { filterByStatus } from "../../Redux/Actions";
import "./FilterUser.css"


export default function FilterByStatus({setActualPage}) {
    const dispatch = useDispatch()

    function handleFilterByStatus(e) {
        dispatch(filterByStatus(e.target.value));
        setActualPage(1)
    }

    return (
        <div className="filter-users">
            <select onChange={(e) => handleFilterByStatus(e)}>
                <option defaultChecked value='All' id="filter-value">Filtrar por estado</option>
                <option value="active"> Activos </option>
                <option value="inactive"> Inactivos </option>
            </select>
        </div>
    )
}