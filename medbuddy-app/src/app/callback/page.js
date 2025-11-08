"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FHIR from 'fhirclient';

export default function CallbackPage() {
  const router = useRouter();
  const [patientName, setPatientName] = useState('Patient');

  // Helper to format FHIR HumanName
  const formatName = (nameArray) => {
    if (!Array.isArray(nameArray) || nameArray.length === 0) return 'Patient';
    const name = nameArray[0];
    const prefix = name.prefix?.join(' ') || '';
    const given = name.given?.join(' ') || '';
    const family = name.family || '';
    return [prefix, given, family].filter(Boolean).join(' ');
  };

  useEffect(() => {
    (async () => {
      try {
        const client = await FHIR.oauth2.ready();

        let patient;

        // Only read patient if client.patient exists and has an id
        if (client.patient && client.patient.id) {
          patient = await client.patient.read();
        } else if (client.user?.fhirUser) {
          // Standalone launch: use fhirUser
          patient = await client.request(client.user.fhirUser);
        } else {
          throw new Error('No patient context available');
        }

        setPatientName(formatName(patient.name));
        router.replace('/'); // redirect to home
      } catch (err) {
        console.error('FHIR login failed', err);
      }
    })();
  }, [router]);

  return <div>Welcome, {patientName}</div>;
}
