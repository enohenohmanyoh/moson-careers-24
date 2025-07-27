export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'employer' | 'admin';
  profile?: {
    headline?: string;
    skills?: string[];
    resume?: string;
    company?: string;
    companyDescription?: string;
  };
  createdAt: Date;
}