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
          href={card.socialMedia.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: card.secondaryColor, textDecoration: 'none', fontSize: '20px', margin: '0 8px' }}
        >
          📷
        </a>
      );
    }

    if (card.socialMedia.linkedin) {
      socials.push(
        <a
          key="linkedin"
          href={card.socialMedia.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: card.secondaryColor, textDecoration: 'none', fontSize: '20px', margin: '0 8px' }}
        >
          💼
        </a>
      );
    }

    if (card.socialMedia.facebook) {
      socials.push(
        <a
          key="facebook"
          href={card.socialMedia.facebook}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: card.secondaryColor, textDecoration: 'none', fontSize: '20px', margin: '0 8px' }}
        >
          📘
        </a>
      );
    }

    if (card.socialMedia.twitter) {
      socials.push(
        <a
          key="twitter"
          href={card.socialMedia.twitter}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: card.secondaryColor, textDecoration: 'none', fontSize: '20px', margin: '0 8px' }}
        >
          🐦
        </a>
      );
    }

    return socials;
  };

  const renderTemplate = () => {
    switch (card.template) {
      case 'modern':
        return (
          <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              borderLeft: `4px solid ${card.primaryColor}`,
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '64px', height: '64px', borderRadius: '8px', objectFit: 'cover' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                  {card.name}
                </div>
                <div style={{ fontSize: '14px', color: card.secondaryColor, fontWeight: '600', marginBottom: '2px' }}>
                  {card.role}
                </div>
                {card.company && (
                  <div style={{ fontSize: '13px', color: '#6b7280' }}>{card.company}</div>
                )}
              </div>
              {showQRCode && cardUrl && (
                <div style={{ flexShrink: 0 }}>
                  <QRCodeSVG value={cardUrl} size={80} />
                </div>
              )}
            </div>
            <div style={{ padding: '0 24px 24px', fontSize: '13px', color: '#4b5563', lineHeight: '1.8' }}>
              {card.email && (
                <div style={{ marginBottom: '8px' }}>
                  📧 <a href={`mailto:${card.email}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.email}</a>
                </div>
              )}
              {card.phone && (
                <div style={{ marginBottom: '8px' }}>
                  📞 <a href={`tel:${card.phone}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.phone}</a>
                </div>
              )}
              {card.whatsapp && (
                <div style={{ marginBottom: '8px' }}>
                  💬 <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>WhatsApp</a>
                </div>
              )}
              {card.website && (
                <div style={{ marginBottom: '8px' }}>
                  🌐 <a href={card.website} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.website}</a>
                </div>
              )}
              {card.address && (
                <div style={{ marginBottom: '8px' }}>
                  📍 {card.address}
                </div>
              )}
              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) && (
                <div style={{ marginTop: '16px', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );

      case 'minimal':
        return (
          <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            padding: '24px',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}>
            <div style={{ textAlign: 'center' }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '16px', objectFit: 'cover' }}
                />
              )}
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                {card.name}
              </div>
              <div style={{ fontSize: '14px', color: '#6b7280', marginBottom: '2px' }}>
                {card.role}
              </div>
              {card.company && (
                <div style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '16px' }}>{card.company}</div>
              )}
              {showQRCode && cardUrl && (
                <div style={{ margin: '20px 0' }}>
                  <QRCodeSVG value={cardUrl} size={120} />
                </div>
              )}
              <div style={{ fontSize: '13px', color: '#4b5563', lineHeight: '2' }}>
                {card.email && (
                  <div>
                    <a href={`mailto:${card.email}`} style={{ color: '#1f2937', textDecoration: 'none' }}>{card.email}</a>
                  </div>
                )}
                {card.phone && (
                  <div>
                    <a href={`tel:${card.phone}`} style={{ color: '#1f2937', textDecoration: 'none' }}>{card.phone}</a>
                  </div>
                )}
                {card.website && (
                  <div>
                    <a href={card.website} style={{ color: '#1f2937', textDecoration: 'none' }}>{card.website}</a>
                  </div>
                )}
              </div>
              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) && (
                <div style={{ marginTop: '16px' }}>
                  {renderSocialIcons()}
                </div>
              )}
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            maxWidth: '600px',
            margin: '0 auto',
            backgroundColor: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            overflow: 'hidden',
          }}>
            <div style={{
              background: `linear-gradient(135deg, ${card.primaryColor} 0%, ${card.secondaryColor} 100%)`,
              padding: '24px',
              textAlign: 'center',
              color: '#ffffff',
            }}>
              {card.logo && (
                <img
                  src={card.logo}
                  alt={card.company}
                  style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '12px', border: '3px solid #ffffff', objectFit: 'cover' }}
                />
              )}
              <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                {card.name}
              </div>
              <div style={{ fontSize: '16px', opacity: 0.95 }}>
                {card.role}
              </div>
              {card.company && (
                <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '4px' }}>{card.company}</div>
              )}
            </div>
            <div style={{ padding: '24px', fontSize: '14px', color: '#4b5563', lineHeight: '2' }}>
              {card.email && (
                <div>
                  📧 <a href={`mailto:${card.email}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.email}</a>
                </div>
              )}
              {card.phone && (
                <div>
                  📞 <a href={`tel:${card.phone}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.phone}</a>
                </div>
              )}
              {card.whatsapp && (
                <div>
                  💬 <a href={`https://wa.me/${card.whatsapp.replace(/\D/g, '')}`} style={{ color: card.secondaryColor, textDecoration: 'none' }}>WhatsApp</a>
                </div>
              )}
              {card.website && (
                <div>
                  🌐 <a href={card.website} style={{ color: card.secondaryColor, textDecoration: 'none' }}>{card.website}</a>
                </div>
              )}
              {card.address && (
                <div>
                  📍 {card.address}
                </div>
              )}
              {(card.socialMedia.instagram || card.socialMedia.linkedin || card.socialMedia.facebook || card.socialMedia.twitter) && (
                <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                  {renderSocialIcons()}
                </div>
              )}
              {showQRCode && cardUrl && (
                <div style={{ marginTop: '20px', textAlign: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '20px' }}>
                  <QRCodeSVG value={cardUrl} size={100} />
                  <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>Scan to view full card</div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return renderTemplate();
    }
  };

  return <div>{renderTemplate()}</div>;
}
