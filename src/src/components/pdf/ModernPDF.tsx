import React from 'react';
import { Document, Page, Text, View, Link, Font, Image } from '@react-pdf/renderer';
// Import icon images
import LinkedInIcon from '../../assets/icons/linkedin-icon.png';
import GitHubIcon from '../../assets/icons/github-6980894_640.png';
import XIcon from '../../assets/icons/x-icon.png';
import type { ResumeFormData } from '../ResumeForm';
import { formatDate } from '../../utils/helper';
import styles from '../../styles/pdf/modern';

// Register fonts for better typography
// Register Open Sans (standard sans-serif font similar to Arial)
Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf', fontWeight: 700 }
  ]
});

// Also register Roboto as fallback
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

interface ModernPDFProps {
  data: ResumeFormData;
}

const ModernPDF: React.FC<ModernPDFProps> = ({ data}) => {
  // Calculate dynamic height based on content
  const calculateHeight = () => {
    let height = 100; // Base header height
    
    // Add height for summary
    if (data.summary) height += 100;
    
    // Add height for experience
    if (data.experience?.length > 0) {
      height += 40; // Section title
      height += data.experience.length * 120; // Approximate height per experience
    }
    
    // Add height for education
    if (data.education?.length > 0) {
      height += 40; // Section title
      height += data.education.length * 100; // Approximate height per education
    }
    
    // Add height for skills
    if (data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) {
      height += 100;
    }
    
    // Add height for projects
    if (data.projects?.length > 0) {
      height += 40; // Section title
      height += data.projects.length * 120; // Approximate height per project
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
      <Page size={[595.27, dynamicHeight - 250]} style={[styles.page, styles.continuousPage]}>
        {/* Header Section with blue background */}
        <View style={styles.header}>
          <Text style={styles.headerName}>{data.personal.name}</Text>
          {data.personal.headline && (
            <Text style={styles.headerHeadline}>{data.personal.headline}</Text>
          )}
          
          {/* Contact Information */}
          <View style={styles.contactRow}>
            {data.personal.email && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personal.email}</Text>
              </View>
            )}
            
            {data.personal.website.link && (
              <View style={styles.contactItem}>
                <Link src={data.personal.website.link} style={styles.contactText}>
                  {data.personal.website.name || data.personal.website.link}
                </Link>
              </View>
            )}
            
            {data.personal.location && (
              <View style={styles.contactItem}>
                <Text style={styles.contactText}>{data.personal.location}</Text>
              </View>
            )}
          </View>
          
          {/* Social Links */}
          <View style={styles.socialRow}>
            {data.socials.linkedIn && (
              <Link src={data.socials.linkedIn} style={styles.socialIcon}>
                <Image src={LinkedInIcon} style={styles.socialIconImage} />
              </Link>
            )}
            {data.socials.github && (
              <Link src={data.socials.github} style={styles.socialIcon}>
                <Image src={GitHubIcon} style={styles.socialIconImage} />
              </Link>
            )}
            {data.socials.twitter && (
              <Link src={data.socials.twitter} style={styles.socialIcon}>
                <Image src={XIcon} style={styles.socialIconImage} />
              </Link>
            )}
          </View>
        </View>
        
        {/* Content Section with two columns */}
        <View style={styles.content}>
          {/* Main Column */}
          <View style={styles.mainColumn}>
            {/* Summary */}
            {data.summary && (
              <View style={styles.sectionContent}>
                <View style={styles.sectionTitle}>
                  <Text>About Me</Text>
                </View>
                <Text style={styles.text}>{data.summary}</Text>
              </View>
            )}
            
            {/* Experience */}
            {data.experience && data.experience.length > 0 && (
              <View style={styles.sectionContent}>
                <View style={styles.sectionTitle}>
                  <Text>Work Experience</Text>
                </View>
                
                {data.experience.map((exp, index) => (
                  <View key={`exp-${index}`} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitle}>{exp.title}</Text>
                    </View>
                    <Text style={styles.experienceCompany}>{exp.company}</Text>
                    <Text style={styles.experienceDate}>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</Text>
                    {exp.description && (
                      <Text style={styles.experienceDescription}>{exp.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Education */}
            {data.education && data.education.length > 0 && (
              <View style={styles.sectionContent}>
                <View style={styles.sectionTitle}>
                  <Text>Education</Text>
                </View>
                
                {data.education.map((edu, index) => (
                  <View key={`edu-${index}`} style={styles.educationItem}>
                    <View style={styles.experienceHeader}>
                      <Text style={styles.experienceTitle}>{edu.degree}</Text>
                    </View>
                    <Text style={styles.experienceCompany}>{edu.institution}</Text>
                    <Text style={styles.experienceDate}>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
          
          {/* Side Column */}
          <View style={styles.sideColumn}>
            {/* Skills */}
            {(data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Skills</Text>
                </View>
                
                {data.skills.programmingLanguages.length > 0 && (
                  <View style={{marginBottom: 10}}>
                    <Text style={styles.skillsCategory}>Programming Languages</Text>
                    <Text style={styles.skillsList}>
                      {data.skills.programmingLanguages.join(', ')}
                    </Text>
                  </View>
                )}
                
                {data.skills.keywords.length > 0 && (
                  <View>
                    <Text style={styles.skillsCategory}>Keywords</Text>
                    <Text style={styles.skillsList}>
                      {data.skills.keywords.join(', ')}
                    </Text>
                  </View>
                )}
              </View>
            )}

            {/* Projects */}
            {data.projects && data.projects.length > 0 && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Projects</Text>
                </View>
                
                {data.projects.map((project, index) => (
                  <View key={`project-${index}`} style={styles.projectItem}>
                    <Text style={styles.projectTitle}>{project.title}</Text>
                    {project.description && (
                      <Text style={styles.text}>{project.description}</Text>
                    )}
                    {project.technologies && project.technologies.length > 0 && (
                      <Text style={styles.text}>
                        Technologies: {project.technologies.join(', ')}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Languages */}
            {data.languages && data.languages.length > 0 && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Languages</Text>
                </View>
                <View>
                  {data.languages.map((language, index) => (
                    <Text key={`lang-${index}`} style={styles.text}>{language}</Text>
                  ))}
                </View>
              </View>
            )}
            
            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Certifications</Text>
                </View>
                
                {data.certifications.map((cert, index) => (
                  <View key={`cert-${index}`} style={{marginBottom: 8}}>
                    <Text style={styles.skillsCategory}>{cert.name}</Text>
                    <Text style={styles.text}>
                      {cert.issuingOrganization} • {formatDate(cert.date)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            
            {/* Awards */}
            {data.awards && data.awards.length > 0 && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Awards</Text>
                </View>
                
                {data.awards.map((award, index) => (
                  <View key={`award-${index}`} style={{marginBottom: 8}}>
                    <Text style={styles.skillsCategory}>{award.title}</Text>
                    <Text style={styles.text}>{award.date}</Text>
                    {award.description && (
                      <Text style={styles.text}>{award.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            
            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
              <View style={styles.skillsSection}>
                <View style={styles.sectionTitle}>
                  <Text>Interests</Text>
                </View>
                <Text style={styles.text}>
                  {data.interests.join(', ')}
                </Text>
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ModernPDF;
