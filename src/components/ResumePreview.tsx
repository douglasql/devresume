import React from 'react';
import type { ResumeFormData } from './ResumeForm';
import ClassicTemplate from './templates/Classic';
import ModernTemplate from './templates/Modern';
import MinimalTemplate from './templates/Minimal';
import CreativeTemplate from './templates/Creative';

export type TemplateType = 'classic' | 'modern' | 'minimal' | 'creative';

interface ResumePreviewProps {
  data: ResumeFormData;
  template?: TemplateType;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data, template = 'classic' }) => {
  // Helper function to convert comma-separated strings to arrays
  const parseArrayField = (field: string[] | string | undefined): string[] => {
    if (!field) return [];
    if (Array.isArray(field)) return field;
    return field.split(',').map(item => item.trim()).filter(Boolean);
  };

  

  // Template selector
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return <ModernTemplate data={data} parseArrayField={parseArrayField} />;
      case 'minimal':
        return <MinimalTemplate data={data} parseArrayField={parseArrayField} />;
      case 'creative':
        return <CreativeTemplate data={data} parseArrayField={parseArrayField} />;
      case 'classic':
      default:
        return <ClassicTemplate data={data} parseArrayField={parseArrayField} />;
    }
  };

  return (
    <div className="p-6 min-h-screen print:bg-white print:p-0">
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;