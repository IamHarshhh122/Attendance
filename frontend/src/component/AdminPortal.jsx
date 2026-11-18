import { useState, useEffect } from 'react';
import axios from 'axios';
import { COURSES, SEMESTERS, BATCHES } from '../data/options';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminPortal() {
  const [name, setName] = useState('');
  const [roll, setRoll] = useState('');
  const [dept, setDept] = useState('');
  const [semester, setSemester] = useState('');
  const [batch, setBatch] = useState('');
  const [students, setStudents] = useState([]);
  const [msg, setMsg] = useState(null);

  const loadStudents = async () => {
    try {
      const res = await axios.get(`${API}/students`);
      setStudents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/students`, {
        name,
        rollNo: roll,
        course: dept,
        semester: Number(semester),
        batch: Number(batch),
      });
      setMsg({ type: 'success', text: `${name} added successfully!` });
      setName('');
      setRoll('');
      setDept('');
      setSemester('');
      setBatch('');
      loadStudents();
    } catch (err) {
      setMsg({ type: 'error', text: err.response?.data?.error || 'Something went wrong' });
    }
  };

  const inputClass =
    'w-full rounded-xl border border-slate-700 bg-slate-800/70 px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20';
  const labelClass = 'mb-1 block text-xs font-bold uppercase tracking-wider text-slate-400';

  return (
    <div className="bg-gradient-to-br from-[#020617] via-[#0b1030] to-[#120c2e] px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Admin Portal</h1>
          <p className="mt-1 text-sm text-slate-400">Manage student profiles and university database records</p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          {/* Add student card */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur md:col-span-2">
            <h2 className="mb-4 text-lg font-bold text-white">Add New Student</h2>

            {msg && (
              <div
                className={`mb-4 rounded-xl border px-4 py-2.5 text-sm font-medium ${
                  msg.type === 'success'
                    ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                    : 'border-red-500/30 bg-red-500/10 text-red-300'
                }`}
              >
                {msg.text}
              </div>
            )}

            <form onSubmit={handleAddStudent} className="space-y-4">
              <div>
                <label className={labelClass}>Semester</label>
                <select className={inputClass} value={semester} onChange={(e) => setSemester(e.target.value)} required>
                  <option value="">Select semester</option>
                  {SEMESTERS.map((s) => (
                    <option key={s} value={s}>Semester {s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Batch</label>
                <select className={inputClass} value={batch} onChange={(e) => setBatch(e.target.value)} required>
                  <option value="">Select batch</option>
                  {BATCHES.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Student Name</label>
                <input className={inputClass} placeholder="e.g. Harsh Bhatta" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Roll Number</label>
                <input className={inputClass} placeholder="e.g. 24107024" value={roll} onChange={(e) => setRoll(e.target.value)} required />
              </div>
              <div>
                <label className={labelClass}>Course</label>
                <select className={inputClass} value={dept} onChange={(e) => setDept(e.target.value)} required>
                  <option value="">Select course</option>
                  {COURSES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-3 font-bold text-white shadow-lg shadow-amber-500/20 transition hover:from-amber-600 hover:to-orange-600 active:scale-95"
              >
                Add Student Record
              </button>
            </form>
          </div>

          {/* Students table */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl backdrop-blur md:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">All Enrolled Students</h2>
              <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-bold text-amber-300">
                {students.length} total
              </span>
            </div>

            <div className="max-h-[500px] overflow-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-sm">
                <thead className="sticky top-0 bg-slate-800 text-xs uppercase tracking-wider text-slate-300">
                  <tr>
                    <th className="px-4 py-3">Roll No</th>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Sem</th>
                    <th className="px-4 py-3">Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {students.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-4 py-8 text-center text-slate-500">
                        No students added yet.
                      </td>
                    </tr>
                  )}
                  {students.map((s) => (
                    <tr key={s._id} className="transition hover:bg-slate-800/60">
                      <td className="px-4 py-3 font-semibold text-slate-200">{s.rollNo}</td>
                      <td className="px-4 py-3 font-medium text-white">{s.name}</td>
                      <td className="px-4 py-3 text-slate-400">{s.course}</td>
                      <td className="px-4 py-3 text-slate-400">{s.semester}</td>
                      <td className="px-4 py-3 text-slate-400">{s.batch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}