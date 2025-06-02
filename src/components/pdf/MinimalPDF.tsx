import React from 'react';
import { Document, Page, Text, View, Link } from '@react-pdf/renderer';
import type { ResumeFormData } from '../ResumeForm';
import { formatDate } from '../../utils/helper';
import styles from '../../styles/pdf/minimal';

interface MinimalPDFProps {
  data: ResumeFormData;
}

const MinimalPDF: React.FC<MinimalPDFProps> = ({ data }) => {
  return (
    <Document>
      <Page size="LETTER">
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
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}
        
        {/* Skills */}
        {(data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            
            {data.skills.programmingLanguages.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.skillsCategory}>Programming Languages</Text>
                <Text style={styles.skillsList}>
                  {data.skills.programmingLanguages.join(' • ')}
                </Text>
              </View>
            )}
            
            {data.skills.keywords.length > 0 && (
              <View style={styles.skillsSection}>
                <Text style={styles.skillsCategory}>Technologies</Text>
                <Text style={styles.skillsList}>
                  {data.skills.keywords.join(' • ')}
                </Text>
              </View>
            )}
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
                <Text style={styles.experienceTitle}>{edu.degree}</Text>
                <Text style={styles.experienceCompany}>{edu.institution}</Text>
                <Text style={styles.experienceDate}>
                  {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Languages */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>
              {data.languages.join(' • ')}
            </Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MinimalPDF;
