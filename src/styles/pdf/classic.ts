import { StyleSheet } from "@react-pdf/renderer";

// Create styles for Classic template
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Courier',
  },
  continuousPage: {
    padding: 0,
  },
  header: {
    textAlign: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottom: '1pt solid #E5E7EB',
    marginLeft: 20,
    marginRight: 20
  },
  headerName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 10
  },
  headerHeadline: {
    fontSize: 15,
    color: '#4B5563', // gray-600
    marginBottom: 10,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: 15,
  },
  contactText: {
    fontSize: 12,
    color: '#4B5563', // gray-600
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
    gap: 15,
  },
  link: {
    fontSize: 12,
    color: '#2563EB', // blue-600
    textDecoration: 'none',
  },
  section: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'semibold',
    color: '#1F2937', // gray-800
    marginBottom: 3,
    paddingBottom: 3,
    textTransform: 'uppercase',
  },
  experienceItem: {
    marginBottom: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  lastItem: {
    marginBottom: 10,
    paddingBottom: 0,
    borderBottom: 'none',
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
  },
  experienceDate: {
    fontSize: 11,
    color: '#1F2937', // gray-500
    backgroundColor: '#F3F4F6',
    padding: '2 6',
    borderRadius: 12,
  },
  experienceCompany: {
    fontSize: 13,
    color: '#374151', // gray-700
    marginBottom: 3,
  },
  text: {
    fontSize: 12,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
    marginBottom: 5,
  },
  // Enhanced text wrapping styles
  descriptionText: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 1.4,
    marginBottom: 5,
    textAlign: 'left',
    width: '100%',
    maxWidth: '100%',
    wordWrap: 'break-word',
    overflow: 'hidden',
  },
  // Container for description to ensure proper width
  descriptionContainer: {
    width: '100%',
    maxWidth: '100%',
    flexDirection: 'column',
    display: 'flex',
  },
  skillsSection: {
    marginBottom: 15,
  },
  skillsCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 3,
  },
  skillsList: {
    fontSize: 11,
    color: '#4B5563', // gray-600
  },
  skillsChipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  skillChip: {
    fontSize: 11,
    color: '#1F2937',
    backgroundColor: '#F3F4F6',
    padding: '2 6',
    borderRadius: 12,
  },
  projectItem: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottom: '0.5pt solid #E5E7EB', // gray-200
  },
  projectTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 3,
  },
});

export default styles;