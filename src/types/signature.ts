// Card model for the simplified MVP
export interface Card {
  id: string;
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  whatsapp?: string;
  socialMedia: {
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
  template: TemplateType;
  createdAt: string;
  updatedAt: string;
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'corporate' | 'creative' | 'elegant';

// For backward compatibility during migration
export interface SignatureData extends Omit<Card, 'id' | 'createdAt' | 'updatedAt'> {
  id?: string;
}
