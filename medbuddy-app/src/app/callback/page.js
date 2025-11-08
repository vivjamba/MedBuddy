"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FHIR from 'fhirclient';

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const client = await FHIR.oauth2.ready();
        router.replace('/'); // redirect to home
      } catch (err) {
        console.error('FHIR login failed', err);
      }
    })();
  }, [router]);
}
