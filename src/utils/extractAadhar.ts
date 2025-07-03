export const extractAadhaarDetails = (frontText: string, backText: string) => {
  const combinedText = `${frontText}\n${backText}`;

  const aadhaarMatch = combinedText.match(/\d{4}\s\d{4}\s\d{4}/);
  const dobMatch = combinedText.match(/\d{2}\/\d{2}\/\d{4}/);
  const genderMatch = combinedText.match(/\b(Male|Female|Other|MALE|FEMALE|OTHER)\b/i);

  const frontLines = frontText.split('\n').map(line => line.trim()).filter(Boolean);
  const backLines = backText.split('\n').map(line => line.trim()).filter(Boolean);

  const NOISE_PATTERNS = [
    /government of india/i,
    /uidai/i,
    /gov\.in/i,
    /help/i,
    /www/i,
    /आधार/i,
    /भारत सरकार/i,
    /unique identifica/i,
    /identification authority/i,
    /भारतीय विशिष्ट पहचान प्राधिकरण/i,
    /अधिकरण/i,
    /वरिष्ट/i,
    /QR Code with Photograph/i,
    /VID/i,
    /^पता[:：]?\s*$/i,
    /^address[:：]?\s*$/i,
    /^\d{1,3}$/,
    /\d{4}\s\d{4}\s\d{4}/,
    /\d{2}\/\d{2}\/\d{4}/,
    /male|female|other|जन्म|DOB|@|WWW|1947|1800|customer|toll\s*free/i,
    /uthority of india/i,
    /AADHAAR/i,
    /સરનામું/i,
    /आधार पहचान का प्रमाण/i,
    /Aadhaar is a proof of identity/i
  ];

  const isNoise = (line: string) => NOISE_PATTERNS.some(pattern => pattern.test(line));

  // --- Name Extraction ---
  let name = '';
  for (let i = 0; i < frontLines.length - 1; i++) {
    const current = frontLines[i];
    const next = frontLines[i + 1];

    const isHindi = /[^\x00-\x7F]/.test(current);
    const isLikelyName = /^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+(?:\s+[A-Z][a-zA-Z]+)?$/.test(next);

    if (isHindi && isLikelyName && !isNoise(next)) {
      name = next;
      break;
    }
  }

  if (!name) {
    const candidates = frontLines.filter(line =>
      /^[A-Z][a-zA-Z]+\s+[A-Z][a-zA-Z]+/.test(line) && !isNoise(line)
    );
    name = candidates[0] || '';
  }

  // --- Address Extraction ---
  const personNameWords = name.toLowerCase().split(' ');

  const cleanBackLines = backLines
    .filter(line => !isNoise(line))
    .filter(line => line.length > 4)
    .filter(line => !personNameWords.some(word => line.toLowerCase().includes(word)))
    .map(line => line.replace(/[,;]$/, '').trim());

  const englishStart = backLines.findIndex(line => /address[:：]?\s*/i.test(line));
  const englishBlock = englishStart >= 0
    ? backLines.slice(englishStart + 1, englishStart + 8).filter(line => !isNoise(line))
    : [];

  const finalAddressLines = englishBlock.length >= 2 ? englishBlock : cleanBackLines;
  const address = finalAddressLines.join(', ');

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
