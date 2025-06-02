// Function to format dates from YYYY-MM to Month YYYY format
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'Present';
  
  try {
    // Handle YYYY-MM format
    if (/^\d{4}-\d{2}$/.test(dateString)) {
      const [year, month] = dateString.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    // Handle YYYY format (just the year)
    if (/^\d{4}$/.test(dateString)) {
      return dateString;
    }
    
    // Return as is if it's already formatted or in a different format
    return dateString;
  } catch (error) {
    // Return original string if there's an error in parsing
    return dateString;
  }
};