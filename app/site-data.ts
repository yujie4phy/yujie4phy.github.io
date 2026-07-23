import profileData from "../content/profile.json";
import publicationsData from "../content/publications.json";
import cvData from "../content/cv.json";
import talksData from "../content/talks.json";
import outreachData from "../content/outreach.json";

export type ProfileLink = {
  label: string;
  icon: "email" | "scholar" | "orcid" | "arxiv" | "twitter" | "github";
  href: string;
};

export type PublicationLink = {
  label: string;
  href: string;
};

export type Publication = {
  year: number;
  venue: string;
  title: string;
  authors: string;
  citation: string;
  abstract: string;
  selected?: boolean;
  links: PublicationLink[];
};

export type CareerEntry = {
  title: string;
  institution: string;
  location: string;
  dates: string;
  detail: string;
};

export type Award = {
  year: string;
  title: string;
  description: string;
  href?: string;
};

export type Outreach = {
  year: string;
  title: string;
  description: string;
  href: string;
};

export type Talk = {
  date: string;
  title: string;
  event: string;
  location: string;
  links: PublicationLink[];
};

export type Profile = {
  givenName: string;
  familyName: string;
  role: string;
  institution: string;
  department: string;
  location: string;
  email: string;
  lastUpdated: string;
  cvFile: string;
  links: ProfileLink[];
  interests: {
    title: string;
    description: string;
  }[];
};

export const profile = profileData as Profile;
export const publications = publicationsData as Publication[];
export const employment = cvData.employment as CareerEntry[];
export const education = cvData.education as CareerEntry[];
export const awards = cvData.awards as Award[];
export const talks = talksData as Talk[];
export const outreach = outreachData as Outreach[];
