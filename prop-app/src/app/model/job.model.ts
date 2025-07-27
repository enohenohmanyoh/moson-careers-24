export type JobStatus = 'active' | 'expired' | 'filled' | 'draft' | 'archived';
export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: JobType;
  salary: string;
  status: JobStatus;
  description: string;
  requirements: string[];
  postedAt: Date;
  posted: string; // Display version like "2 days ago"
  applications?: number;
  skills?: string[];
  benefits?: string[];
}