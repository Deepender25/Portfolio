export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  ipAddress?: string;
}

// In-memory storage for deployment (replace with proper database in production)
let contactSubmissions: ContactSubmission[] = [];

export async function saveContactSubmission(submission: Omit<ContactSubmission, 'id' | 'timestamp'>): Promise<ContactSubmission> {
  // Create full submission object
  const fullSubmission: ContactSubmission = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    ...submission
  };

  // Add to in-memory storage
  contactSubmissions.push(fullSubmission);

  // Keep only last 100 submissions to prevent memory issues
  if (contactSubmissions.length > 100) {
    contactSubmissions = contactSubmissions.slice(-100);
  }

  return fullSubmission;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  return contactSubmissions;
}
