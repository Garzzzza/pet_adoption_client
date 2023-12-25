import '../Modal.css';
import { useNavigate } from 'react-router-dom';

function Modal({ children, onClose }) {
    const navigate = useNavigate();

    const handleNavigation = () => {
        onClose();
        navigate('/');  // Change this to your desired route
    }

    return (
        <div className="modalWrapper">
            <div className="modalContent">
                <button onClick={handleNavigation}>HomePage</button>
                {children}
            </div>
        </div>
    );
}

export default Modal