import { useState } from "react";
import { useDispatch } from "react-redux"
import { deleteUser } from "../../Redux/Actions"
import { Button } from 'antd';
import swal from "sweetalert";
import Modal from "../Common/Modal";
import "./DeleteUser.css"

export default function DeleteUser ({ id, username }) {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    function handleDelete() {
        dispatch(deleteUser(id))
        swal({
            title: 'Usuario eliminado',
            icon: 'warning',
            button: 'Ok.',
        });
        closeModal();
        window.location.reload()
    }

    return (
        <div>
            <button onClick={openModal} className="delete-user">Eliminar</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Eliminar usuario">
                {
                    <div>
                        <div className="delete-user-body">
                            ¿Está seguro que quiere eliminar el usuario 
                            <p>@{username}</p>
                            ?
                        </div>
                        <div className="delete-user-btn-container">
                            <Button onClick={closeModal}>Cancelar</Button>
                            <Button type="primary" danger onClick={handleDelete}>Eliminar</Button>
                        </div>
                    </div>
                }
            </Modal>
        </div>
    )
}