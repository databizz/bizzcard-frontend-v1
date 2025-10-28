'use client';

import { Card } from '@/types/signature';
import { QRCodeSVG } from 'qrcode.react';

interface CardPreviewProps {
  card: Card;
  showQRCode?: boolean;
}

export default function CardPreview({ card, showQRCode = true }: CardPreviewProps) {
  const cardUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/card/${card.id}`
    : '';

  const renderSocialIcons = () => {
    const socials = [];

    if (card.socialMedia.instagram) {
      socials.push(
        <a
          key="instagram"
          href={card.socialMedia.instagram.startsWith('http') ? card.socialMedia.instagram : `https://instagram.com/${card.socialMedia.instagram.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', background: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
      );
    }

    if (card.socialMedia.linkedin) {
      socials.push(
        <a
          key="linkedin"
          href={card.socialMedia.linkedin.startsWith('http') ? card.socialMedia.linkedin : `https://linkedin.com/in/${card.socialMedia.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', backgroundColor: '#0077b5', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      );
    }

    if (card.socialMedia.facebook) {
      socials.push(
        <a
          key="facebook"
          href={card.socialMedia.facebook.startsWith('http') ? card.socialMedia.facebook : `https://facebook.com/${card.socialMedia.facebook}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', backgroundColor: '#1877f2', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      );
    }

    if (card.socialMedia.twitter) {
      socials.push(
        <a
          key="twitter"
          href={card.socialMedia.twitter.startsWith('http') ? card.socialMedia.twitter : `https://twitter.com/${card.socialMedia.twitter.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', backgroundColor: '#000000', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
      );
    }

    if (card.socialMedia.youtube) {
      socials.push(
        <a
          key="youtube"
          href={card.socialMedia.youtube.startsWith('http') ? card.socialMedia.youtube : `https://youtube.com/@${card.socialMedia.youtube.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', backgroundColor: '#ff0000', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      );
    }

    if (card.socialMedia.tiktok) {
      socials.push(
        <a
          key="tiktok"
          href={card.socialMedia.tiktok.startsWith('http') ? card.socialMedia.tiktok : `https://tiktok.com/@${card.socialMedia.tiktok.replace('@', '')}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', margin: '0 4px', borderRadius: '8px', backgroundColor: '#000000', transition: 'transform 0.2s', verticalAlign: 'middle' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ display: 'block' }}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      );
    }

    return socials;
  };

  const renderTemplate = () => {
    const textColor = card.textColor || '#000000';
    const headerTextColor = card.headerTextColor || '#FFFFFF';
    const fontFamily = card.fontFamily || 'Arial, sans-serif';

    switch (card.template) {
      case 'minimal':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '560px',
            margin: '0 auto',
            padding: '48px 32px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
          }}>
            <div style={{ textAlign: 'center' }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '72px', height: '72px', borderRadius: '50%', marginBottom: '24px', objectFit: 'cover', border: '2px solid #f3f4f6' }}
                />
              )}
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: textColor, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {card.name}
              </h1>
              <p style={{ fontSize: '16px', color: textColor, opacity: 0.7, marginBottom: '4px', fontWeight: '400' }}>
                {card.role}
              </p>
              {card.company && (
                <p style={{ fontSize: '14px', color: textColor, opacity: 0.6, marginBottom: '32px' }}>{card.company}</p>
              )}

              {showQRCode && cardUrl && (
                <div style={{ margin: '32px 0', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', display: 'inline-block' }}>
                  <QRCodeSVG value={cardUrl} size={140} />
                </div>
              )}

              <div style={{ marginTop: '32px', fontSize: '15px', color: textColor, opacity: 0.8, lineHeight: '2.2' }}>
                {card.email && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );

      case 'modern':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: card.primaryColor,
              padding: '32px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                {card.logo && (
                  <img
                    src={card.logo}
                    alt={card.company}
                    style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.3)' }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h1 style={{ fontSize: '26px', fontWeight: '600', color: headerTextColor, marginBottom: '6px' }}>
                    {card.name}
                  </h1>
                  <p style={{ fontSize: '16px', color: headerTextColor, opacity: 0.9, marginBottom: '4px' }}>
                    {card.role}
                  </p>
                  {card.company && (
                    <p style={{ fontSize: '14px', color: headerTextColor, opacity: 0.8 }}>{card.company}</p>
                  )}
                </div>
                {showQRCode && cardUrl && (
                  <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '12px', flexShrink: 0 }}>
                    <QRCodeSVG value={cardUrl} size={80} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                {card.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.whatsapp && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={card.secondaryColor}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>WhatsApp</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
                {card.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '15px', fontWeight: '500', color: textColor, textDecoration: 'none' }}
                    >
                      {card.address}
                    </a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#f9fafb',
              padding: '40px 32px',
              textAlign: 'center',
              borderBottom: `3px solid ${card.primaryColor}`,
            }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '90px', height: '90px', borderRadius: '50%', marginBottom: '20px', objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                />
              )}
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: textColor, marginBottom: '8px' }}>
                {card.name}
              </h1>
              <p style={{ fontSize: '16px', color: card.secondaryColor, fontWeight: '500', marginBottom: '4px' }}>
                {card.role}
              </p>
              {card.company && (
                <p style={{ fontSize: '14px', color: textColor, opacity: 0.7 }}>{card.company}</p>
              )}
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                {card.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.whatsapp && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={card.secondaryColor}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>WhatsApp</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
                {card.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '15px', fontWeight: '500', color: textColor, textDecoration: 'none' }}
                    >
                      {card.address}
                    </a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                  {renderSocialIcons()}
                </div>
              )}

              {showQRCode && cardUrl && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <QRCodeSVG value={cardUrl} size={110} />
                </div>
              )}
            </div>
          </div>
        );

      case 'classic':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '580px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '2px solid #1f2937',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{
              backgroundColor: '#1f2937',
              padding: '32px',
              borderBottom: `4px solid ${card.primaryColor}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                {card.logo && (
                  <img
                    src={card.logo}
                    alt={card.company}
                    style={{ width: '80px', height: '80px', borderRadius: '8px', border: '3px solid white', objectFit: 'cover' }}
                  />
                )}
                <div style={{ flex: 1, color: headerTextColor }}>
                  <h1 style={{ fontSize: '30px', fontWeight: '700', color: headerTextColor, marginBottom: '8px' }}>
                    {card.name}
                  </h1>
                  <p style={{ fontSize: '17px', color: headerTextColor, opacity: 0.95, marginBottom: '4px' }}>
                    {card.role}
                  </p>
                  {card.company && (
                    <p style={{ fontSize: '15px', color: headerTextColor, opacity: 0.85 }}>{card.company}</p>
                  )}
                </div>
                {showQRCode && cardUrl && (
                  <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '8px', flexShrink: 0 }}>
                    <QRCodeSVG value={cardUrl} size={90} />
                  </div>
                )}
              </div>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
                {card.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.whatsapp && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={card.secondaryColor}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>WhatsApp</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
                {card.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '15px', fontWeight: '500', color: textColor, textDecoration: 'none' }}
                    >
                      {card.address}
                    </a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ paddingTop: '24px', borderTop: '2px solid #e5e7eb', textAlign: 'center' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );

      case 'creative':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          }}>
            <div style={{
              backgroundColor: card.primaryColor,
              padding: '48px 32px',
              position: 'relative',
            }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '90px', height: '90px', borderRadius: '20px', marginBottom: '20px', border: '4px solid white', objectFit: 'cover', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                />
              )}
              <h1 style={{ fontSize: '32px', fontWeight: '700', color: headerTextColor, marginBottom: '10px' }}>
                {card.name}
              </h1>
              <p style={{ fontSize: '18px', color: headerTextColor, opacity: 0.95, marginBottom: '6px', fontWeight: '500' }}>
                {card.role}
              </p>
              {card.company && (
                <p style={{ fontSize: '16px', color: headerTextColor, opacity: 0.85 }}>{card.company}</p>
              )}
            </div>

            <div style={{ padding: '40px 32px' }}>
              <div style={{ display: 'grid', gap: '18px', marginBottom: '32px' }}>
                {card.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    </div>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                      </svg>
                    </div>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.whatsapp && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill={card.secondaryColor}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                    </div>
                    <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>WhatsApp</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="2" y1="12" x2="22" y2="12"/>
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                      </svg>
                    </div>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontSize: '15px', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
                {card.address && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
                    <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '15px', fontWeight: '500', color: textColor, textDecoration: 'none' }}
                    >
                      {card.address}
                    </a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                  {renderSocialIcons()}
                </div>
              )}

              {showQRCode && cardUrl && (
                <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                  <QRCodeSVG value={cardUrl} size={120} />
                </div>
              )}
            </div>
          </div>
        );

      case 'elegant':
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '580px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            overflow: 'hidden',
          }}>
            <div style={{ display: 'flex' }}>
              <div style={{
                width: '6px',
                backgroundColor: card.primaryColor,
                flexShrink: 0,
              }}></div>

              <div style={{ flex: 1, padding: '40px 36px' }}>
                <div style={{ marginBottom: '36px' }}>
                  {card.logo && (
                    <img
                      src={card.logo}
                      alt={card.company}
                      style={{ width: '80px', height: '80px', borderRadius: '8px', marginBottom: '24px', objectFit: 'cover', border: '1px solid #e5e7eb' }}
                    />
                  )}
                  <h1 style={{ fontSize: '34px', fontWeight: '400', color: textColor, marginBottom: '12px', letterSpacing: '0.3px', lineHeight: '1.2' }}>
                    {card.name}
                  </h1>
                  <p style={{ fontSize: '17px', color: card.secondaryColor, marginBottom: '6px', fontWeight: '500' }}>
                    {card.role}
                  </p>
                  {card.company && (
                    <p style={{ fontSize: '15px', color: textColor, opacity: 0.7, fontStyle: 'italic' }}>{card.company}</p>
                  )}
                </div>

                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '28px', marginBottom: '28px' }}>
                  <div style={{ display: 'grid', gap: '18px' }}>
                    {card.email && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="1.5">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                            <polyline points="22,6 12,13 2,6"/>
                          </svg>
                        </div>
                        <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px' }}>{card.email}</a>
                      </div>
                    )}
                    {card.phone && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="1.5">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                          </svg>
                        </div>
                        <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px' }}>{card.phone}</a>
                      </div>
                    )}
                    {card.whatsapp && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill={card.secondaryColor}>
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                          </svg>
                        </div>
                        <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: textColor, textDecoration: 'none', fontSize: '15px' }}>WhatsApp</a>
                      </div>
                    )}
                    {card.website && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="2" y1="12" x2="22" y2="12"/>
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                          </svg>
                        </div>
                        <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontSize: '15px' }}>{card.website}</a>
                      </div>
                    )}
                    {card.address && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{ width: '18px', height: '18px', flexShrink: 0 }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={card.secondaryColor} strokeWidth="1.5">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: '15px', color: textColor, textDecoration: 'none' }}
                        >
                          {card.address}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                  <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px', textAlign: 'center' }}>
                    {renderSocialIcons()}
                  </div>
                )}

                {showQRCode && cardUrl && (
                  <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', textAlign: 'center' }}>
                    <QRCodeSVG value={cardUrl} size={100} />
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div style={{
            fontFamily: fontFamily,
            maxWidth: '560px',
            margin: '0 auto',
            padding: '48px 32px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '16px',
          }}>
            <div style={{ textAlign: 'center' }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '72px', height: '72px', borderRadius: '50%', marginBottom: '24px', objectFit: 'cover', border: '2px solid #f3f4f6' }}
                />
              )}
              <h1 style={{ fontSize: '28px', fontWeight: '600', color: textColor, marginBottom: '8px', letterSpacing: '-0.5px' }}>
                {card.name}
              </h1>
              <p style={{ fontSize: '16px', color: textColor, opacity: 0.7, marginBottom: '4px', fontWeight: '400' }}>
                {card.role}
              </p>
              {card.company && (
                <p style={{ fontSize: '14px', color: textColor, opacity: 0.6, marginBottom: '32px' }}>{card.company}</p>
              )}

              {showQRCode && cardUrl && (
                <div style={{ margin: '32px 0', padding: '16px', backgroundColor: '#f9fafb', borderRadius: '12px', display: 'inline-block' }}>
                  <QRCodeSVG value={cardUrl} size={140} />
                </div>
              )}

              <div style={{ marginTop: '32px', fontSize: '15px', color: textColor, opacity: 0.8, lineHeight: '2.2' }}>
                {card.email && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={`mailto:${card.email}`} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={`tel:${card.phone}`} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.phone}</a>
                  </div>
                )}
                {card.website && (
                  <div style={{ marginBottom: '12px' }}>
                    <a href={card.website} style={{ color: textColor, textDecoration: 'none', fontWeight: '500' }}>{card.website}</a>
                  </div>
                )}
              </div>

              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter || card.socialMedia.youtube || card.socialMedia.tiktok) && (
                <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  return <div>{renderTemplate()}</div>;
}
