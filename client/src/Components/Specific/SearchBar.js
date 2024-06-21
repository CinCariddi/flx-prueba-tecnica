import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserByName } from "../../Redux/Actions";
import { SearchOutlined } from '@ant-design/icons';
import lens from "../../Icon.png"
import "./SearchBar.css"

export default function SearchBar({setIsloading}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("");
    const users = useSelector(state => state.users)

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        try {
            setIsloading(true)
            dispatch(getUserByName(name))
        } catch (err) {
            throw new Error(err);
        }
    }

    useEffect(() => {
        if(users.length > 0) {
            setIsloading(false)
        }
    }, [JSON.stringify(users)])


    return (
        <div className="search-bar-container" style={{height: "70%"}}>
            <div className="search-bar-input">
                <input
                    type="text"
                    placeholder="Buscar usuarios"
                    onChange={e => handleInputChange(e)}
                    onKeyDownCapture={(e) => e.key === "Enter" && handleSubmit(e)}
                />
            </div>
                <button type="submit" onClick={(e) => handleSubmit(e)} className="search-bar-btn" style={{backgroundColor: "rgba(255, 255, 255, 1)"}}>
                    <SearchOutlined />
                </button>
        </div>
    );
}