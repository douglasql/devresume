import type { ResumeFormData } from "../components/ResumeForm";

export interface TemplateProps {
  data: ResumeFormData;
  parseArrayField: (field: string[] | string | undefined) => string[];
}