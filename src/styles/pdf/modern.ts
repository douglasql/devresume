import { StyleSheet } from "@react-pdf/renderer";

// Create styles for Modern template
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Open Sans',
  },
  continuousPage: {
    padding: 0,
    margin: 0,
  },
  header: {
    backgroundColor: '#3B82F6', // blue-500
    padding: 30,
    color: '#FFFFFF',
  },
  headerName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerHeadline: {
    fontSize: 14,
    fontWeight: 300,
    marginBottom: 12,
    opacity: 0.9,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    gap: 15,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  contactIcon: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  contactText: {
    fontSize: 11,
    color: 'white',
  },
  socialRow: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 15,
  },
  socialIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  socialIconImage: {
    width: 14,
    height: 14,
  },
  socialText: {
    fontSize: 9,
    color: 'white',
    textAlign: 'center',
  },
  content: {
    padding: 15,
    flexDirection: 'row',
    gap: 10,
  },
  mainColumn: {
    flex: 1.5,
  },
  sideColumn: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFF6FF', // blue-50
    color: '#3B82F6',
    textAlign: 'center',
    paddingTop: 3,
  },
  sectionContent: {
    marginBottom: 10,
  },
  experienceItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeft: '2px solid #BFDBFE', // blue-200
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
  },
  experienceDate: {
    fontSize: 10,
    color: '#6B7280', // gray-500
  },
  experienceCompany: {
    fontSize: 11,
    color: '#374151', // gray-700
    marginBottom: 3,
  },
  experienceDescription: {
    fontSize: 10.5,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
  },
  educationItem: {
    marginBottom: 15,
    paddingLeft: 10,
    borderLeft: '2px solid #BFDBFE', // blue-200
  },
  skillsSection: {
    marginBottom: 20,
  },
  skillsCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 5,
  },
  skillsList: {
    fontSize: 11,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
  },
  projectItem: {
    marginBottom: 15,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1F2937', // gray-800
    marginBottom: 3,
  },
  text: {
    fontSize: 11,
    color: '#4B5563', // gray-600
    lineHeight: 1.4,
    marginBottom: 5,
  },
  link: {
    fontSize: 11,
    color: '#3B82F6', // blue-500
    textDecoration: 'none',
  },
});

export default styles;