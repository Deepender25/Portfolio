import { NextResponse } from 'next/server';
import { getContactSubmissions } from '@/lib/database';

export async function GET() {
  try {
    const submissions = await getContactSubmissions();
    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json({ message: 'Error fetching contact submissions' }, { status: 500 });
  }
}
