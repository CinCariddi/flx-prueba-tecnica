import { Input } from "antd";
import "./Label.css"

export default function Label({title, placeholder, name, value, functionOnChange, errorUser}) {
    return (
        <label className="user-label">
            {title}
            <Input placeholder={placeholder} name={name} value={value} onChange={functionOnChange}/>
            {errorUser && <span className="error">{errorUser}</span>}
        </label>
    )
}