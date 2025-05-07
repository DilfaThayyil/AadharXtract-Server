export const extractAadhaarDetails = (frontText: string, backText: string) => {
    const nameMatch = frontText.match(/(?<=Name\s*[:\-]?\s*)([A-Z][a-z]+\s[A-Z][a-z]+)/);
    const dobMatch = frontText.match(/\d{2}\/\d{2}\/\d{4}/);
    const genderMatch = frontText.match(/\b(Male|Female|MALE|FEMALE|Other)\b/i);
    const aadhaarMatch = frontText.match(/\d{4}\s\d{4}\s\d{4}/);
  
    return {
      name: nameMatch?.[1] || '',
      dob: dobMatch?.[0] || '',
      gender: genderMatch?.[0] || '',
      aadhaarNumber: aadhaarMatch?.[0]?.replace(/\s/g, '') || '',
      address: backText,
      frontText,
      backText
    };
  };
  