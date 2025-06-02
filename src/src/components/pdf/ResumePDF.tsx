import React from 'react';
import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import type { ResumeFormData } from '../ResumeForm';
import type { TemplateType } from '../ResumePreview';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  link: {
    fontSize: 12,
    color: '#0000FF',
    textDecoration: 'underline',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    flexDirection: 'column',
    flex: 1,
  },
  bold: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottom: '1 solid #000',
    paddingBottom: 2,
  },
});

// Template-specific styles
const templateStyles = {
  classic: StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
  }),
  modern: StyleSheet.create({
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#3B82F6', // blue-500
    },
    headerContainer: {
      backgroundColor: '#3B82F6',
      padding: 20,
      color: '#FFFFFF',
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      marginTop: 10,
      gap: 15,
    },
  }),
  minimal: StyleSheet.create({
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: 15,
      textAlign: 'center',
    },
  }),
  creative: StyleSheet.create({
    header: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#8B5CF6', // purple-500
    },
    contactInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
  }),
};

interface ResumePDFProps {
  data: ResumeFormData;
  template?: TemplateType;
}

const ResumePDF: React.FC<ResumePDFProps> = ({ data, template = 'classic' }) => {
  const templateStyle = templateStyles[template];
  
  // Helper function to format arrays as comma-separated strings
  const formatArray = (items: string[]) => {
    return items.join(', ');
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={template === 'modern' && 'headerContainer' in templateStyle ? templateStyle.headerContainer : styles.section}>
          <Text style={templateStyle.header || styles.header}>{data.personal.name}</Text>
          {data.personal.headline && (
            <Text style={styles.text}>{data.personal.headline}</Text>
          )}
          
          {/* Contact Information */}
          <View style={templateStyle.contactInfo || styles.row}>
            {data.personal.email && (
              <Text style={styles.text}>{data.personal.email}</Text>
            )}
            
            {data.personal.website.link && (
              <Link src={data.personal.website.link} style={styles.link}>
                {data.personal.website.name || data.personal.website.link}
              </Link>
            )}
            
            {data.personal.location && (
              <Text style={styles.text}>{data.personal.location}</Text>
            )}
          </View>
          
          {/* Social Links */}
          {(data.socials.linkedIn || data.socials.github || data.socials.twitter) && (
            <View style={styles.row}>
              {data.socials.linkedIn && (
                <Link src={data.socials.linkedIn} style={styles.link}>
                  LinkedIn
                </Link>
              )}
              {data.socials.github && (
                <Link src={data.socials.github} style={styles.link}>
                  GitHub
                </Link>
              )}
              {data.socials.twitter && (
                <Link src={data.socials.twitter} style={styles.link}>
                  Twitter
                </Link>
              )}
            </View>
          )}
        </View>
        
        {/* Summary Section */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.text}>{data.summary}</Text>
          </View>
        )}
        
        {/* Experience Section */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.bold}>{exp.title}</Text>
                    <Text style={styles.text}>{exp.company}</Text>
                  </View>
                  <View style={{ textAlign: 'right' }}>
                    <Text style={styles.text}>
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
                {exp.description && (
                  <Text style={styles.text}>{exp.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Education Section */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.bold}>{edu.degree}</Text>
                    <Text style={styles.text}>{edu.institution}</Text>
                  </View>
                  <View style={{ textAlign: 'right' }}>
                    <Text style={styles.text}>
                      {edu.startDate} - {edu.endDate || 'Present'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
        
        {/* Skills Section */}
        {(data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {data.skills.programmingLanguages.length > 0 && (
              <View style={{ marginBottom: 5 }}>
                <Text style={styles.bold}>Programming Languages</Text>
                <Text style={styles.text}>{formatArray(data.skills.programmingLanguages)}</Text>
              </View>
            )}
            {data.skills.keywords.length > 0 && (
              <View>
                <Text style={styles.bold}>Keywords</Text>
                <Text style={styles.text}>{formatArray(data.skills.keywords)}</Text>
              </View>
            )}
          </View>
        )}
        
        {/* Projects Section */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.bold}>{project.title}</Text>
                {project.description && (
                  <Text style={styles.text}>{project.description}</Text>
                )}
                {project.technologies.length > 0 && (
                  <Text style={styles.text}>
                    Technologies: {formatArray(project.technologies)}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Languages Section */}
        {data.languages && data.languages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Languages</Text>
            <Text style={styles.text}>{formatArray(data.languages)}</Text>
          </View>
        )}
        
        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((cert, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={styles.bold}>{cert.name}</Text>
                <Text style={styles.text}>
                  {cert.issuingOrganization} • {cert.date}
                </Text>
              </View>
            ))}
          </View>
        )}
        
        {/* Awards Section */}
        {data.awards.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Awards</Text>
            {data.awards.map((award, index) => (
              <View key={index} style={{ marginBottom: 5 }}>
                <Text style={styles.bold}>{award.title} • {award.date}</Text>
                {award.description && (
                  <Text style={styles.text}>{award.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
        
        {/* Interests Section */}
        {data.interests && data.interests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Interests</Text>
            <Text style={styles.text}>{formatArray(data.interests)}</Text>
          </View>
        )}
        
        {/* References Section */}
        {data.references.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>References</Text>
            {data.references.map((ref, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <Text style={styles.bold}>{ref.name}</Text>
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

export default ResumePDF;
