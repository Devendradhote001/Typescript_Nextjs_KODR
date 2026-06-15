import { ObjectId } from "mongoose";

export interface IPersonalInfo {
  fullName: string;
  email: string;
  mobile: string;
  linkedUrl: string;
  githubUrl: string;
  location: string;
  portfolio?: string;
}

export interface IProjects {
  title: string;
  techStack: string[];
  description: string;
  githubLink: string;
  liveLink: string;
}

export interface IEducation {
  institute: string;
  degree: string;
  startDate: Date;
  endDate: Date;
  marks: string;
}

export interface IExperience {
  company: string;
  designation: string;
  description: string;
  startDate: Date;
  endDate: Date;
}

export interface IResume {
  _id?: ObjectId;
  user_id: ObjectId;
  title: string;
  summary: string;
  jobRole: string;
  experienceLevel: number;
  personalInfo: IPersonalInfo;
  projects: IProjects[];
  education: IEducation[];
  workExperience: IExperience[];
  achievements: string[];
  skills: string[];
  createdAt: Date;
  updatedAt: Date;
}
