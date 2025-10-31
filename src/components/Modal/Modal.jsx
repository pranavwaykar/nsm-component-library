import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Modal.scss';

export const Modal = ({
  open = false,
  onClose,
  children,
  title,
  width = 500,
  closeOnEsc = true,
  closeOnOutside = true,
  showClose = true,
  as,
  className,
  ...rest
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

  const Root = as || 'div';
  return (
    <Root className={`sb-modal ${className || ''}`.trim()} role="dialog" aria-modal="true" aria-labelledby={title ? 'sb-modal-title' : undefined} onMouseDown={(e) => {
      if (!closeOnOutside) return;
      if (e.target.classList.contains('sb-modal')) onClose?.();
    }} {...rest}>
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
    </Root>
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

export default Modal;


