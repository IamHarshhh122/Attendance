import { useState } from 'react';
import axios from 'axios';
import { COURSES, SUBJECTS, SEMESTERS, SLOTS } from '../data/options';

const API = 'http://localhost:5000/api';

const FIRST_NAMES = ["Aarav", "Priya", "Rohan", "Sneha", "Amit", "Neha", "Vikas", "Anjali", "Deepak", "Pooja", "Manish", "Kajal", "Sahil", "Divya", "Rohit", "Simran", "Abhishek", "Megha", "Kunal", "Shreya", "Harsh", "Ritu", "Nikhil", "Tanya", "Akash"];
const LAST_NAMES = ["Sharma", "Verma", "Gupta", "Singh", "Kumar", "Mishra", "Yadav", "Tiwari", "Rawat", "Pandey", "Chaurasiya", "Jha", "Khan", "Chauhan", "Malhotra", "Kaur", "Thapa", "Joshi", "Roy", "Sen", "Bhatta", "Aggarwal", "Saxena", "Kapoor", "Meena"];

export default function FacultyPortal() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[14]);
  const [semester, setSemester] = useState('5');
  const [slot, setSlot] = useState('');
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState('');
  const [students, setStudents] = useState([]);
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successAnim, setSuccessAnim] = useState(false);
  const [msg, setMsg] = useState(null);
  const [signingRoll, setSigningRoll] = useState(null);

  const currentSubjects = SUBJECTS[selectedCourse] || [];

  const handleFetchStudents = async (e) => {
    e.preventDefault();
    if (!semester || !slot || !subject || !date) {
      alert("Please select Semester, Slot, Subject and Date first!");
      return;
    }
    setLoading(true);
    setMsg(null);
    setSuccessAnim(false);

    try {
      const res = await axios.get(`${API}/students?course=${encodeURIComponent(selectedCourse)}&semester=${semester}`);
      let fetchedStudents = res.data;
      
      if (!fetchedStudents || fetchedStudents.length === 0) {
        fetchedStudents = Array.from({ length: 25 }, (_, i) => {
          const num = i + 1;
          const formattedNum = num < 10 ? `0${num}` : `${num}`;
          return {
            _id: `dummy_${i}`,
            rollNo: `241070${formattedNum}`,
            name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3) % LAST_NAMES.length]}`,
            semester: Number(semester),
            course: selectedCourse
          };
        });
      }
      
      setStudents(fetchedStudents);
      const initialStatus = {};
      fetchedStudents.forEach(s => { initialStatus[s.rollNo] = 'Present'; });
      setAttendanceStatus(initialStatus);
      setMsg({ type: 'success', text: `Roster loaded • ${selectedCourse} • Semester ${semester}` });
    } catch (err) {
      const fallbackStudents = Array.from({ length: 25 }, (_, i) => {
        const num = i + 1;
        const formattedNum = num < 10 ? `0${num}` : `${num}`;
        return {
          _id: `dummy_${i}`,
          rollNo: `241070${formattedNum}`,
          name: `${FIRST_NAMES[i % FIRST_NAMES.length]} ${LAST_NAMES[(i * 3) % LAST_NAMES.length]}`,
          semester: Number(semester),
          course: selectedCourse
        };
      });
      setStudents(fallbackStudents);
      const initialStatus = {};
      fallbackStudents.forEach(s => { initialStatus[s.rollNo] = 'Present'; });
      setAttendanceStatus(initialStatus);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (rollNo, status) => {
    setAttendanceStatus(prev => ({ ...prev, [rollNo]: status }));
    if (status === 'Present') {
      setSigningRoll(rollNo);
      setTimeout(() => setSigningRoll(null), 900);
    }
  };

  const handleSubmitAll = async () => {
    setSubmitting(true);
    try {
      const payload = students.map(s => ({
        rollNumber: s.rollNo,
        semester: Number(semester),
        slot,
        subject,
        date,
        status: attendanceStatus[s.rollNo] || 'Present'
      }));
      await axios.post(`${API}/attendance/bulk`, { records: payload });
      setSubmitting(false);
      setSuccessAnim(true);
      setTimeout(() => {
        setSuccessAnim(false);
        setStudents([]);
        setSlot('');
        setSubject('');
        setMsg(null);
      }, 3200);
    } catch (err) {
      setSubmitting(false);
      setMsg({ type: 'error', text: err.response?.data?.error || 'Failed to submit bulk attendance' });
    }
  };

  const presentCount = Object.values(attendanceStatus).filter(s => s === 'Present').length;
  const absentCount = students.length - presentCount;

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[130px] animate-pulse-slow"></div>
        <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-violet-500/15 rounded-full blur-[110px]"></div>
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      {/* Success Animation */}
      {successAnim && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-white/10 p-10 rounded-3xl shadow-2xl flex flex-col items-center max-w-md w-full text-center animate-scale-in">
            <div className="relative w-52 h-32 mb-6">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 100">
                <path d="M20 60 Q 50 20 80 55 T 140 45 T 180 60" fill="none" stroke="#34d399" strokeWidth="3.5" strokeLinecap="round" className="signature-path"/>
              </svg>
              <div className="absolute top-6 left-2 animate-pen-write">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-emerald-400 drop-shadow-lg">
                  <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Attendance Signed!</h3>
            <p className="text-slate-400 text-sm">All records saved successfully</p>
          </div>
        </div>
      )}

      <div className="relative z-10 px-4 py-10">
        <div className="mx-auto max-w-5xl animate-fade-in">

          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/10">
                👨‍🏫
              </div>
              <div>
                <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest">Faculty Portal</p>
                <h1 className="text-3xl font-bold text-white tracking-tight">Class Attendance Manager</h1>
              </div>
            </div>
            <p className="text-slate-400 text-sm ml-15">Select parameters → Load roster → Mark attendance → Submit</p>
          </div>

          {msg && (
            <div className={`mb-6 rounded-2xl px-5 py-3.5 text-sm font-medium border backdrop-blur-sm animate-slide-down ${
              msg.type === 'success' 
                ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' 
                : 'bg-red-500/10 border-red-500/20 text-red-300'
            }`}>
              {msg.text}
            </div>
          )}

          {/* Parameters Card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 mb-8 shadow-2xl shadow-black/40 animate-slide-up">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              Class Parameters
            </h2>

            <form onSubmit={handleFetchStudents} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Course</label>
                <select className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-indigo-500/60 transition" value={selectedCourse} onChange={(e) => { setSelectedCourse(e.target.value); setSubject(''); }} required>
                  {COURSES.map((c) => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Semester</label>
                <select className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-indigo-500/60 transition" value={semester} onChange={(e) => setSemester(e.target.value)} required>
                  <option value="" className="bg-slate-900">Select Semester</option>
                  {SEMESTERS.map((s) => <option key={s} value={s} className="bg-slate-900">Semester {s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Time Slot</label>
                <select className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-indigo-500/60 transition" value={slot} onChange={(e) => setSlot(e.target.value)} required>
                  <option value="" className="bg-slate-900">Select Slot</option>
                  {SLOTS.map((sl) => <option key={sl} value={sl} className="bg-slate-900">{sl}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Subject</label>
                <select className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-indigo-500/60 transition" value={subject} onChange={(e) => setSubject(e.target.value)} required>
                  <option value="" className="bg-slate-900">Select Subject</option>
                  {currentSubjects.map((sub) => <option key={sub} value={sub} className="bg-slate-900">{sub}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1.5">Date</label>
                <input type="date" className="w-full rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3 text-sm outline-none focus:border-indigo-500/60 transition [color-scheme:dark]" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>

              <div className="flex items-end">
                <button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3.5 font-semibold text-white text-sm shadow-lg shadow-indigo-600/25 transition active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                      Loading...
                    </>
                  ) : 'Load Student Roster'}
                </button>
              </div>
            </form>
          </div>

          {students.length > 0 && (
            <div className="space-y-5 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 px-5 py-4">
                <div>
                  <h3 className="font-semibold text-white text-lg">{selectedCourse} • Sem {semester}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{subject} • {slot} • {date}</p>
                </div>
                <div className="flex items-center gap-5 text-sm">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span><span className="text-slate-300">{presentCount} Present</span></div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-400"></span><span className="text-slate-300">{absentCount} Absent</span></div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-white/5 text-slate-400 sticky top-0 backdrop-blur-md z-10">
                      <tr>
                        <th className="px-5 py-3.5 font-medium text-xs uppercase tracking-wider">Roll No</th>
                        <th className="px-5 py-3.5 font-medium text-xs uppercase tracking-wider">Student Name</th>
                        <th className="px-5 py-3.5 font-medium text-xs uppercase tracking-wider text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {students.map((s) => (
                        <tr key={s._id || s.rollNo} className="hover:bg-white/[0.03] transition">
                          <td className="px-5 py-3.5 font-mono text-slate-300 text-sm">{s.rollNo}</td>
                          <td className="px-5 py-3.5 text-white font-medium">{s.name}</td>
                          <td className="px-5 py-3.5 relative">
                            <div className="flex justify-center items-center gap-2">
                              <div className="inline-flex rounded-lg p-1 bg-white/5 border border-white/10 gap-1">
                                <button type="button" onClick={() => handleStatusChange(s.rollNo, 'Present')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${attendanceStatus[s.rollNo] === 'Present' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25' : 'text-slate-400 hover:text-white'}`}>
                                  Present
                                </button>
                                <button type="button" onClick={() => handleStatusChange(s.rollNo, 'Absent')} className={`px-4 py-1.5 rounded-md text-xs font-semibold transition-all ${attendanceStatus[s.rollNo] === 'Absent' ? 'bg-red-500 text-white shadow-md shadow-red-500/25' : 'text-slate-400 hover:text-white'}`}>
                                  Absent
                                </button>
                              </div>
                              {signingRoll === s.rollNo && (
                                <div className="absolute -right-1 top-1/2 -translate-y-1/2 animate-pen-sign pointer-events-none">
                                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-emerald-400">
                                    <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <button type="button" onClick={handleSubmitAll} disabled={submitting} className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-4 font-bold text-white text-base shadow-xl shadow-emerald-600/25 transition-all active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2">
                {submitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Saving...
                  </>
                ) : `Submit Attendance for ${students.length} Students`}
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.85); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        @keyframes signature-draw {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes pen-write {
          0% { transform: translate(0, 0) rotate(-15deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translate(150px, -10px) rotate(10deg); opacity: 1; }
        }
        @keyframes pen-sign {
          0% { transform: translateY(10px) scale(0.5) rotate(-25deg); opacity: 0; }
          40% { transform: translateY(-6px) scale(1.2) rotate(8deg); opacity: 1; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 0; }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-slide-up { animation: slide-up 0.7s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.4s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.4s ease-out forwards; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .signature-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: signature-draw 1.6s ease-out forwards;
        }
        .animate-pen-write { animation: pen-write 1.8s ease-out forwards; }
        .animate-pen-sign { animation: pen-sign 0.9s ease-out forwards; }
      `}</style>
    </div>
  );
}