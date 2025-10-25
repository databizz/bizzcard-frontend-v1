export interface SignatureData {
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  socialMedia?: {
    instagram?: string;
    linkedin?: string;
    facebook?: string;
  };
  logo?: string;
  primaryColor: string;
  secondaryColor: string;
  template: 'modern' | 'classic' | 'minimal' | 'corporate';
}

export type TemplateType = 'modern' | 'classic' | 'minimal' | 'corporate';
