import { useEffect } from "react";

interface AlertMessageProps {
    message: string;
    type?: 'success' | 'danger' | 'warning' | 'info';
    onClose: () => void;
    autoCloseAfterMs?: number;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
    message,
    type = 'info',
    onClose,
    autoCloseAfterMs = 5000
}) => {
    useEffect(() => {
        if (message && autoCloseAfterMs > 0) {
            const timer = setTimeout(onClose, autoCloseAfterMs);
            return () => clearTimeout(timer);
        }
    }, [message, autoCloseAfterMs, onClose]);

    if (!message) return null;

    return (
        <div className={`alert alert-${type} container d-flex justify-content-between align-items-center mt-3`}>
            <div className="flex-grow-1 text-center">{message}</div>
            <button type="button" className="btn-close ms-2" onClick={onClose} />
        </div>
    )
}

export default AlertMessage