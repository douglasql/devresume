import { StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#faf5ff', // light purple-pink
    padding: 32,
    fontFamily: 'Helvetica',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9333ea', // purple-600
    marginBottom: 2,
  },
  headline: {
    fontSize: 14,
    color: '#6b7280', // gray-500
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    flexWrap: 'wrap',
    gap: 6,
  },
  contactItem: {
    fontSize: 11,
    color: '#7c3aed', // purple-500
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 2,
    marginBottom: 2,
    border: '1pt solid #e9d5ff', // purple-100
  },
  link: {
    color: '#7c3aed',
    textDecoration: 'underline',
    fontSize: 11,
  },
  socialsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    gap: 10,
  },
  socialIcon: {
    width: 18,
    height: 18,
    marginRight: 4,
  },
  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    border: '1pt solid #e9d5ff',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a21caf', // purple-700
    marginBottom: 8,
  },
  sectionTitles: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a21caf', // purple-700
    marginBottom: 8,
    marginLeft: 5
  },
  badge: {
    backgroundColor: '#ede9fe', // purple-100
    color: '#7c3aed', // purple-500
    borderRadius: 10,
    fontSize: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
    display: 'flex'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    border: '1pt solid #e9d5ff',
  },
  expTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4c1d95', // purple-900
    marginBottom: 2
  },
  expDate: {
    fontSize: 10,
    color: '#6d28d9', // purple-700
    marginBottom: 2,
  },
  expCompany: {
    fontSize: 11,
    color: '#7c3aed', // purple-500
    marginBottom: 2,
  },
  expDesc: {
    fontSize: 10,
    color: '#6b7280', // gray-500
    marginBottom: 2,
  },
  interestRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 6,
  },
  interestBadge: {
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
    borderRadius: 10,
    fontSize: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default styles;