import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../../index.scss';
import './Modal.scss';
import { expandStyleProps } from '../../utils/styleSystem';

export const Modal = ({
  open = false,
  onClose,
  children,
  title,
  header,
  footer,
  headerProps = {},
  footerProps = {},
  width = 500,
  closeOnEsc = true,
  closeOnOutside = true,
  showClose = true,
  as,
  className,
  style,
  hidden,
  ...rest
 }) => {
  const isRenderable = (v) => {
    if (v === undefined || v === null || typeof v === 'boolean') return false;
    if (typeof v === 'string' || typeof v === 'number') return true;
    if (Array.isArray(v)) return v.every((x) => typeof x === 'string' || typeof x === 'number' || React.isValidElement(x));
    return React.isValidElement(v);
  };
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
  const rootStyle = { ...expandStyleProps(rest), ...(style || {}) };
  if (hidden === true && rootStyle.display === undefined) rootStyle.display = 'none';
  return (
    <Root className={`sb-modal ${className || ''}`.trim()} style={rootStyle} role="dialog" aria-modal="true" aria-labelledby={title ? 'sb-modal-title' : undefined} onMouseDown={(e) => {
      if (!closeOnOutside) return;
      if (e.target.classList.contains('sb-modal')) onClose?.();
    }} {...rest}>
      <div className="sb-modal__content" style={{ width }} onMouseDown={(e) => e.stopPropagation()}>
        {(header || title || showClose) ? (
          <div className="sb-modal__header" {...headerProps}>
            {(() => {
              // Accept string/number/valid element; ignore objects/booleans from accidental controls
              if (header !== undefined && header !== null && typeof header !== 'boolean') {
                if (typeof header === 'string' || typeof header === 'number') return <div className="sb-modal__title">{header}</div>;
                if (React.isValidElement(header)) return header;
              }
              return title ? <div id="sb-modal-title" className="sb-modal__title">{title}</div> : <span />;
            })()}
            {showClose ? (
              <button type="button" className="sb-modal__close" aria-label="Close" onClick={() => onClose?.()}>×</button>
            ) : null}
          </div>
        ) : null}
        <div className="sb-modal__body">{children}</div>
        {isRenderable(footer) ? (
          <div className="sb-modal__footer" {...footerProps}>
            {footer}
          </div>
        ) : null}
      </div>
    </Root>
  );
};

Modal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  title: PropTypes.string,
  header: PropTypes.node,
  footer: PropTypes.node,
  headerProps: PropTypes.object,
  footerProps: PropTypes.object,
  width: PropTypes.number,
  closeOnEsc: PropTypes.bool,
  closeOnOutside: PropTypes.bool,
  showClose: PropTypes.bool,
};

export default Modal;


