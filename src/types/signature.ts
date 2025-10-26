export interface SignatureData {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  whatsapp?: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
  };
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  template: 'modern' | 'classic' | 'minimal' | 'corporate' | 'creative' | 'elegant';
  qrCode?: {
    enabled: boolean;
    url: string;
    size?: 'small' | 'medium' | 'large';
    position?: 'left' | 'right' | 'center';
  };
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'corporate' | 'creative' | 'elegant';
