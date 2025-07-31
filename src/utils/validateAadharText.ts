export function isValidAadhaarFront(text: string): boolean {
    const lower = text.toLowerCase();
    return (
        /\b\d{4}\s\d{4}\s\d{4}\b/.test(lower) &&
        lower.includes('government of india') &&
        (lower.includes('male') || lower.includes('female') || lower.includes('gender')) &&
        lower.includes('dob')
    );
}

export function isValidAadhaarBack(text: string): boolean {
    const lower = text.toLowerCase();
    return (
        /\b\d{4}\s\d{4}\s\d{4}\b/.test(lower) &&
        lower.includes('address')
    );
}
