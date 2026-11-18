import { useState } from 'react';
import axios from 'axios';

const API = 'https://attendance-ionia.onrender.com';

export default function StudentPortal() {
  const [rollNo, setRollNo] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setStudentData(null);
    setLoading(true);
    try {
      const response = await axios.get(`${API}/attendance/${rollNo}`);
      setStudentData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Student not found or no attendance records yet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950">
      {/* BEAUTIFUL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-600px] h-600px] bg-emerald-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 -right-32 w-500px] h-500px] bg-teal-400/15 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-1/4 w-450px] h-450px] bg-indigo-500/10 rounded-full blur-[110px]"></div>

        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #94a3b8 1px, transparent 1px),
                              linear-gradient(to bottom, #94a3b8 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 py-12">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 text-xs font-medium mb-5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Attendance Portal
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Student Attendance
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Dashboard
              </span>
            </h1>
            <p className="text-slate-400 mt-3 text-sm md:text-base max-w-md mx-auto">
              Check your semester-wise & subject-wise attendance percentages in real time
            </p>
          </div>

          {/* Search Form */}
          <form 
            onSubmit={handleSearch} 
            className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto mb-12 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          >
            <input
              type="text"
              placeholder="Enter Roll No (e.g. 24107024)"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="flex-1 px-5 py-3.5 bg-white/5 text-white placeholder-slate-400 rounded-xl outline-none border border-transparent focus:border-emerald-500/50 focus:bg-white/10 transition-all text-sm"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/25 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Searching...
                </span>
              ) : 'Check Status'}
            </button>
          </form>

          {/* Error */}
          {error && (
            <div className="max-w-xl mx-auto mb-8 bg-red-500/10 border border-red-500/20 text-red-300 px-5 py-4 rounded-2xl text-center text-sm backdrop-blur-sm">
              {error}
            </div>
          )}

          {/* Student Data */}
          {studentData && (
            <div className="space-y-8 animate-in fade-in duration-500">
              
              {/* Profile Card */}
              <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/10 shadow-2xl shadow-black/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                  <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                    <span className="px-3.5 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-semibold border border-indigo-500/30">
                      {studentData.course}
                    </span>
                    <span className="px-3.5 py-1 bg-amber-500/20 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
                      Semester {studentData.semester}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{studentData.name}</h2>
                  <p className="text-slate-400 text-sm mt-1.5">
                    Roll No: <span className="text-slate-200 font-medium">{studentData.rollNumber}</span>
                    <span className="mx-2 text-slate-600">•</span>
                    Batch: <span className="text-slate-200 font-medium">{studentData.batch}</span>
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl text-right min-w-[140px]">
                  <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Time Slot</p>
                  <p className="text-base font-semibold text-white mt-1">{studentData.slot || 'N/A'}</p>
                </div>
              </div>

              {/* Subject Breakdown */}
              <div>
                <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-2.5">
                  <span className="text-2xl">📚</span>
                  Semester {studentData.semester} — Subject-wise Breakdown
                </h3>

                {studentData.subjectSummary && studentData.subjectSummary.length === 0 ? (
                  <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-12 text-center text-slate-400 border border-white/10">
                    No attendance records marked yet for this semester.
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    {studentData.subjectSummary?.map((sub, index) => {
                      const percentVal = parseFloat(sub.percentage);
                      const isLow = percentVal < 75;
                      
                      return (
                        <div 
                          key={index} 
                          className="group relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-300 overflow-hidden"
                        >
                          {/* Left accent bar */}
                          <div className={`absolute top-0 left-0 bottom-0 w-1.5 ${isLow ? 'bg-amber-400' : 'bg-emerald-400'}`}></div>
                          
                          <h4 className="font-semibold text-white text-lg mb-4 pl-3">{sub.subject}</h4>
                          
                          <div className="flex justify-between items-end mb-4 pl-3">
                            <div>
                              <p className="text-xs text-slate-400 font-medium mb-1">Classes Attended</p>
                              <p className="text-sm font-semibold text-slate-200">
                                {sub.presentClasses} <span className="text-slate-500">/</span> {sub.totalClasses}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-slate-400 font-medium mb-1">Percentage</p>
                              <p className={`text-2xl font-bold ${isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {sub.percentage}
                              </p>
                            </div>
                          </div>

                          {/* Progress bar */}
                          <div className="w-full bg-white/10 h-2.5 rounded-full overflow-hidden ml-3">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ease-out ${
                                isLow 
                                  ? 'bg-gradient-to-r from-amber-500 to-amber-400' 
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                              }`}
                              style={{ width: sub.percentage }}
                            ></div>
                          </div>

                          {/* Low attendance warning */}
                          {isLow && (
                            <p className="text-xs text-amber-400/80 mt-3 pl-3 flex items-center gap-1.5">
                              <span>⚠️</span> Below 75% — Need improvement
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}