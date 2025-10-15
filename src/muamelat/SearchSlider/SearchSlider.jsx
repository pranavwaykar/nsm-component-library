import React, { useState } from 'react';
import './SearchSlider.scss';
import { classNames } from '../common/utils';

const SearchSlider = () => {
  const [collapse, setCollapse] = useState(true);
  const [collapseExternal, setCollapseExternal] = useState(true);
  const [internal, setInternal] = useState({ filter: true, documents: true, emails: true });
  const [external, setExternal] = useState({ filter: true, documents: true, emails: true });

  return (
    <div className="search-slider">
      <div className="ss-body">
        <div className="ssb-scroll">
          <div className="folder-card-comp">
            <div className="fcc-main">
              <div className="fccm-left">
                <div
                  className={classNames('fcc-input', internal.filter && 'checked')}
                  onClick={() => setInternal((s) => ({ filter: !s.filter, documents: !s.filter, emails: !s.filter }))}
                />
                <div className="fcc-content">Internal</div>
              </div>
              <div className="fccm-right">
                <div className="fcc-count">0</div>
                <i className={classNames('fcc-arrow icon-chevron-down', collapse ? 'active' : '')} onClick={() => setCollapse((o) => !o)} />
              </div>
            </div>
            {collapse && (
              <div className="fcc-body">
                <div className="sub-folder-comp">
                  <div className="sfc-left">
                    <div className={classNames('sfc-input', internal.documents && 'checked')} onClick={() => setInternal((s) => ({ ...s, documents: !s.documents, filter: !s.documents || s.emails }))} />
                    <div className="sfc-content">Documents</div>
                  </div>
                  <div className="sfc-count">0</div>
                </div>
                <div className="sub-folder-comp">
                  <div className="sfc-left">
                    <div className={classNames('sfc-input', internal.emails && 'checked')} onClick={() => setInternal((s) => ({ ...s, emails: !s.emails, filter: !s.emails || s.documents }))} />
                    <div className="sfc-content">Emails</div>
                  </div>
                  <div className="sfc-count">0</div>
                </div>
              </div>
            )}
          </div>

          <div className="folder-card-comp">
            <div className="fcc-main">
              <div className="fccm-left">
                <div className={classNames('fcc-input', external.filter && 'checked')} onClick={() => setExternal((s) => ({ filter: !s.filter, documents: !s.filter, emails: !s.filter }))} />
                <div className="fcc-content">External</div>
              </div>
              <div className="fccm-right">
                <div className="fcc-count">0</div>
                <i className={classNames('fcc-arrow icon-chevron-down', collapseExternal ? 'active' : '')} onClick={() => setCollapseExternal((o) => !o)} />
              </div>
            </div>
            {collapseExternal && (
              <div className="fcc-body">
                <div className="sub-folder-comp">
                  <div className="sfc-left">
                    <div className={classNames('sfc-input', external.documents && 'checked')} onClick={() => setExternal((s) => ({ ...s, documents: !s.documents, filter: !s.documents || s.emails }))} />
                    <div className="sfc-content">Documents</div>
                  </div>
                  <div className="sfc-count">0</div>
                </div>
                <div className="sub-folder-comp">
                  <div className="sfc-left">
                    <div className={classNames('sfc-input', external.emails && 'checked')} onClick={() => setExternal((s) => ({ ...s, emails: !s.emails, filter: !s.emails || s.documents }))} />
                    <div className="sfc-content">Emails</div>
                  </div>
                  <div className="sfc-count">0</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchSlider;


