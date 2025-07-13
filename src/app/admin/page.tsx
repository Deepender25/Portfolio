import React, { useEffect, useState } from 'react';
import { ContactSubmission, getContactSubmissions } from '@/lib/database';

export default function AdminPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  useEffect(() => {
    (async () => {
      const submissions = await getContactSubmissions();
      setSubmissions(submissions);
    })();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contact Submissions</h1>
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="w-1/4 px-4 py-2">Name</th>
              <th className="w-1/4 px-4 py-2">Email</th>
              <th className="w-1/2 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub) => (
              <tr key={sub.id}>
                <td className="border px-4 py-2">{sub.name}</td>
                <td className="border px-4 py-2">{sub.email}</td>
                <td className="border px-4 py-2">{sub.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

