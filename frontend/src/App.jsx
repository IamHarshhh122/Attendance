import { useState } from 'react';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import StudentPortal from './component/StudentPortal';
import FacultyPortal from './component/FacultyPortal';
import AdminPortal from './component/AdminPortal';

function App() {
  const [activeTab, setActiveTab] = useState('faculty');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex flex-1 flex-col [&>*]:flex-1">
        {activeTab === 'student' && <StudentPortal />}
        {activeTab === 'faculty' && <FacultyPortal />}
        {activeTab === 'admin' && <AdminPortal />}
      </main>

      <Footer />
    </div>
  );
}

export default App;