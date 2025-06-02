import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import type { ResumeFormData } from '../ResumeForm';
import { formatDate } from '../../utils/helper';
import styles from '@/styles/pdf/classic';

interface ClassicPDFProps {
  data: ResumeFormData;
}

const ClassicPDF: React.FC<ClassicPDFProps> = ({ data }) => {
  // Calculate dynamic height based on content
  const calculateHeight = () => {
    let height = 100; // Base header height
    
    // Add height for summary
    if (data.summary) height += 90;
    
    // Add height for experience
    if (data.experience?.length > 0) {
      height += 40; // Section title
      height += data.experience.length * 130; // Approximate height per experience
    }
    
    // Add height for education
    if (data.education?.length > 0) {
      height += 40; // Section title
      height += data.education.length * 100; // Approximate height per education
    }
    
    // Add height for skills
    if (data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) {
      height += 90;
    }
    
    // Add height for projects
    if (data.projects?.length > 0) {
      height += 40; // Section title
      height += data.projects.length * 100; // Approximate height per project
    }
    
    // Add height for other sections
    const languageCount = data.languages?.length ?? 0;
    const interestCount = data.interests?.length ?? 0;
    if (languageCount > 0) height += 40;
    if (data.certifications?.length > 0) height += 40 + (data.certifications.length * 50);
    if (data.awards?.length > 0) height += 40 + (data.awards.length * 50);
    if (interestCount > 0) height += 60;
    if (data.references?.length > 0) height += 40 + (data.references.length * 80);
    
    return Math.max(height, 400); // Minimum height
  };

  const dynamicHeight = calculateHeight();

  return (
    <Document>
      <Page size={[612, dynamicHeight]} style={[styles.page, styles.continuousPage]}>
        {/* Header Section with centered text */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.personal.name}</Text>
          {data.personal.headline && (
            <Text style={styles.headerHeadline}>{data.personal.headline}</Text>
          )}
          
          {/* Contact Information */}
          <View style={styles.contactRow}>
            {data.personal.email && (
              <Text style={styles.contactText}>{data.personal.email}</Text>
            )}
            
            {data.personal.website.link && (
              <Link src={data.personal.website.link} style={styles.link}>
                {data.personal.website.name || data.personal.website.link}
              </Link>
            )}
            
            {data.personal.location && (
              <Text style={styles.contactText}>{data.personal.location}</Text>
            )}
          </View>
          
          {/* Social Links */}
          <View style={styles.socialRow}>
            {data.socials.linkedIn && (
              <Link src={data.socials.linkedIn} style={styles.link}>LinkedIn</Link>
            )}
            {data.socials.github && (
              <Link src={data.socials.github} style={styles.link}>GitHub</Link>
            )}
            {data.socials.twitter && (
              <Link src={data.socials.twitter} style={styles.link}>Twitter</Link>
            )}
          </View>
        </View>
        
        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}
        
        {/* Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            
            {data.experience.map((exp, index) => (
              <View 
                key={`exp-${index}`} 
                style={index === data.experience.length - 1 ? styles.lastItem : styles.experienceItem}
              >
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{exp.title}</Text>
                  <Text style={styles.experienceDate}>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</Text>
                </View>
                <Text style={styles.experienceCompany}>{exp.company}</Text>
                {exp.description && (
                  <View style={styles.descriptionContainer}>
                    <Text style={styles.descriptionText}>{exp.description}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            
            {data.education.map((edu, index) => (
              <View 
                key={`edu-${index}`} 
                style={index === data.education.length - 1 ? styles.lastItem : styles.experienceItem}
              >
                <View style={styles.experienceHeader}>
                  <Text style={styles.experienceTitle}>{edu.degree}</Text>
                  <Text style={styles.experienceDate}>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</Text>
                </View>
                <Text style={styles.experienceCompany}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Skills */}
        {(data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.programmingLanguages.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.skillsCategory}>Programming Languages</Text>
                <View style={styles.skillsChipContainer}>
                  {data.skills.programmingLanguages.map((skill, index) => (
                    <Text key={index} style={styles.skillChip}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {data.skills.keywords.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.skillsCategory}>Technologies & Frameworks</Text>
                <View style={[styles.skillsChipContainer, { marginTop: 5 }]}>
                  {data.skills.keywords.map((skill, index) => (
                    <Text key={index} style={styles.skillChip}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}
        
        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            
            {data.projects.map((project, index) => (
              <View 
                key={`project-${index}`} 
                style={index === data.projects.length - 1 ? styles.lastItem : styles.projectItem}
              >
                <Text style={styles.projectTitle}>{project.title}</Text>
                {project.description && (
                  <Text style={styles.text}>{project.description}</Text>
                )}
                {project.technologies && project.technologies.length > 0 && (
                  <View style={[styles.skillsChipContainer, { marginBottom: 3 }]}>
                    <Text style={{fontWeight: 'bold', fontSize: 11}}>Technologies: </Text>
                    {project.technologies.map((proj, i) => (
                      <Text key={i} style={styles.skillChip}>{proj}</Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <View style={styles.skillsChipContainer}>
              {data.languages.map((lang, i) => (
                <Text key={i} style={styles.skillChip}>{lang}</Text>
              ))}
            </View>
          </View>
        )}
        
        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            
            {data.certifications.map((cert, index) => (
              <View key={`cert-${index}`} style={{marginBottom: 8}}>
                <Text style={styles.skillsCategory}>{cert.name}</Text>
                <Text style={styles.text}>
                  {cert.issuingOrganization} • {cert.date}
                </Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Awards */}
        {data.awards && data.awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards & Recognition</Text>
            
            {data.awards.map((award, index) => (
              <View key={`award-${index}`} style={{marginBottom: 8}}>
                <Text style={styles.skillsCategory}>{award.title} • {award.date}</Text>
                {award.description && (
                  <Text style={styles.text}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests & Pursuits</Text>
            <View style={styles.skillsChipContainer}>
              {data.interests.map((interest, i) => (
                <Text key={i} style={styles.skillChip}>{interest}</Text>
              ))}
            </View>
          </View>
        )}
        
        {/* References */}
        {data.references && data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            
            {data.references.map((ref, index) => (
              <View key={`ref-${index}`} style={{marginBottom: 10}}>
                <Text style={styles.skillsCategory}>{ref.name}</Text>
                <Text style={styles.text}>{ref.title} at {ref.company}</Text>
                <Text style={styles.text}>{ref.email} • {ref.phone}</Text>
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ClassicPDF;