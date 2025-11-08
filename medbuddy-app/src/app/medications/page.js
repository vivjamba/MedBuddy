"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getClient } from "../fhirAuth";
import { format } from "date-fns";
import { Clock, ArrowLeft } from "lucide-react";

export default function MedicationsPage() {
  const [medications, setMedications] = useState([]);
  const [patientName, setPatientName] = useState("");
  const [loading, setLoading] = useState(true);

  // Helper to format FHIR HumanName
  const formatName = (nameArray) => {
    if (!Array.isArray(nameArray) || nameArray.length === 0) return "Patient";
    const name = nameArray[0];
    const prefix = name.prefix?.join(" ") || "";
    const given = name.given?.join(" ") || "";
    const family = name.family || "";
    return [prefix, given, family].filter(Boolean).join(" ");
  };

  useEffect(() => {
    (async () => {
      try {
        const client = await getClient();
        if (!client) return;

        // ✅ Get patient info
        let patient;
        if (client.patient && client.patient.id) {
          patient = await client.patient.read();
        } else if (client.user?.fhirUser) {
          patient = await client.request(client.user.fhirUser);
        }
        if (patient) setPatientName(formatName(patient.name));

        // ✅ Fetch MedicationRequest for patient
        const bundle = await client.request(
          `MedicationRequest?patient=${patient.id}`,
          { flat: false }
        );

        console.log("FHIR MedicationRequest bundle:", bundle);

        if (!bundle?.entry?.length) {
          console.warn("No medications found for patient.");
          setMedications([]);
          return;
        }

        const parsed = bundle.entry.map((entry) => {
          const med = entry.resource;
          const medName =
            med.medicationCodeableConcept?.text ||
            med.medicationCodeableConcept?.coding?.[0]?.display ||
            "Unknown Medication";

          const dosage = med.dosageInstruction?.[0];
          const dose =
            dosage?.doseAndRate?.[0]?.doseQuantity?.value &&
            dosage?.doseAndRate?.[0]?.doseQuantity?.unit
              ? `${dosage.doseAndRate[0].doseQuantity.value} ${dosage.doseAndRate[0].doseQuantity.unit}`
              : "";

          const timing = dosage?.timing?.repeat;
          const timeOfDay = timing?.timeOfDay?.join(", ");
          const frequency =
            timing?.frequency && timing?.period
              ? `${timing.frequency}× every ${timing.period} ${timing.periodUnit}`
              : "";

          return {
            id: med.id,
            name: medName,
            dose,
            timing: timeOfDay || frequency,
            instruction: dosage?.text || "No specific instructions.",
            status: med.status || "active",
          };
        });

        console.log("Parsed medications:", parsed);
        setMedications(parsed);
      } catch (err) {
        console.error("Error fetching medications:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading medications...
      </div>
    );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* 🏠 Back to Home Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-700 bg-white border border-gray-200 rounded-xl px-4 py-2 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-semibold mb-2">My Medications</h1>
        <p className="text-gray-600 mb-6">{patientName}</p>

        {medications.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            No medications found for this patient.
          </div>
        ) : (
          <div className="space-y-4">
            {medications.map((med) => (
              <div
                key={med.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h2 className="font-semibold text-lg">{med.name}</h2>
                    {med.dose && (
                      <p className="text-gray-500 text-sm">{med.dose}</p>
                    )}
                  </div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      med.status === "active"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {med.status}
                  </span>
                </div>

                <p className="text-gray-700 text-sm mb-2">
                  {med.instruction}
                </p>

                {med.timing && (
                  <div className="flex items-center text-gray-600 text-sm mb-3">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{med.timing}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t pt-3 mt-3">
                  <span className="text-sm text-gray-500">
                    Next dose: {format(new Date(), "EEEE 'at' p")}
                  </span>
                  <button className="bg-black text-white text-sm px-4 py-2 rounded-xl hover:bg-gray-800 transition">
                    Log Dose
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
