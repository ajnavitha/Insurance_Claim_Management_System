import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaArrowLeft, FaChevronRight, FaCompass, FaBolt } from 'react-icons/fa';
import { useLanguage } from '../../context/LanguageContext';

export default function PageHeader({ title, subtitle, actions }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <div className="glass-panel" style={{ padding: '20px 28px', marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FaCompass /> {t('navHome')}
            </Link>
            {pathnames.map((name, index) => {
              const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
              return (
                <React.Fragment key={routeTo}>
                  <FaChevronRight style={{ fontSize: '0.65rem' }} />
                  {isLast ? (
                    <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{formattedName}</span>
                  ) : (
                    <Link to={routeTo}>{formattedName}</Link>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => navigate(-1)}
              className="btn btn-secondary btn-sm"
              title={t('back')}
              style={{ padding: '8px 12px' }}
            >
              <FaArrowLeft /> {t('back')}
            </button>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700 }} className="gradient-text">
                {title}
              </h2>
              {subtitle && <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '2px' }}>{subtitle}</p>}
            </div>
          </div>
        </div>

        {/* Quick Actions / Custom Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {actions}
          <div style={{ position: 'relative' }}>
            <Link to="/policies" className="btn btn-primary btn-sm">
              <FaBolt /> {t('quickActions')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
