import { useState } from "react";
import { useDispatch } from "react-redux"
import { postUser } from "../../Redux/Actions/index"
import { Button } from 'antd';
import Modal from "../Common/Modal";
import UserForm from "../Common/UserForm";
import swal from "sweetalert";

export default function CreateUser() {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (newUser) => {
        dispatch(postUser(newUser));
        swal({
            title: 'Usuario agregado',
            icon: "success",
            button: 'Ok.',
        });
        closeModal();
        window.location.reload()
    };

    return (
        <div>
            <Button type="primary" shape='default' size='large' onClick={openModal}>Agregar usuario</Button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Agregar usuario">
                <UserForm
                    initialUser={{ username: '', name: '', lastname: '', email: '', status: '', age: 0 }}
                    onSubmit={handleSubmit}
                    title="Agregar usuario"
                />
            </Modal>
        </div>
    );
}