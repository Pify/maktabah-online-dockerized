import React from "react";

interface LoadingOverlayProps {
    show: boolean;
    backdropColor?: string;
    zIndex?: number;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
    show,
    backdropColor = 'rgba(255, 255, 255, 0.7)',
    zIndex = 1050
}) => {
    if (!show) return null;

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: backdropColor, zIndex }}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default LoadingOverlay;