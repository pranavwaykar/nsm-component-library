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
  headerLeftContent,
  headerRightContent,
  footerLeftContent,
  footerRightContent,
  headerProps = {},
  footerProps = {},
  width = 500,
  closeOnEsc = true,
  closeOnOutside = true,
  showClose = true,
  showHeaderBorder = true,
  showFooterBorder = true,
  // color customization
  overlayBg,
  contentBg,
  contentTextColor,
  headerBg,
  headerTextColor,
  footerBg,
  footerTextColor,
  innerBorderColor,
  headerCloseIconColor,
  closeVariant = 'icon', // 'icon' | Button variants: 'primary','secondary','ghost','destructive','success','warning'
  // states
  disabled = false,
  loading = false,
  draggable = false,
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

  // Drag handling (content)
  const contentRef = React.useRef(null);
  const dragState = React.useRef({ dragging: false, startX: 0, startY: 0, originLeft: 0, originTop: 0 });
  const [dragPos, setDragPos] = React.useState(null); // { left, top }
  useEffect(() => {
    function onMove(e) {
      if (!dragState.current.dragging) return;
      e.preventDefault();
      const dx = e.clientX - dragState.current.startX;
      const dy = e.clientY - dragState.current.startY;
      setDragPos({
        left: Math.max(0, dragState.current.originLeft + dx),
        top: Math.max(0, dragState.current.originTop + dy),
      });
    }
    function onUp() {
      dragState.current.dragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    if (dragState.current.dragging) {
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
  }, [dragPos]);

  function startDrag(e) {
    if (!draggable || disabled || loading) return;
    try {
      const rect = contentRef.current?.getBoundingClientRect();
      if (!rect) return;
      dragState.current.dragging = true;
      dragState.current.startX = e.clientX;
      dragState.current.startY = e.clientY;
      dragState.current.originLeft = dragPos?.left ?? rect.left;
      dragState.current.originTop = dragPos?.top ?? rect.top;
      e.preventDefault();
      e.stopPropagation();
    } catch (_) {}
  }

  if (!open) return null;

  const Root = as || 'div';
  const expanded = expandStyleProps(rest);
  const rootStyle = { ...expanded, ...(style || {}) };
  // Move width/height and padding/margin props to content instead of overlay
  const contentStyle = { width };
  const contentKeys = [
    'width','minWidth','maxWidth',
    'height','minHeight','maxHeight',
    'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
    'margin','marginTop','marginRight','marginBottom','marginLeft',
    // layout and placement
    'display','flex','flexDirection','flexWrap','justifyContent','alignItems','alignContent','gap','rowGap','columnGap',
    'position','top','right','bottom','left','inset',
    // borders and outline
    'border','borderTop','borderRight','borderBottom','borderLeft','borderColor','borderWidth','borderStyle','borderRadius',
    'outline','outlineOffset','boxShadow',
  ];
  contentKeys.forEach((k) => {
    if (rootStyle[k] !== undefined) {
      contentStyle[k] = rootStyle[k];
      delete rootStyle[k];
    }
  });
  if (overlayBg) rootStyle.background = overlayBg;
  if (hidden === true && rootStyle.display === undefined) rootStyle.display = 'none';
  return (
    <Root className={`sb-modal ${disabled ? 'is-disabled' : ''} ${loading ? 'is-loading' : ''} ${className || ''}`.trim()} style={rootStyle} role="dialog" aria-modal="true" aria-labelledby={title ? 'sb-modal-title' : undefined} onMouseDown={(e) => {
      if (!closeOnOutside) return;
      if (e.target.classList.contains('sb-modal')) onClose?.();
    }} {...rest}>
      <div
        ref={contentRef}
        className="sb-modal__content"
        style={{
          ...(contentBg ? { background: contentBg } : {}),
          ...(contentTextColor ? { color: contentTextColor } : {}),
          ...(innerBorderColor ? { borderColor: innerBorderColor } : {}),
          ...(dragPos ? { position: 'absolute', left: dragPos.left, top: dragPos.top, margin: 0 } : {}),
          ...contentStyle,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {(header || title || showClose) ? (
          <div
            className="sb-modal__header"
            {...headerProps}
            style={{ ...(headerProps?.style || {}), ...(showHeaderBorder === false ? { borderBottom: '0' } : {}), ...(headerBg ? { background: headerBg } : {}), ...(headerTextColor ? { color: headerTextColor } : {}), ...(innerBorderColor ? { borderColor: innerBorderColor } : {}) }}
            onMouseDown={startDrag}
          >
            {(() => {
              if (headerLeftContent !== undefined && headerLeftContent !== null && typeof headerLeftContent !== 'boolean') {
                if (typeof headerLeftContent === 'string' || typeof headerLeftContent === 'number') return <div className="sb-modal__header-left">{headerLeftContent}</div>;
                if (React.isValidElement(headerLeftContent)) return <div className="sb-modal__header-left">{headerLeftContent}</div>;
              }
              return null;
            })()}
            {(() => {
              // Accept string/number/valid element; ignore objects/booleans from accidental controls
              if (header !== undefined && header !== null && typeof header !== 'boolean') {
                if (typeof header === 'string' || typeof header === 'number') return <div className="sb-modal__title">{header}</div>;
                if (React.isValidElement(header)) return header;
              }
              return title ? <div id="sb-modal-title" className="sb-modal__title">{title}</div> : <span />;
            })()}
            {(() => {
              if (headerRightContent !== undefined && headerRightContent !== null && typeof headerRightContent !== 'boolean') {
                return typeof headerRightContent === 'string' || typeof headerRightContent === 'number'
                  ? <div className="sb-modal__header-right">{headerRightContent}</div>
                  : React.isValidElement(headerRightContent) ? <div className="sb-modal__header-right">{headerRightContent}</div> : null;
              }
              if (showClose) {
                if (closeVariant === 'icon') {
                  return <button type="button" className="sb-modal__close" aria-label="Close" onClick={() => onClose?.()} style={{ ...(headerCloseIconColor ? { color: headerCloseIconColor } : {}) }}>×</button>;
                }
                // Render a Button variant as close action
                try {
                  const { Button } = require('../Button/Button'); // dynamic require avoids circular in some bundlers
                  return React.createElement(Button, { label: 'Close', variant: closeVariant, size: 'small', onClick: () => onClose?.() });
                } catch {
                  return <button type="button" className="sb-modal__close" aria-label="Close" onClick={() => onClose?.()}>×</button>;
                }
              }
              return null;
            })()}
          </div>
        ) : null}
        <div className="sb-modal__body">
          {(() => {
            if (children !== undefined && children !== null && typeof children !== 'boolean') return children;
            return null;
          })()}
        </div>
        {(isRenderable(footer) || footerLeftContent !== undefined || footerRightContent !== undefined) ? (
          <div
            className="sb-modal__footer"
            {...footerProps}
            style={{ ...(footerProps?.style || {}), ...(showFooterBorder === false ? { borderTop: '0' } : {}), ...(footerBg ? { background: footerBg } : {}), ...(footerTextColor ? { color: footerTextColor } : {}), ...(innerBorderColor ? { borderColor: innerBorderColor } : {}) }}
          >
            {(() => {
              if (footer) return footer;
              const left = footerLeftContent;
              const right = footerRightContent;
              return (
                <>
                  {left !== undefined && left !== null
                    ? (typeof left === 'string' || typeof left === 'number' ? <div className="sb-modal__footer-left">{left}</div> : React.isValidElement(left) ? <div className="sb-modal__footer-left">{left}</div> : null)
                    : null}
                  {right !== undefined && right !== null
                    ? (typeof right === 'string' || typeof right === 'number' ? <div className="sb-modal__footer-right">{right}</div> : React.isValidElement(right) ? <div className="sb-modal__footer-right">{right}</div> : null)
                    : null}
                </>
              );
            })()}
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
  showHeaderBorder: PropTypes.bool,
  showFooterBorder: PropTypes.bool,
  headerLeftContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  headerRightContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  footerLeftContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  footerRightContent: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.number]),
  overlayBg: PropTypes.string,
  contentBg: PropTypes.string,
  contentTextColor: PropTypes.string,
  headerBg: PropTypes.string,
  headerTextColor: PropTypes.string,
  footerBg: PropTypes.string,
  footerTextColor: PropTypes.string,
  innerBorderColor: PropTypes.string,
  headerCloseIconColor: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Modal;


