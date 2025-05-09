export const extractAadhaarDetails = (frontText: string, backText: string) => {
  const combinedText = `${frontText}\n${backText}`;

  const aadhaarMatch = combinedText.match(/\d{4}\s\d{4}\s\d{4}/);
  const dobMatch = combinedText.match(/\d{2}\/\d{2}\/\d{4}/);
  const genderMatch = combinedText.match(/\b(Male|Female|Other|MALE|FEMALE|OTHER)\b/i);

  const frontLines = frontText.split('\n').map(line => line.trim()).filter(Boolean);

  let name = '';
  for (let i = 0; i < frontLines.length; i++) {
    const line = frontLines[i];
    if (
      !line.match(/government of india/i) &&
      !line.match(/भारत सरकार|आधार|uidai|gov\.in|www|help|india|संपर्क/i) &&
      !line.match(/\d{2}\/\d{2}\/\d{4}/) &&
      !line.match(/\d{4}\s\d{4}\s\d{4}/) &&
      !line.match(/male|female|other|जन्म/i)
    ) {
      name = line;
      break;
    }
  }

  const backLines = backText.split('\n').map(line => line.trim()).filter(Boolean);
  const filteredAddressLines = backLines.filter(line =>
    !line.match(/government of india|uidai|gov\.in|help|www|आधार|भारत सरकार|identification authority/i) &&
    !line.match(/भारतीय विशिष्ट पहचान प्राधिकरण|unique identification authority of india/i) &&
    !line.match(/पता[:：]?\s*$/i) &&
    !line.match(/\d{4}\s\d{4}\s\d{4}/) &&
    !line.match(/\d{2}\/\d{2}\/\d{4}/) &&
    !line.match(/male|female|other|जन्म|DOB|@|WWW|1947|1800|customer|toll\s*free/i)
  );
  

  const address = filteredAddressLines.join(', ');

  return {
    name,
    dob: dobMatch?.[0] || '',
    gender: genderMatch?.[0] || '',
    aadhaarNumber: aadhaarMatch?.[0]?.replace(/\s/g, '') || '',
    address,
    frontText,
    backText
  };
};
