import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './shared/tokens.css';
import './Image/image.scss';

export const Image = ({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  radius = 'md',
  fallback,
  errorFallback,
  threshold = 0.1,
  rootMargin = '200px',
  ...rest
}) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { root: null, rootMargin, threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  useEffect(() => {
    if (!isVisible) return;
    setHasError(false);
  }, [isVisible, src]);

  const classNames = [
    'sb-image',
    `sb-image--radius-${radius}`,
    loaded ? 'is-loaded' : null,
    hasError ? 'is-error' : null,
  ].filter(Boolean).join(' ');

  const style = {};
  if (width) style.width = width;
  if (height) style.height = height;


  return (
    <div ref={containerRef} className={classNames} style={style}>
      {!isVisible && fallback ? (
        <div className="sb-image__fallback" aria-hidden="true">{fallback}</div>
      ) : null}

      {isVisible && !hasError && (
        <img
          src={src}
          alt={alt}
          style={{ objectFit: fit, width: '100%', height: '100%' }}
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          {...rest}
        />
      )}

      {isVisible && hasError && (
        errorFallback ? (
          <div className="sb-image__error" role="img" aria-label="image failed">{errorFallback}</div>
        ) : (
          <div className="sb-image__error" role="img" aria-label="image failed">⚠️</div>
        )
      )}
    </div>
  );
};

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  fit: PropTypes.oneOf(['cover', 'contain', 'fill', 'none', 'scale-down']),
  radius: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'pill']),
  fallback: PropTypes.node,
  errorFallback: PropTypes.node,
  threshold: PropTypes.number,
  rootMargin: PropTypes.string,
};


