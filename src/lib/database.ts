import { promises as fs } from 'fs';
import path from 'path';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
  ipAddress?: string;
}

const DB_FILE = path.join(process.cwd(), 'data', 'contacts.json');

export async function saveContactSubmission(submission: Omit<ContactSubmission, 'id' | 'timestamp'>): Promise<ContactSubmission> {
  // Ensure data directory exists
  const dataDir = path.dirname(DB_FILE);
  try {
    await fs.mkdir(dataDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  // Create full submission object
  const fullSubmission: ContactSubmission = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    timestamp: new Date().toISOString(),
    ...submission
  };

  // Read existing submissions
  let submissions: ContactSubmission[] = [];
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    submissions = JSON.parse(data);
  } catch (error) {
    // File doesn't exist yet, start with empty array
    submissions = [];
  }

  // Add new submission
  submissions.push(fullSubmission);

  // Write back to file
  await fs.writeFile(DB_FILE, JSON.stringify(submissions, null, 2));

  return fullSubmission;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}
