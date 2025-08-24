import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ loading = false, children, disabled, ...rest }) => {
  return (
    <div className="d-grid">
      <button
        className="btn btn-primary justify-content-center"
        type="submit"
        disabled={loading || disabled}
        {...rest}
      >
        {loading && (
          <FontAwesomeIcon
            icon={faSpinner}
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    </div>
  );
};

export default LoadingButton;
