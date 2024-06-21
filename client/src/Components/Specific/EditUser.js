import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, getUserById } from '../../Redux/Actions/index';
import Modal from '../Common/Modal';
import UserForm from '../Common/UserForm';
import swal from 'sweetalert';

export default function EditUser({ userId }) {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector(state => state.users.find(user => user.id === userId));

    useEffect(() => {
        if (userId) {
            dispatch(getUserById(userId));
        }
    }, [dispatch, userId]);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = (updatedUser) => {
        dispatch(updateUser(userId, updatedUser));
        swal({
            title: 'Usuario actualizado',
            icon: 'success',
            button: 'Ok.',
        });
        closeModal();
        window.location.reload()
    };

    return (
        <div className="edit-user">
            <button onClick={openModal} style={{border: "none", background: "rgba(255, 255, 255, 1)", color: "rgba(24, 144, 255, 1)"}}>Editar</button>
            <Modal isOpen={isModalOpen} onClose={closeModal} title="Editar usuario">
                {user && (
                    <UserForm
                        initialUser={user}
                        onSubmit={handleSubmit}
                        title="Editar usuario"
                    />
                )}
            </Modal>
        </div>
    );
}