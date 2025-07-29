export class Education {
  institution!: string;
  degree!: string;
  fieldOfStudy!: string;
  startDate!: string; // could also use Date if you want to parse dates
  endDate!: string;
}

export class EmploymentRecord {
  companyName!: string;
  jobTitle!: string;
  location!: string;
  dateRange!: string | null;
  responsibilities!: string[];
}

export class Employer {
  createdAt!: string;
  id!: string;
  firstName!: string;
  surname!: string;
  summary!: string;
  email!: string;
  mobile!: string | null;
  password!: string | null;
  role!: string;
  skills!: string[];
  educations!: Education[];
  employmentRecords!: EmploymentRecord[];
  cvProfile!: string | null;
  savedJobs!: string[] | null;
  appliedJobs!: string[] | null;
}

export class Jobs {
  createdAt!: string;
  id!: string;
  status!: string;
  company!: string;
  title!: string;
  salary!: string;
  location!: string;
  description!: string;
  reference!: string;
  requiredSkills!: string[];
  responsibilities!: string[];
  employer!: Employer;
  jobTypes!: string[];
  companyDescription!: string;
  companyUrl!: string;
  benefits!: string;
}
