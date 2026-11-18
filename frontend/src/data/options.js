export const COURSES = [
    'B.Com (H)',
    'B.Com',
    'B.M.S. (Bachelor of Management Studies)',
    'B.A. (H) Political Science',
    'B.A. (H) Hindi',
    'B.A. (H) English',
    'B.A. Programme',
    'B.Sc. (H) Statistics',
    'B.Sc. (H) Mathematics',
    'B.Sc. (H) Computer Science',
    'B.A. (H) Applied Psychology',
    'B.A. (H) Philosophy',
    'B.A. (H) Economics',
    'B.Voc. Banking Operations',
    'B.Voc. Software Development',
    'B.Sc. (H) Environmental Science',
  ];
  
  export const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Batches 2015 to 2026 (latest first)
  export const BATCHES = Array.from({ length: 12 }, (_, i) => 2026 - i);
  
  export const SLOTS = [
    '8:00 - 9:00 AM',
    '9:00 - 10:00 AM',
    '10:00 - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 - 1:00 PM',
    '1:00 - 2:00 PM',
    '2:00 - 3:00 PM',
    '3:00 - 4:00 PM',
    '4:00 - 5:00 PM',
  ];
  
  // Core subjects per course (sample names, edit as per your syllabus)
  export const SUBJECTS = {
    'B.Com (H)': ['Financial Accounting', 'Business Law', 'Corporate Accounting', 'Business Statistics', 'Income Tax Law'],
    'B.Com': ['Financial Accounting', 'Business Law', 'Business Mathematics', 'Corporate Accounting', 'Auditing'],
    'B.M.S. (Bachelor of Management Studies)': ['Principles of Management', 'Marketing Management', 'Human Resource Management', 'Financial Management', 'Business Communication'],
    'B.A. (H) Political Science': ['Political Theory', 'Indian Government and Politics', 'Comparative Politics', 'International Relations', 'Public Administration'],
    'B.A. (H) Hindi': ['Hindi Kavya', 'Hindi Gadya', 'Hindi Bhasha aur Vyakaran', 'Hindi Natak', 'Hindi Sahitya ka Itihas'],
    'B.A. (H) English': ['British Poetry and Drama', 'Indian Writing in English', 'Literary Criticism', 'American Literature', 'Modern European Drama'],
    'B.A. Programme': ['English', 'Hindi', 'Political Science', 'History', 'Economics'],
    'B.Sc. (H) Statistics': ['Descriptive Statistics', 'Probability Theory', 'Statistical Inference', 'Regression Analysis', 'Sampling Techniques'],
    'B.Sc. (H) Mathematics': ['Calculus', 'Linear Algebra', 'Real Analysis', 'Abstract Algebra', 'Differential Equations'],
    'B.Sc. (H) Computer Science': ['Programming Fundamentals', 'Data Structures', 'Database Management Systems', 'Operating Systems', 'Computer Networks'],
    'B.A. (H) Applied Psychology': ['Introduction to Psychology', 'Research Methods', 'Social Psychology', 'Clinical Psychology', 'Counselling Psychology'],
    'B.A. (H) Philosophy': ['Indian Philosophy', 'Western Philosophy', 'Logic', 'Ethics', 'Philosophy of Mind'],
    'B.A. (H) Economics': ['Microeconomics', 'Macroeconomics', 'Statistics for Economics', 'Indian Economy', 'Econometrics'],
    'B.Voc. Banking Operations': ['Banking Operations', 'Retail Banking', 'Financial Accounting', 'Banking Law', 'Credit Management'],
    'B.Voc. Software Development': ['Full Stack Web Development', 'Data Structures & Algorithms', 'Database Management Systems', 'Object Oriented Programming', 'Software Engineering'],
    'B.Sc. (H) Environmental Science': ['Ecology', 'Environmental Chemistry', 'Climate Change', 'Environmental Law', 'Waste Management'],
  };