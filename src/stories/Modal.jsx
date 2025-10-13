import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './tokens.css';
import './modal.scss';

export const Modal = ({
  open = false,
  onClose,
  children,
  title,
  width = 500,
  closeOnEsc = true,
  closeOnOutside = true,
  showClose = true,
}) => {
  useEffect(() => {
    function handleKey(e) {
      if (!open) return;
      if (e.key === 'Escape' && closeOnEsc) onClose?.();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  return (
    <div className="sb-modal" role="dialog" aria-modal="true" aria-labelledby={title ? 'sb-modal-title' : undefined} onMouseDown={(e) => {
      if (!closeOnOutside) return;
      if (e.target.classList.contains('sb-modal')) onClose?.();
    }}>
      <div className="sb-modal__content" style={{ width }} onMouseDown={(e) => e.stopPropagation()}>
        {(title || showClose) ? (
          <div className="sb-modal__header">
            {title ? <div id="sb-modal-title" className="sb-modal__title">{title}</div> : <span />}
            {showClose ? (
              <button type="button" className="sb-modal__close" aria-label="Close" onClick={() => onClose?.()}>×</button>
            ) : null}
          </div>
        ) : null}
        <div className="sb-modal__body">{children}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  width: PropTypes.number,
  closeOnEsc: PropTypes.bool,
  closeOnOutside: PropTypes.bool,
  showClose: PropTypes.bool,
};

export const ConfirmDialog = ({ open, onCancel, onConfirm, title = 'Confirm', message = 'Are you sure?', confirmText = 'Confirm', cancelText = 'Cancel', loading = false, }) => {
  return (
    <Modal open={open} onClose={loading ? undefined : onCancel} title={title} width={420}>
      <div className="sb-confirm">
        <div className="sb-confirm__msg">{message}</div>
        <div className="sb-confirm__actions">
          <button type="button" className="storybook-button storybook-button--secondary" onClick={onCancel} disabled={loading}>{cancelText}</button>
          <button type="button" className={`storybook-button storybook-button--primary ${loading ? 'is-loading' : ''}`} onClick={onConfirm} disabled={loading}>{confirmText}</button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  loading: PropTypes.bool,
};


