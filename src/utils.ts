export const redactPII = (text: string): string => {
  // Simple PII redaction: emails, phone numbers
  return text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, "[EMAIL REDACTED]")
    .replace(/\+?(\d{1,3})?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})/g, "[PHONE REDACTED]");
};
