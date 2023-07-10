import React from 'react';

interface ToastProps {
  message: string;
  hidden: boolean;
  type: 'success' | 'error';
}

function Toast({ message, hidden, type }: ToastProps) {
  const toastClass = `toast toast-${type} ${hidden ? 'hidden' : ''}`;
  return (
    <div className={toastClass}>
      <div className="alert-error alert">
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Toast;
