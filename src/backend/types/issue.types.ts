export enum IssueType {
  CLOUD_SECURITY = 'CLOUD_SECURITY',
  RETEAM_ASSESSMENT = 'RETEAM_ASSESSMENT',
  VAPT = 'VAPT',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface CreateIssueDTO {
  type: IssueType;
  title: string;
  description: string;
  priority?: Priority;
  status?: Status;
}

export interface UpdateIssueDTO {
  type?: IssueType;
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
}