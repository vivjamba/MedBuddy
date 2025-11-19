"use client";

import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useMemo, useState, useEffect } from "react";
import { getClient } from "../fhirAuth";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Pill,
  Filter,
  SortAsc,
  Search,
} from "lucide-react";

function StatusBadge({ status }) {
  const map = {
    taken: {
      label: "Taken",
      className:
        "bg-green-100 text-green-800 ring-1 ring-green-300",
      Icon: CheckCircle2,
    },
    missed: {
      label: "Missed",
      className:
        "bg-red-100 text-red-800 ring-1 ring-red-300",
      Icon: AlertCircle,
    },
    upcoming: {
      label: "Upcoming",
      className:
        "bg-blue-100 text-blue-800 ring-1 ring-blue-300",
      Icon: Clock,
    },
  };
  const { label, className, Icon } = map[status] || map.upcoming;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {label}
    </span>
  );
}

function StatChip({ icon: Icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[var(--background)]/60 px-3 py-1.5 text-xs font-medium ring-1 ring-[var(--foreground)]/10 dark:bg-[var(--background)]/30">
      <Icon className="h-3.5 w-3.5 text-[var(--foreground)]/80" />
      <span className="text-[var(--foreground)]/80">{label}</span>
    </span>
  );
}

const MedicationsPage = () => {
  const [medications, setMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const client = await getClient();
        if (!client) return;

        let patient;
        if (client.patient && client.patient.id) {
          patient = await client.patient.read();
        } else if (client.user?.fhirUser) {
          patient = await client.request(client.user.fhirUser);
        }

        const bundle = await client.request(
          `MedicationRequest?patient=${patient.id}`,
          { flat: false }
        );

        if (!bundle?.entry?.length) {
          setMedications([]);
          return;
        }

        const parsed = bundle.entry.filter((entry) => entry.resource.status === "active").map((entry) => {
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
            dosage: dose || "N/A",
            instructions: dosage?.text || "No specific instructions.",
            timing: timeOfDay || frequency || "No timing info",
            nextDose: "N/A",
            status: "upcoming",
          };
        });

        setMedications(parsed);
      } catch (err) {
        console.error("Error fetching medications:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const [sortBy, setSortBy] = useState("time");
  const [filterStatus, setFilterStatus] = useState("all");
  const [q, setQ] = useState("");

  const takenCount = useMemo(() => medications.filter((m) => m.status === "taken").length, [medications]);
  const missedCount = useMemo(() => medications.filter((m) => m.status === "missed").length, [medications]);
  const upcomingCount = useMemo(() => medications.filter((m) => m.status === "upcoming" ).length, [medications]);

  const filteredSorted = useMemo(() => {
    let list = [...medications];
    if (filterStatus === "active") list = list.filter((m) => m.status !== "taken");
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(s) ||
          m.dosage.toLowerCase().includes(s) ||
          m.instructions.toLowerCase().includes(s)
      );
    }
    if (sortBy === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    else {
      const order = { missed: 0, upcoming: 1, taken: 2 };
      list.sort((a, b) => order[a.status] - order[b.status]);
    }
    return list;
  }, [medications, filterStatus, sortBy, q]);

  const logDose = (id) => {
    setMedications((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: "taken" } : m))
    );
  };

  const todayStr = useMemo(
    () =>
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    []
  );

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-[var(--foreground)]/70">
        Loading medications...
      </div>
    );

  if (medications.length === 0)
    return (
      <div className="flex items-center justify-center h-screen text-[var(--foreground)]/70">
        No medications found
      </div>
    );

  return (
    <div className="app bg-[var(--background)] text-[var(--foreground)]">
      <Header></Header>

      <main className="main">
        <div className="main-inner text-left">
          <h1 className="title text-[var(--foreground)]">My Medications</h1>
          <p className="subtitle text-[var(--foreground)]/70">{todayStr}</p>

          <div className="stats flex gap-2 flex-wrap my-4">
            <StatChip icon={CheckCircle2} label={`${takenCount} Taken`} />
            <StatChip icon={AlertCircle} label={`${missedCount} Missed`} />
            <StatChip icon={Clock} label={`${upcomingCount} Upcoming`} />
          </div>

          <div className="filters flex gap-2 flex-wrap mb-6">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--foreground)]/50" />
              <input
                id="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name, dosage, instruction…"
                className="w-full rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] px-8 py-2 text-sm outline-none placeholder:text-[var(--foreground)]/50 focus:border-[var(--foreground)]/30 focus:ring-2 focus:ring-[var(--foreground)]/10"
              />
            </div>

            <button
              onClick={() => setSortBy((s) => (s === "time" ? "name" : "time"))}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] px-3 py-2 text-sm hover:bg-[var(--foreground)]/5 text-[var(--foreground)]"
            >
              <SortAsc className="h-4 w-4" /> Sort:{" "}
              {sortBy === "time" ? "By Time" : "By Name"}
            </button>

            <button
              onClick={() => setFilterStatus((f) => (f === "all" ? "active" : "all"))}
              className="inline-flex items-center gap-2 rounded-lg border border-[var(--foreground)]/10 bg-[var(--background)] px-3 py-2 text-sm hover:bg-[var(--foreground)]/5 text-[var(--foreground)]"
            >
              <Filter className="h-4 w-4" />{" "}
              {filterStatus === "all" ? "All Medications" : "Active Only"}
            </button>
          </div>

          <div className="medication-table overflow-x-auto border border-[var(--foreground)]/10 rounded-xl bg-[var(--background)]">
            <table className="w-full text-sm border-collapse">
              <thead className="bg-[var(--foreground)]/5">
                <tr>
                  <th className="text-left p-3 text-[var(--foreground)]">Medication</th>
                  <th className="text-left p-3 text-[var(--foreground)]">Instructions</th>
                  <th className="text-left p-3 text-[var(--foreground)]">Timing</th>
                  <th className="text-left p-3 text-[var(--foreground)]">Next Dose</th>
                  <th className="text-left p-3 text-[var(--foreground)]">Status</th>
                  <th className="text-right p-3 text-[var(--foreground)]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSorted.map((m) => (
                  <tr
                    key={m.id}
                    className="border-t border-[var(--foreground)]/10 hover:bg-[var(--foreground)]/5"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 ring-1 ring-inset ring-blue-200">
                          <Pill className="h-4 w-4 text-blue-600" />
                        </span>
                        <div>
                          <div className="font-medium text-[var(--foreground)]">
                            {m.name}
                          </div>
                          <div className="text-[var(--foreground)]/70">{m.dosage}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 text-[var(--foreground)]/70">{m.instructions}</td>
                    <td className="p-3 text-[var(--foreground)]/70">{m.timing}</td>
                    <td className="p-3 text-[var(--foreground)]">{m.nextDose}</td>
                    <td className="p-3">
                      <StatusBadge status={m.status} />
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => logDose(m.id)}
                        disabled={m.status === "taken"}
                        className={`inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-sm font-medium ring-1 ring-inset transition disabled:opacity-60 disabled:cursor-not-allowed ${
                          m.status === "taken"
                            ? "bg-transparent ring-[var(--foreground)]/10 hover:bg-[var(--foreground)]/10"
                            : "bg-[var(--foreground)] text-[var(--background)] hover:opacity-90"
                        }`}
                      >
                        {m.status === "taken" ? "Logged" : "Log dose"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default MedicationsPage;
