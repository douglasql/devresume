import React from 'react';
import { Document, Page, Text, View, Image, Link } from '@react-pdf/renderer';
import type { ResumeFormData } from '../ResumeForm';
import { formatDate } from '../../utils/helper';
import LinkedInIcon from '../../assets/icons/linkedin-icon.png';
import GitHubIcon from '../../assets/icons/github-6980894_640.png';
import XIcon from '../../assets/icons/x-icon.png';
import styles from '../../styles/pdf/creative';

interface CreativePDFProps {
  data: ResumeFormData;
  contentHeight?: number;
}

const CreativePDF: React.FC<CreativePDFProps> = ({ data, contentHeight = 1200 }) => (
  <Document>
    <Page size={[612, contentHeight - 600]} style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{data.personal.name}</Text>
        {data.personal.headline && <Text style={styles.headline}>{data.personal.headline}</Text>}
        <View style={styles.contactRow}>
          {data.personal.email && (
            <Text style={styles.contactItem}>{data.personal.email}</Text>
          )}
          {data.personal.website.link && (
            <Link src={data.personal.website.link} style={styles.contactItem}>
              {data.personal.website.name || data.personal.website.link}
            </Link>
          )}
          {data.personal.location && (
            <Text style={styles.contactItem}>{data.personal.location}</Text>
          )}
        </View>
        {/* Socials with icons */}
        <View style={styles.socialsRow}>
          {data.socials.linkedIn && (
            <Link src={data.socials.linkedIn} style={{marginHorizontal: 3}}>
              <Image src={LinkedInIcon} style={styles.socialIcon} />
            </Link>
          )}
          {data.socials.github && (
            <Link src={data.socials.github} style={{marginHorizontal: 3}}>
              <Image src={GitHubIcon} style={styles.socialIcon} />
            </Link>
          )}
          {data.socials.twitter && (
            <Link src={data.socials.twitter} style={{marginHorizontal: 3}}>
              <Image src={XIcon} style={styles.socialIcon} />
            </Link>
          )}
        </View>
      </View>
      {/* Summary */}
      {data.summary && (
        <View style={styles.summarySection}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={{fontSize: 11, color: '#6b7280'}}>{data.summary}</Text>
        </View>
      )}
      {/* Skills */}
      {(data.skills.programmingLanguages.length > 0 || data.skills.keywords.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitles}>Skills</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {data.skills.programmingLanguages.map((lang, i) => (
              <Text key={`pl-${i}`} style={styles.badge}>{lang}</Text>
            ))}
            {data.skills.keywords.map((kw, i) => (
              <Text key={`kw-${i}`} style={styles.badge}>{kw}</Text>
            ))}
          </View>
        </View>
      )}
      {/* Experience */}
      {data.experience && data.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitles}>Experience</Text>
          {data.experience.map((exp, i) => (
            <View key={`exp-${i}`} style={styles.card}>
              <Text style={styles.expTitle}>{exp.title}</Text>
              <Text style={styles.expCompany}>{exp.company}</Text>
              <Text style={styles.expDate}>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : 'Present'}</Text>
              {exp.description && <Text style={styles.expDesc}>{exp.description}</Text>}
            </View>
          ))}
        </View>
      )}
      {/* Education */}
      {data.education && data.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitles}>Education</Text>
          {data.education.map((edu, i) => (
            <View key={`edu-${i}`} style={styles.card}>
              <Text style={styles.expTitle}>{edu.degree}</Text>
              <Text style={styles.expDate}>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</Text>
              <Text style={styles.expCompany}>{edu.institution}</Text>
            </View>
          ))}
        </View>
      )}
      {/* Interests */}
      {data.interests && data.interests.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitles}>Interests</Text>
          <View style={styles.interestRow}>
            {data.interests.map((interest, i) => (
              <Text key={`int-${i}`} style={styles.interestBadge}>{interest}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

export default CreativePDF;
