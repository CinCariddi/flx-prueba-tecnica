import "./Modal.css"
import { CloseOutlined } from "@ant-design/icons"

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal-container">
                <div className="modal-head">
                    {title}
                </div>
                <button className="modal-btn" onClick={onClose}>
                    <CloseOutlined />
                </button>
                {children}
            </div>
        </div>
    );
};