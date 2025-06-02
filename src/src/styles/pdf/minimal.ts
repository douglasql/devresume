import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    backgroundColor: '#FFFFFF',
    color: '#333333',
  },
  continuousPage: {
    flexDirection: 'column',
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
  },
  headerName: {
    fontSize: 24,
    fontWeight: 'thin',
    marginBottom: 5,
    marginTop: 10,
    letterSpacing: 1,
  },
  headerHeadline: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 10,
    fontWeight: 'light',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 5,
    fontSize: 10,
    color: '#666666',
  },
  contactText: {
    marginHorizontal: 5,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
    fontSize: 10,
    color: '#666666',
  },
  link: {
    marginHorizontal: 5,
    color: '#666666',
    textDecoration: 'none',
  },
  section: {
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
  },
  sectionTitle: {
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: '#666666',
    marginBottom: 8,
    paddingBottom: 2,
    borderBottom: '0.5pt solid #EEEEEE',
  },
  text: {
    fontSize: 10,
    lineHeight: 1.5,
    color: '#444444',
    textAlign: 'justify',
    fontWeight: 'light',
  },
  skillsSection: {
    marginBottom: 5,
  },
  skillsCategory: {
    fontSize: 9,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: '#777777',
    marginBottom: 3,
  },
  skillsList: {
    fontSize: 10,
    color: '#444444',
    marginBottom: 5,
    fontWeight: 'light',
  },
  experienceItem: {
    marginBottom: 10,
  },
  lastItem: {
    marginBottom: 0,
  },
  experienceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#333333',
  },
  experienceDate: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 3,
  },
  experienceCompany: {
    fontSize: 10,
    color: '#444444',
    marginBottom: 3,
  },
  descriptionContainer: {
    marginTop: 3,
  },
  descriptionText: {
    fontSize: 9,
    color: '#555555',
    lineHeight: 1.4,
    fontWeight: 'light',
  },
  projectItem: {
    marginBottom: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#333333',
    marginBottom: 3,
  },
  bulletPoint: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#999999',
    marginRight: 5,
    marginTop: 4,
  },
  bulletContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  separator: {
    fontSize: 9,
    marginHorizontal: 3,
    color: '#999999',
  }
});

export default styles;
