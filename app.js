/**
 * Apex Global University - Assignment Submission & Academic Tracking System
 * Pure Vanilla JavaScript (ES6+): LocalStorage, File API, Drag & Drop, DOM, Dates
 */

// =============================================================================
// 1. INITIALIZATION & DATA SEEDING (Multi-User LocalStorage DB)
// =============================================================================

const STORAGE_KEYS = {
  USERS: 'apex_uni_users',
  COURSES: 'apex_uni_courses',
  ASSIGNMENTS: 'apex_uni_assignments',
  SUBMISSIONS: 'apex_uni_submissions',
  NOTIFICATIONS: 'apex_uni_notifications',
  CURRENT_USER: 'apex_uni_current_user',
  THEME: 'apex_uni_theme'
};

// Seed Data for First-Time Run
function initDatabase() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const seedUsers = [
      {
        id: 'usr_fac_1',
        name: 'Dr. Ramesh Sharma',
        email: 'teacher@univ.edu',
        password: 'password123', // Min 8 chars
        role: 'teacher',
        facultyId: 'FAC-101',
        designation: 'Professor & Head',
        department: 'Computer Science & Engineering'
      },
      {
        id: 'usr_fac_2',
        name: 'Prof. Sunita Rao',
        email: 'sunita.rao@univ.edu',
        password: 'password123',
        role: 'teacher',
        facultyId: 'FAC-102',
        designation: 'Associate Professor',
        department: 'Information Technology'
      },
      {
        id: 'usr_std_1',
        name: 'Rahul Verma',
        email: 'student@univ.edu',
        password: 'password123', // Min 8 chars
        role: 'student',
        rollNo: '2026BCSE042',
        department: 'Computer Science & Engineering',
        semester: '5th Semester'
      },
      {
        id: 'usr_std_2',
        name: 'Ananya Sen',
        email: 'ananya.s@univ.edu',
        password: 'password123',
        role: 'student',
        rollNo: '2026BCSE043',
        department: 'Computer Science & Engineering',
        semester: '5th Semester'
      },
      {
        id: 'usr_std_3',
        name: 'Karan Mehra',
        email: 'karan.m@univ.edu',
        password: 'password123',
        role: 'student',
        rollNo: '2026BCSE044',
        department: 'Computer Science & Engineering',
        semester: '5th Semester'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(seedUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.COURSES)) {
    const seedCourses = [
      {
        id: 'crs_101',
        code: 'CSE-301',
        title: 'Modern Web Technologies & Client Frameworks',
        department: 'Computer Science & Engineering',
        color: '#1e3a8a',
        teacherId: 'usr_fac_1'
      },
      {
        id: 'crs_102',
        code: 'CSE-302',
        title: 'Database Management Systems & SQL',
        department: 'Computer Science & Engineering',
        color: '#0d9488',
        teacherId: 'usr_fac_1'
      },
      {
        id: 'crs_103',
        code: 'CSE-303',
        title: 'Design and Analysis of Algorithms',
        department: 'Computer Science & Engineering',
        color: '#7c3aed',
        teacherId: 'usr_fac_2'
      }
    ];
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(seedCourses));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS)) {
    const now = new Date();
    // Deadlines: One due in 4 hours, one due in 3 days, one expired 2 days ago
    const dueSoon = new Date(now.getTime() + 4 * 60 * 60 * 1000).toISOString();
    const dueLater = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const pastDue = new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString();

    const seedAssignments = [
      {
        id: 'asg_501',
        courseId: 'crs_101',
        title: 'Lab 4: Accessible Responsive Navigation & DOM',
        type: 'Lab Task',
        maxMarks: 20,
        dueDate: dueSoon,
        description: 'Design a responsive navigation header utilizing Semantic HTML5 and CSS Flexbox. Implement dark/light theme switching with JavaScript and LocalStorage persistence.',
        refLink: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/nav',
        createdBy: 'usr_fac_1',
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'asg_502',
        courseId: 'crs_102',
        title: 'Assignment 2: Schema Design & Complex SQL Subqueries',
        type: 'Theory Assignment',
        maxMarks: 25,
        dueDate: dueLater,
        description: 'Create an ER diagram and normalized 3NF schema for an e-commerce inventory system. Provide 5 SQL queries with JOINs and window functions.',
        refLink: 'https://en.wikipedia.org/wiki/Third_normal_form',
        createdBy: 'usr_fac_1',
        createdAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'asg_503',
        courseId: 'crs_103',
        title: 'Lab 1: Divide and Conquer & Merge Sort Performance',
        type: 'Lab Task',
        maxMarks: 15,
        dueDate: pastDue,
        description: 'Implement Merge Sort in JavaScript or C++. Provide a benchmarking report comparing runtime on arrays with 1,000, 10,000, and 100,000 elements.',
        refLink: '',
        createdBy: 'usr_fac_2',
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(seedAssignments));
  }

  if (!localStorage.getItem(STORAGE_KEYS.SUBMISSIONS)) {
    const seedSubmissions = [
      {
        id: 'sub_901',
        assignmentId: 'asg_503',
        studentId: 'usr_std_1', // Rahul Verma
        studentName: 'Rahul Verma',
        studentRollNo: '2026BCSE042',
        submissionDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        submissionType: 'file',
        fileName: 'Rahul_Verma_MergeSort_Report.txt',
        fileData: 'data:text/plain;base64,TWVyZ2UgU29ydCBCZW5jaG1hcmtpbmcgUmVwb3J0IC0gQWxsIHRlc3QgY2FzZXMgcGFzc2VkLiBPKG4gbG9nIG4pIGNvbXBsZXhpdHkgdmVyaWZpZWQu',
        fileSize: '42.5 KB',
        remarks: 'Implemented Merge Sort recursively and plotted runtime graph.',
        isLate: false,
        reviewStatus: 'graded',
        marksObtained: 14,
        feedback: 'Excellent runtime complexity explanation. Clean code formatting.',
        reviewedAt: new Date().toISOString()
      },
      {
        id: 'sub_902',
        assignmentId: 'asg_503',
        studentId: 'usr_std_2', // Ananya Sen
        studentName: 'Ananya Sen',
        studentRollNo: '2026BCSE043',
        submissionDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // After pastDue!
        submissionType: 'link',
        linkUrl: 'https://github.com/ananya-sen/algorithms-lab-1',
        fileName: '',
        fileData: '',
        fileSize: '',
        remarks: 'Submitted via GitHub repository with automated test scripts.',
        isLate: true, // Auto late!
        reviewStatus: 'graded',
        marksObtained: 12,
        feedback: 'Great implementation, but 1-mark late penalty applied as per university policy.',
        reviewedAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(seedSubmissions));
  }

  // Migration: earlier seed data had a plain-text file named ".pdf" (opened as corrupted)
  try {
    const subs = JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]');
    let changed = false;
    subs.forEach(s => {
      if (s.id === 'sub_901' && /\.pdf$/i.test(s.fileName || '')) {
        s.fileName = 'Rahul_Verma_MergeSort_Report.txt';
        s.fileData = 'data:text/plain;base64,TWVyZ2UgU29ydCBCZW5jaG1hcmtpbmcgUmVwb3J0IC0gQWxsIHRlc3QgY2FzZXMgcGFzc2VkLiBPKG4gbG9nIG4pIGNvbXBsZXhpdHkgdmVyaWZpZWQu';
        changed = true;
      }
    });
    if (changed) localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(subs));
  } catch (e) { /* ignore */ }

  if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
    const seedNotifs = [
      {
        id: 'notif_1',
        userId: 'usr_std_1',
        title: 'Upcoming Deadline Alert',
        message: 'Lab 4: Accessible Responsive Navigation deadline is today!',
        time: new Date().toISOString(),
        unread: true
      },
      {
        id: 'notif_2',
        userId: 'usr_std_1',
        title: 'Assignment Graded',
        message: 'Your submission for Lab 1 has been graded: 14 / 15 Marks.',
        time: new Date().toISOString(),
        unread: false
      }
    ];
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(seedNotifs));
  }
}

// Global DB Getters & Setters
const DB = {
  getUsers: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]'),
  saveUsers: (data) => localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(data)),
  
  getCourses: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.COURSES) || '[]'),
  saveCourses: (data) => localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(data)),

  getAssignments: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.ASSIGNMENTS) || '[]'),
  saveAssignments: (data) => localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(data)),

  getSubmissions: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.SUBMISSIONS) || '[]'),
  saveSubmissions: (data) => localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(data)),

  getNotifications: () => JSON.parse(localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) || '[]'),
  saveNotifications: (data) => localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(data)),

  getCurrentUser: () => JSON.parse(sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 'null'),
  setCurrentUser: (user) => sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user)),
  clearCurrentUser: () => sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
};

// ---- Security helpers: never inject user text into innerHTML unescaped ----
function esc(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Only allow http/https links (blocks javascript: URLs)
function safeUrl(url) {
  try {
    const u = new URL(String(url || '').trim());
    return (u.protocol === 'http:' || u.protocol === 'https:') ? u.href : '';
  } catch (e) { return ''; }
}

// ---- File storage: IndexedDB (localStorage's ~5MB limit cannot hold uploads) ----
const FileStore = {
  _db: null,
  open() {
    if (this._db) return Promise.resolve(this._db);
    return new Promise((resolve, reject) => {
      if (!window.indexedDB) return reject(new Error('IndexedDB not supported'));
      const req = indexedDB.open('apex_uni_files', 1);
      req.onupgradeneeded = () => req.result.createObjectStore('files');
      req.onsuccess = () => { this._db = req.result; resolve(this._db); };
      req.onerror = () => reject(req.error);
    });
  },
  async put(id, blob) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const tx = db.transaction('files', 'readwrite');
      tx.objectStore('files').put(blob, id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  },
  async get(id) {
    const db = await this.open();
    return new Promise((resolve, reject) => {
      const req = db.transaction('files').objectStore('files').get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  },
  async remove(id) {
    try {
      const db = await this.open();
      db.transaction('files', 'readwrite').objectStore('files').delete(id);
    } catch (e) { /* ignore */ }
  }
};

function dataUrlToBlob(dataUrl) {
  const [header, payload] = dataUrl.split(',');
  const mime = (header.match(/^data:([^;,]*)/) || [])[1] || 'application/octet-stream';
  const bin = header.includes(';base64') ? atob(payload) : decodeURIComponent(payload);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new Blob([bytes], { type: mime });
}

// Returns the stored Blob for a submission (new IndexedDB files or legacy base64)
async function getSubmissionBlob(sub) {
  if (sub.fileId) {
    const blob = await FileStore.get(sub.fileId);
    if (blob) return blob;
  }
  if (sub.fileData) return dataUrlToBlob(sub.fileData);
  return null;
}

const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB
let previewObjectUrl = null;

// =============================================================================
// 2. STATE & GLOBAL VARIABLES
// =============================================================================
let activeAuthRole = 'student'; // 'student' or 'teacher'
let activeAuthMode = 'signin';   // 'signin' or 'signup'
let activeMainTab = 'dashboard'; // 'dashboard', 'assignments', 'students'
let selectedFileObject = null;
let currentCountdownInterval = null;

// =============================================================================
// 3. AUTHENTICATION & ROLE SWITCHING (Strict Single Error Rule)
// =============================================================================

function selectAuthRole(role) {
  activeAuthRole = role;
  
  // UI Tabs toggle
  document.getElementById('roleTabStudent').classList.toggle('active', role === 'student');
  document.getElementById('roleTabTeacher').classList.toggle('active', role === 'teacher');

  // Role specific form elements
  const isStudent = (role === 'student');
  document.getElementById('studentFieldsBlock').classList.toggle('hidden', !isStudent);
  document.getElementById('teacherFieldsBlock').classList.toggle('hidden', isStudent);

  // Label changes
  document.getElementById('lblIdentifier').textContent = isStudent 
    ? 'University Email or Roll Number' 
    : 'University Email or Faculty Employee ID';
  
  document.getElementById('btnSignInSubmit').textContent = isStudent 
    ? 'Sign In to Student Portal' 
    : 'Sign In to Faculty Portal';

  document.getElementById('btnSignUpSubmit').textContent = isStudent 
    ? 'Complete Student Registration' 
    : 'Complete Faculty Registration';

  document.getElementById('authSubtitle').textContent = isStudent
    ? 'Access student dashboard, deadlines, submission desk, and grades'
    : 'Manage university courses, post assignments, and evaluate submissions';

  hideAuthAlert();
}

function switchAuthMode(mode) {
  activeAuthMode = mode;
  document.getElementById('modeTabSignIn').classList.toggle('active', mode === 'signin');
  document.getElementById('modeTabSignUp').classList.toggle('active', mode === 'signup');

  document.getElementById('signInForm').classList.toggle('hidden', mode !== 'signin');
  document.getElementById('signUpForm').classList.toggle('hidden', mode !== 'signup');

  hideAuthAlert();
}

// Password Minimum 8-digit / Char Realtime Validation Rule
function checkPasswordRule(value) {
  const hintEl = document.getElementById('passwordRuleHint');
  if (value.length >= 8) {
    hintEl.className = 'password-hint valid';
    hintEl.innerHTML = '<span>✔</span> Password length verified (8+ characters)';
  } else {
    hintEl.className = 'password-hint invalid';
    hintEl.innerHTML = `<span>●</span> Must be at least 8 characters long (${value.length}/8)`;
  }
}

function togglePasswordVisibility(fieldId) {
  const input = document.getElementById(fieldId);
  input.type = input.type === 'password' ? 'text' : 'password';
}

function showAuthAlert(message, type = 'danger') {
  const alertEl = document.getElementById('authAlert');
  alertEl.className = `auth-alert auth-alert-${type}`;
  alertEl.innerHTML = `<span>${type === 'danger' ? '⚠️' : '✅'}</span> <div>${message}</div>`;
  alertEl.classList.remove('hidden');
}

function hideAuthAlert() {
  document.getElementById('authAlert').classList.add('hidden');
}

// SIGN IN PROCESS WITH STRICT SINGLE ERROR RULE:
// "Invalid username or password" for wrong role, wrong password, or user not found.
function processSignIn(e) {
  e.preventDefault();
  hideAuthAlert();

  const identifier = document.getElementById('signinIdentifier').value.trim();
  const password = document.getElementById('signinPassword').value;

  const users = DB.getUsers();

  // Strict check: User must match identifier, password AND active portal role
  const matchedUser = users.find(u => {
    const matchesId = (u.email.toLowerCase() === identifier.toLowerCase()) || 
                      (u.rollNo && u.rollNo.toLowerCase() === identifier.toLowerCase()) ||
                      (u.facultyId && u.facultyId.toLowerCase() === identifier.toLowerCase());
    return matchesId && (u.password === password) && (u.role === activeAuthRole);
  });

  if (!matchedUser) {
    // STRICT RULE: Kisi bhi failure par sirf yahi generic standard message aayega:
    showAuthAlert('Invalid username or password.');
    return;
  }

  // Success
  playChime();
  DB.setCurrentUser(matchedUser);
  showToast(`Welcome, ${matchedUser.name}!`, 'success');
  loadAppForCurrentUser();
}

// SIGN UP (REGISTRATION) PROCESS
function processSignUp(e) {
  e.preventDefault();
  hideAuthAlert();

  const fullName = document.getElementById('signupFullName').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const department = document.getElementById('signupDepartment').value;
  const password = document.getElementById('signupPassword').value;
  const confirmPassword = document.getElementById('signupConfirmPassword').value;

  // Strict 8-char validation
  if (password.length < 8) {
    showAuthAlert('Password must be at least 8 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    showAuthAlert('Passwords do not match. Please re-enter.');
    return;
  }

  const users = DB.getUsers();

  // Check duplicate email
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    showAuthAlert('An account with this institutional email already exists.');
    return;
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    name: fullName,
    email: email,
    password: password,
    department: department,
    role: activeAuthRole
  };

  if (activeAuthRole === 'student') {
    const rollNo = document.getElementById('signupRollNo').value.trim() || `2026BCSE${Math.floor(100 + Math.random() * 900)}`;
    const semester = document.getElementById('signupSemester').value;
    newUser.rollNo = rollNo;
    newUser.semester = semester;
  } else {
    const facultyId = document.getElementById('signupFacultyId').value.trim() || `FAC-${Math.floor(100 + Math.random() * 900)}`;
    const designation = document.getElementById('signupDesignation').value.trim() || 'Assistant Professor';
    newUser.facultyId = facultyId;
    newUser.designation = designation;
  }

  users.push(newUser);
  DB.saveUsers(users);

  playChime();
  showAuthAlert('Account created successfully! You can now sign in.', 'success');
  
  // Switch to sign in tab and pre-fill
  setTimeout(() => {
    switchAuthMode('signin');
    document.getElementById('signinIdentifier').value = email;
    document.getElementById('signinPassword').value = '';
    document.getElementById('signinPassword').focus();
  }, 1200);
}

// Quick Demo Login (One-click)
function quickFillDemo(role) {
  selectAuthRole(role);
  switchAuthMode('signin');
  if (role === 'student') {
    document.getElementById('signinIdentifier').value = 'student@univ.edu';
    document.getElementById('signinPassword').value = 'password123';
  } else {
    document.getElementById('signinIdentifier').value = 'teacher@univ.edu';
    document.getElementById('signinPassword').value = 'password123';
  }
}

function handleLogout() {
  DB.clearCurrentUser();
  showToast('You have successfully logged out.', 'info');
  document.getElementById('portalSection').classList.add('hidden');
  document.getElementById('navBar').classList.add('hidden');
  document.getElementById('notifWrapper').classList.add('hidden');
  document.getElementById('userProfilePill').classList.add('hidden');
  document.getElementById('authSection').classList.remove('hidden');
  
  if (currentCountdownInterval) {
    clearInterval(currentCountdownInterval);
  }
}

// =============================================================================
// 4. PORTAL APP LIFECYCLE & DASHBOARD RENDERING
// =============================================================================

function loadAppForCurrentUser() {
  const currentUser = DB.getCurrentUser();
  if (!currentUser) return;

  // Toggle sections
  document.getElementById('authSection').classList.add('hidden');
  document.getElementById('portalSection').classList.remove('hidden');
  document.getElementById('navBar').classList.remove('hidden');
  document.getElementById('notifWrapper').classList.remove('hidden');
  document.getElementById('userProfilePill').classList.remove('hidden');

  // Set Profile Information
  document.getElementById('userName').textContent = currentUser.name;
  document.getElementById('userAvatar').textContent = currentUser.name.charAt(0).toUpperCase();
  document.getElementById('userRoleTag').textContent = currentUser.role === 'teacher' ? 'Faculty' : `Student (${currentUser.rollNo || 'Roll'})`;

  // Set Banner
  document.getElementById('bannerGreeting').textContent = `Welcome back, ${currentUser.name}`;
  document.getElementById('bannerSubtext').textContent = currentUser.role === 'teacher'
    ? `${currentUser.designation || 'Faculty'} • Department of ${currentUser.department || 'CSE'}`
    : `Student Enrollment: ${currentUser.rollNo || 'N/A'} • ${currentUser.semester || '5th Sem'}`;
  document.getElementById('badgeDepartment').textContent = `Dept: ${currentUser.department || 'CSE'}`;

  // Teacher-Specific Header controls
  const isTeacher = (currentUser.role === 'teacher');
  document.getElementById('teacherActionGroup').classList.toggle('hidden', !isTeacher);
  document.getElementById('navStudentsBtn').classList.toggle('hidden', !isTeacher);

  // Setup Dynamic Labels for Metric Cards
  if (isTeacher) {
    document.getElementById('metric1Label').textContent = 'My Courses';
    document.getElementById('metric2Label').textContent = 'Submissions to Review';
    document.getElementById('metric3Label').textContent = 'Graded Submissions';
    document.getElementById('metric4Label').textContent = 'Late Submissions';
    document.getElementById('attentionHeading').textContent = 'Faculty Review Center';
    document.getElementById('attentionSubtext').textContent = 'Active coursework assignments requiring continuous assessment grading.';
  } else {
    document.getElementById('metric1Label').textContent = 'Registered Courses';
    document.getElementById('metric2Label').textContent = 'Pending Submissions';
    document.getElementById('metric3Label').textContent = 'Graded Assignments';
    document.getElementById('metric4Label').textContent = 'Overdue / Late';
    document.getElementById('attentionHeading').textContent = 'Upcoming Deadlines & Actions';
    document.getElementById('attentionSubtext').textContent = 'Prioritize assignments with active countdown timers.';
  }

  // Populate Course filter dropdowns
  populateCourseDropdowns();

  // Update Metrics & Render Content
  updateDashboardMetrics();
  renderAssignments();
  updateNotificationsUI();

  if (isTeacher) {
    renderStudentRoster();
  }

  // Start Live Countdown Engine
  startLiveDeadlineTicker();

  // Reset tab to dashboard
  switchMainTab('dashboard');
}

function switchMainTab(tab) {
  activeMainTab = tab;
  
  document.getElementById('navDashboardBtn').classList.toggle('active', tab === 'dashboard');
  document.getElementById('navAssignmentsBtn').classList.toggle('active', tab === 'assignments');
  document.getElementById('navStudentsBtn').classList.toggle('active', tab === 'students');

  document.getElementById('tabDashboard').classList.toggle('hidden', tab !== 'dashboard');
  document.getElementById('tabAssignments').classList.toggle('hidden', tab !== 'assignments');
  document.getElementById('tabStudents').classList.toggle('hidden', tab !== 'students');

  if (tab === 'students') {
    renderStudentRoster();
  } else if (tab === 'assignments') {
    renderAssignments();
  }
}

// Populate Course dropdowns in Filters and Modals
function populateCourseDropdowns() {
  const courses = DB.getCourses();
  const filterSelect = document.getElementById('filterCourse');
  const asgSelect = document.getElementById('asgCourseSelect');

  filterSelect.innerHTML = '<option value="all">All Courses</option>';
  asgSelect.innerHTML = '';

  courses.forEach(course => {
    // Filter dropdown
    const opt1 = document.createElement('option');
    opt1.value = course.id;
    opt1.textContent = `${course.code}: ${course.title}`;
    filterSelect.appendChild(opt1);

    // Create modal dropdown
    const opt2 = document.createElement('option');
    opt2.value = course.id;
    opt2.textContent = `${course.code}: ${course.title}`;
    asgSelect.appendChild(opt2);
  });
}

// Calculate Metric Numbers
function updateDashboardMetrics() {
  const currentUser = DB.getCurrentUser();
  if (!currentUser) return;

  const courses = DB.getCourses();
  const assignments = DB.getAssignments();
  const submissions = DB.getSubmissions();

  if (currentUser.role === 'teacher') {
    const myCourses = courses.filter(c => c.teacherId === currentUser.id);
    const myAssignments = assignments.filter(a => myCourses.some(c => c.id === a.courseId));
    const mySubmissions = submissions.filter(s => myAssignments.some(a => a.id === s.assignmentId));

    const pendingReviewCount = mySubmissions.filter(s => s.reviewStatus === 'pending').length;
    const gradedCount = mySubmissions.filter(s => s.reviewStatus === 'graded').length;
    const lateCount = mySubmissions.filter(s => s.isLate).length;

    document.getElementById('metric1Val').textContent = myCourses.length || courses.length;
    document.getElementById('metric2Val').textContent = pendingReviewCount;
    document.getElementById('metric3Val').textContent = gradedCount;
    document.getElementById('metric4Val').textContent = lateCount;
  } else {
    // Student Metrics
    const mySubmissions = submissions.filter(s => s.studentId === currentUser.id);
    const now = new Date();

    let pendingCount = 0;
    let gradedCount = 0;
    let lateOrOverdueCount = 0;

    assignments.forEach(asg => {
      const sub = mySubmissions.find(s => s.assignmentId === asg.id);
      if (sub) {
        if (sub.reviewStatus === 'graded') gradedCount++;
        if (sub.isLate) lateOrOverdueCount++;
      } else {
        pendingCount++;
        if (new Date(asg.dueDate) < now) {
          lateOrOverdueCount++;
        }
      }
    });

    document.getElementById('metric1Val').textContent = courses.length;
    document.getElementById('metric2Val').textContent = pendingCount;
    document.getElementById('metric3Val').textContent = gradedCount;
    document.getElementById('metric4Val').textContent = lateOrOverdueCount;
  }
}

// =============================================================================
// 5. ASSIGNMENTS RENDERING & DEADLINE COUNTDOWN ENGINE
// =============================================================================

function calculateTimeRemaining(dueDateString) {
  const total = Date.parse(dueDateString) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
}

function getDeadlineBadgeHTML(dueDateString) {
  const t = calculateTimeRemaining(dueDateString);
  const dueFormatted = new Date(dueDateString).toLocaleString('en-US', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
  });

  if (t.total <= 0) {
    return `<span class="deadline-highlight urgent" title="Deadline was ${dueFormatted}">
              ⚠️ Past Due / Closed
            </span>`;
  } else if (t.days === 0 && t.hours < 24) {
    return `<span class="deadline-highlight urgent" title="Due: ${dueFormatted}">
              ⏳ Due in ${t.hours}h ${t.minutes}m
            </span>`;
  } else if (t.days <= 2) {
    return `<span class="deadline-highlight warning" title="Due: ${dueFormatted}">
              ⏰ Due in ${t.days}d ${t.hours}h
            </span>`;
  } else {
    return `<span class="deadline-highlight normal" title="Due: ${dueFormatted}">
              📅 Due ${dueFormatted}
            </span>`;
  }
}

function renderAssignments() {
  const currentUser = DB.getCurrentUser();
  if (!currentUser) return;

  const courses = DB.getCourses();
  let assignments = DB.getAssignments();
  const submissions = DB.getSubmissions();

  // Search & Filter criteria
  const searchVal = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const filterCourseVal = document.getElementById('filterCourse')?.value || 'all';
  const filterStatusVal = document.getElementById('filterStatus')?.value || 'all';
  const sortOrder = document.getElementById('sortOrder')?.value || 'deadlineAsc';

  // Apply filters
  assignments = assignments.filter(asg => {
    const course = courses.find(c => c.id === asg.courseId);
    const courseText = course ? `${course.code} ${course.title}`.toLowerCase() : '';
    const matchesSearch = asg.title.toLowerCase().includes(searchVal) || courseText.includes(searchVal);
    const matchesCourse = (filterCourseVal === 'all') || (asg.courseId === filterCourseVal);

    let matchesStatus = true;
    if (filterStatusVal !== 'all') {
      if (currentUser.role === 'student') {
        const sub = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser.id);
        if (filterStatusVal === 'pending') matchesStatus = !sub;
        else if (filterStatusVal === 'submitted') matchesStatus = (sub && sub.reviewStatus === 'pending');
        else if (filterStatusVal === 'graded') matchesStatus = (sub && sub.reviewStatus === 'graded');
        else if (filterStatusVal === 'late') matchesStatus = (sub && sub.isLate);
      }
    }

    return matchesSearch && matchesCourse && matchesStatus;
  });

  // Apply Sort
  assignments.sort((a, b) => {
    if (sortOrder === 'deadlineAsc') return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortOrder === 'deadlineDesc') return new Date(b.dueDate) - new Date(a.dueDate);
    if (sortOrder === 'titleAsc') return a.title.localeCompare(b.title);
    return 0;
  });

  const fullGrid = document.getElementById('allAssignmentsGrid');
  const recentGrid = document.getElementById('recentAssignmentsGrid');

  if (fullGrid) fullGrid.innerHTML = '';
  if (recentGrid) recentGrid.innerHTML = '';

  if (assignments.length === 0) {
    const emptyMsg = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 0.5rem;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p style="font-weight: 600;">No assignments match your search or filter parameters.</p>
      </div>`;
    if (fullGrid) fullGrid.innerHTML = emptyMsg;
    if (recentGrid) recentGrid.innerHTML = emptyMsg;
    return;
  }

  assignments.forEach((asg, index) => {
    const course = courses.find(c => c.id === asg.courseId) || { code: 'UNIV', title: 'General Course', color: '#1e3a8a' };
    const cardHTML = generateAssignmentCardHTML(asg, course, currentUser, submissions);

    if (fullGrid) fullGrid.insertAdjacentHTML('beforeend', cardHTML);
    if (recentGrid && index < 3) {
      recentGrid.insertAdjacentHTML('beforeend', cardHTML);
    }
  });
}

function generateAssignmentCardHTML(asg, course, currentUser, submissions) {
  const isTeacher = (currentUser.role === 'teacher');
  const asgSubmissions = submissions.filter(s => s.assignmentId === asg.id);
  const studentSubmission = submissions.find(s => s.assignmentId === asg.id && s.studentId === currentUser.id);

  let statusBadgeHTML = '';
  let actionButtonHTML = '';

  if (isTeacher) {
    const pendingReview = asgSubmissions.filter(s => s.reviewStatus === 'pending').length;
    statusBadgeHTML = `<span class="badge ${pendingReview > 0 ? 'badge-warning' : 'badge-success'}">
      ${asgSubmissions.length} Submissions (${pendingReview} to review)
    </span>`;

    actionButtonHTML = `
      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" onclick="openSubmissionsDesk('${asg.id}')">
          Submissions Desk (${asgSubmissions.length})
        </button>
        <button class="icon-btn" title="Delete Assignment" style="width: 32px; height: 32px; color: var(--danger);" onclick="deleteAssignment('${asg.id}')">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>`;
  } else {
    // Student Status & Actions
    if (!studentSubmission) {
      const isPast = new Date() > new Date(asg.dueDate);
      statusBadgeHTML = isPast 
        ? '<span class="badge badge-danger">Overdue / Missing</span>' 
        : '<span class="badge badge-warning">Pending Submission</span>';

      actionButtonHTML = `
        <button class="btn btn-primary btn-sm" onclick="openSubmitWorkModal('${asg.id}')">
          Submit Work →
        </button>`;
    } else if (studentSubmission.reviewStatus === 'graded') {
      const marksBadge = `<span class="badge badge-success" style="font-size: 0.8rem;">
        Graded: ${studentSubmission.marksObtained} / ${asg.maxMarks}
      </span>`;
      statusBadgeHTML = `${marksBadge} ${studentSubmission.isLate ? '<span class="badge badge-danger">Late</span>' : ''}`;

      actionButtonHTML = `
        <button class="btn btn-outline btn-sm" onclick="openStudentViewGradeModal('${studentSubmission.id}')">
          View Result & Feedback
        </button>`;
    } else {
      // Submitted but pending review
      statusBadgeHTML = `<span class="badge badge-info">Submitted (Pending Review)</span> ${studentSubmission.isLate ? '<span class="badge badge-danger">Late</span>' : ''}`;
      actionButtonHTML = `
        <button class="btn btn-outline btn-sm" onclick="openSubmitWorkModal('${asg.id}')">
          Edit Submission
        </button>`;
    }
  }

  return `
    <article class="assignment-card">
      <div class="card-course-strip" style="background-color: ${course.color || '#1e3a8a'};"></div>
      <div class="card-header">
        <div>
          <span class="course-code-tag">${esc(course.code)}</span>
          <h3>${esc(asg.title)}</h3>
        </div>
        ${statusBadgeHTML}
      </div>

      <div class="card-body">
        <p class="card-description">${esc(asg.description)}</p>
        
        <div class="card-meta-list">
          <div class="card-meta-item">
            ${getDeadlineBadgeHTML(asg.dueDate)}
          </div>
          <div class="card-meta-item">
            <span>🎯 <strong>Max Marks:</strong> ${asg.maxMarks} • <strong>Type:</strong> ${esc(asg.type || 'Lab Task')}</span>
          </div>
          ${safeUrl(asg.refLink) ? `
            <div class="card-meta-item">
              <span>🔗 <a href="${esc(safeUrl(asg.refLink))}" target="_blank" rel="noopener noreferrer">Course Reference Material</a></span>
            </div>` : ''}
        </div>
      </div>

      <div class="card-footer">
        <span style="font-size: 0.78rem; color: var(--text-muted);">${esc(course.title)}</span>
        ${actionButtonHTML}
      </div>
    </article>
  `;
}

function startLiveDeadlineTicker() {
  if (currentCountdownInterval) {
    clearInterval(currentCountdownInterval);
  }
  // Refresh countdown badges every 30 seconds
  currentCountdownInterval = setInterval(() => {
    if (activeMainTab === 'dashboard' || activeMainTab === 'assignments') {
      renderAssignments();
    }
  }, 30000);
}

function handleFilterChange() {
  renderAssignments();
}

// =============================================================================
// 6. TEACHER FLOW: CREATE ASSIGNMENTS & COURSES
// =============================================================================

function openAddAssignmentModal() {
  populateCourseDropdowns();
  // Default due date: 3 days from now
  const defaultDue = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  defaultDue.setMinutes(defaultDue.getMinutes() - defaultDue.getTimezoneOffset());
  document.getElementById('asgDueDate').value = defaultDue.toISOString().slice(0, 16);
  openModal('modalAddAssignment');
}

function handleCreateAssignment(e) {
  e.preventDefault();
  const currentUser = DB.getCurrentUser();
  if (!currentUser || currentUser.role !== 'teacher') return;

  const courseId = document.getElementById('asgCourseSelect').value;
  const title = document.getElementById('asgTitle').value.trim();
  const type = document.getElementById('asgType').value;
  const maxMarks = parseInt(document.getElementById('asgMaxMarks').value, 10);
  const dueDate = new Date(document.getElementById('asgDueDate').value).toISOString();
  const description = document.getElementById('asgDescription').value.trim();
  const refLink = document.getElementById('asgRefLink').value.trim();

  const assignments = DB.getAssignments();
  const newAssignment = {
    id: `asg_${Date.now()}`,
    courseId,
    title,
    type,
    maxMarks,
    dueDate,
    description,
    refLink,
    createdBy: currentUser.id,
    createdAt: new Date().toISOString()
  };

  assignments.unshift(newAssignment);
  DB.saveAssignments(assignments);

  // Notify students
  createSystemNotificationForAllStudents(`New Assignment: ${title}`, `A new assignment has been published under course.`);

  playChime();
  closeModal('modalAddAssignment');
  showToast('Course assignment published successfully!', 'success');
  updateDashboardMetrics();
  renderAssignments();
}

function deleteAssignment(asgId) {
  if (!confirm('Are you sure you want to delete this assignment and all related submissions?')) return;

  let assignments = DB.getAssignments();
  assignments = assignments.filter(a => a.id !== asgId);
  DB.saveAssignments(assignments);

  let submissions = DB.getSubmissions();
  submissions.filter(s => s.assignmentId === asgId && s.fileId).forEach(s => FileStore.remove(s.fileId));
  submissions = submissions.filter(s => s.assignmentId !== asgId);
  DB.saveSubmissions(submissions);

  showToast('Assignment removed.', 'info');
  updateDashboardMetrics();
  renderAssignments();
}

function openAddCourseModal() {
  openModal('modalAddCourse');
}

function handleCreateCourse(e) {
  e.preventDefault();
  const currentUser = DB.getCurrentUser();
  if (!currentUser || currentUser.role !== 'teacher') return;

  const code = document.getElementById('crsCode').value.trim().toUpperCase();
  const title = document.getElementById('crsTitle').value.trim();
  const department = document.getElementById('crsDepartment').value.trim();
  const color = document.getElementById('crsColor').value;

  const courses = DB.getCourses();
  const newCourse = {
    id: `crs_${Date.now()}`,
    code,
    title,
    department,
    color,
    teacherId: currentUser.id
  };

  courses.push(newCourse);
  DB.saveCourses(courses);

  playChime();
  closeModal('modalAddCourse');
  showToast(`Course ${code} registered successfully!`, 'success');
  populateCourseDropdowns();
  updateDashboardMetrics();
  renderAssignments();
}

// =============================================================================
// 7. STUDENT FLOW: FILE / LINK SUBMISSION WITH AUTO-LATE DETECTION
// =============================================================================

function openSubmitWorkModal(asgId) {
  const assignments = DB.getAssignments();
  const courses = DB.getCourses();
  const asg = assignments.find(a => a.id === asgId);
  if (!asg) return;

  const course = courses.find(c => c.id === asg.courseId);

  document.getElementById('submitAssignmentId').value = asgId;
  document.getElementById('submitModalTitle').textContent = `Submit: ${asg.title}`;
  document.getElementById('submitModalCourse').textContent = `${course ? course.code : 'UNIV'} • Maximum Marks: ${asg.maxMarks}`;
  document.getElementById('submitModalInstructions').innerHTML = `
    <strong>Assignment Guidelines:</strong> ${esc(asg.description)}
  `;

  // Late Indicator Warning inside modal
  const isPast = new Date() > new Date(asg.dueDate);
  document.getElementById('submissionLateWarning').classList.toggle('hidden', !isPast);

  // Pre-fill if student already has a submission
  const currentUser = DB.getCurrentUser();
  const submissions = DB.getSubmissions();
  const existingSub = submissions.find(s => s.assignmentId === asgId && s.studentId === currentUser.id);

  selectedFileObject = null;
  removeAttachedFile();
  document.getElementById('submissionUrl').value = '';
  document.getElementById('submissionRemarks').value = '';

  if (existingSub) {
    document.getElementById('submissionRemarks').value = existingSub.remarks || '';
    if (existingSub.submissionType === 'link') {
      toggleSubmissionInputMode('link');
      document.querySelector('input[name="submissionMode"][value="link"]').checked = true;
      document.getElementById('submissionUrl').value = existingSub.linkUrl || '';
    } else {
      toggleSubmissionInputMode('file');
      document.querySelector('input[name="submissionMode"][value="file"]').checked = true;
      if (existingSub.fileName) {
        displayAttachedFileCard(existingSub.fileName, existingSub.fileSize || 'Preserved');
      }
    }
  } else {
    toggleSubmissionInputMode('file');
    document.querySelector('input[name="submissionMode"][value="file"]').checked = true;
  }

  // Setup Drag and Drop Listeners
  setupDragAndDrop();

  openModal('modalSubmitWork');
}

function toggleSubmissionInputMode(mode) {
  const fileContainer = document.getElementById('fileUploadContainer');
  const linkContainer = document.getElementById('linkUploadContainer');

  if (mode === 'file') {
    fileContainer.classList.remove('hidden');
    linkContainer.classList.add('hidden');
  } else {
    fileContainer.classList.add('hidden');
    linkContainer.classList.remove('hidden');
  }
}

let dragDropReady = false;
function setupDragAndDrop() {
  const dropZone = document.getElementById('dropZone');
  if (!dropZone || dragDropReady) return; // was re-adding listeners on every modal open
  dragDropReady = true;

  ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
  });

  function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
  });

  dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
      processSelectedFile(files[0]);
    }
  });
}

function handleFileSelect(e) {
  if (e.target.files.length > 0) {
    processSelectedFile(e.target.files[0]);
  }
}

function formatFileSize(bytes) {
  return bytes >= 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(2)} MB` : `${(bytes / 1024).toFixed(1)} KB`;
}

function processSelectedFile(file) {
  if (file.size > MAX_FILE_BYTES) {
    alert(`File is too large (${formatFileSize(file.size)}). Maximum allowed size is 10 MB.`);
    document.getElementById('fileInputElement').value = '';
    return;
  }
  // Keep the File itself (stored as a Blob in IndexedDB on submit) - no base64 bloat
  selectedFileObject = { name: file.name, size: formatFileSize(file.size), type: file.type, file };
  displayAttachedFileCard(file.name, selectedFileObject.size);
}

function displayAttachedFileCard(name, size) {
  document.getElementById('attachedFileName').textContent = name;
  document.getElementById('attachedFileSize').textContent = size;
  document.getElementById('attachedFileCard').classList.remove('hidden');
  document.getElementById('dropZone').classList.add('hidden');
}

function removeAttachedFile() {
  selectedFileObject = null;
  document.getElementById('fileInputElement').value = '';
  document.getElementById('attachedFileCard').classList.add('hidden');
  document.getElementById('dropZone').classList.remove('hidden');
}

// Student Submit Handler with Exact Timestamp & Late Indicator
async function handleStudentSubmission(e) {
  e.preventDefault();
  const currentUser = DB.getCurrentUser();
  if (!currentUser || currentUser.role !== 'student') return;

  const asgId = document.getElementById('submitAssignmentId').value;
  const assignments = DB.getAssignments();
  const asg = assignments.find(a => a.id === asgId);
  if (!asg) return;

  const mode = document.querySelector('input[name="submissionMode"]:checked').value;
  const remarks = document.getElementById('submissionRemarks').value.trim();

  let submissionType = 'file';
  let fileName = '';
  let fileData = '';
  let fileSize = '';
  let fileId = '';
  let fileType = '';
  let linkUrl = '';
  let newFileToStore = null;
  const prev = DB.getSubmissions().find(s => s.assignmentId === asgId && s.studentId === currentUser.id);

  if (mode === 'file') {
    if (!selectedFileObject) {
      // Keep the student's existing file when only editing remarks
      if (prev && prev.submissionType === 'file' && prev.fileName) {
        fileName = prev.fileName;
        fileData = prev.fileData || '';
        fileSize = prev.fileSize;
        fileId = prev.fileId || '';
        fileType = prev.fileType || '';
      } else {
        alert('Please select or drag & drop a file to upload.');
        return;
      }
    } else {
      submissionType = 'file';
      fileName = selectedFileObject.name;
      fileSize = selectedFileObject.size;
      fileType = selectedFileObject.type || '';
      fileId = `file_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
      newFileToStore = selectedFileObject.file;
    }
  } else {
    submissionType = 'link';
    linkUrl = safeUrl(document.getElementById('submissionUrl').value);
    if (!linkUrl) {
      alert('Please enter a valid http:// or https:// URL.');
      return;
    }
  }

  // Save the file to IndexedDB first; abort cleanly if the browser refuses
  if (newFileToStore) {
    try {
      await FileStore.put(fileId, newFileToStore);
    } catch (err) {
      console.error(err);
      alert('Could not save the file in this browser (storage full or private mode). Try a smaller file or submit a link instead.');
      return;
    }
  }

  // Exact Current Timestamp & Auto Late Check
  const submissionDate = new Date();
  const dueDate = new Date(asg.dueDate);
  const isLate = (submissionDate > dueDate);

  let submissions = DB.getSubmissions();
  const existingIndex = submissions.findIndex(s => s.assignmentId === asgId && s.studentId === currentUser.id);

  const submissionPayload = {
    id: existingIndex >= 0 ? submissions[existingIndex].id : `sub_${Date.now()}`,
    assignmentId: asgId,
    studentId: currentUser.id,
    studentName: currentUser.name,
    studentRollNo: currentUser.rollNo || 'Roll-N/A',
    submissionDate: submissionDate.toISOString(),
    submissionType,
    fileName,
    fileData,
    fileId,
    fileType,
    fileSize,
    linkUrl,
    remarks,
    isLate,
    reviewStatus: 'pending',
    marksObtained: existingIndex >= 0 ? submissions[existingIndex].marksObtained : null,
    feedback: existingIndex >= 0 ? submissions[existingIndex].feedback : '',
    reviewedAt: null
  };

  const oldFileId = existingIndex >= 0 ? submissions[existingIndex].fileId : '';
  if (existingIndex >= 0) {
    submissions[existingIndex] = submissionPayload;
  } else {
    submissions.push(submissionPayload);
  }
  try {
    DB.saveSubmissions(submissions);
  } catch (err) {
    console.error(err);
    if (newFileToStore) FileStore.remove(fileId);
    alert('Could not save your submission: browser storage is full.');
    return;
  }
  // Remove the replaced file so storage does not leak
  if (oldFileId && oldFileId !== fileId) FileStore.remove(oldFileId);

  playChime();
  closeModal('modalSubmitWork');

  const statusMsg = isLate 
    ? 'Assignment submitted (Flagged as Late submission).' 
    : 'Assignment submitted on-time successfully!';
  
  showToast(statusMsg, isLate ? 'warning' : 'success');
  updateDashboardMetrics();
  renderAssignments();
}

// Student views feedback / marks modal
function openStudentViewGradeModal(subId) {
  const submissions = DB.getSubmissions();
  const sub = submissions.find(s => s.id === subId);
  if (!sub) return;

  const assignments = DB.getAssignments();
  const asg = assignments.find(a => a.id === sub.assignmentId);

  alert(`Academic Grade Report:\n\nAssignment: ${asg ? asg.title : 'Assignment'}\nAwarded Marks: ${sub.marksObtained} / ${asg ? asg.maxMarks : 20}\nTimeline Status: ${sub.isLate ? 'Late Submission' : 'On-Time'}\n\nFaculty Remarks:\n"${sub.feedback || 'No remarks provided.'}"`);
}

// =============================================================================
// 8. TEACHER FLOW: SUBMISSIONS REVIEW DESK, VIEW & DOWNLOAD FILE, GRADING
// =============================================================================

function openSubmissionsDesk(asgId) {
  const assignments = DB.getAssignments();
  const asg = assignments.find(a => a.id === asgId);
  if (!asg) return;

  const submissions = DB.getSubmissions().filter(s => s.assignmentId === asgId);

  document.getElementById('deskModalTitle').textContent = `Review Desk: ${asg.title}`;
  document.getElementById('deskModalStats').textContent = `Total Submissions: ${submissions.length} • Max Marks: ${asg.maxMarks} • Due: ${new Date(asg.dueDate).toLocaleString()}`;

  const tbody = document.getElementById('submissionsTableBody');
  tbody.innerHTML = '';

  if (submissions.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 2rem;">No student submissions received yet for this assignment.</td></tr>`;
  } else {
    submissions.forEach(sub => {
      const subTimeStr = new Date(sub.submissionDate).toLocaleString('en-US', {
        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
      });

      // Late Indicator Flag (Bold Amber/Red)
      const lateFlagHTML = sub.isLate 
        ? `<span class="badge badge-danger">⚠️ LATE SUBMISSION</span>`
        : `<span class="badge badge-success">✔ On-Time</span>`;

      // Deliverable summary
      const deliverableHTML = sub.submissionType === 'file'
        ? `<span style="font-weight: 600; font-size: 0.8rem;">📎 ${esc(sub.fileName || 'file')}</span>`
        : `<span style="font-weight: 600; font-size: 0.8rem;">🔗 Web Link</span>`;

      // Status badge
      const reviewBadge = sub.reviewStatus === 'graded'
        ? `<span class="badge badge-success">Graded: ${sub.marksObtained}/${asg.maxMarks}</span>`
        : `<span class="badge badge-warning">Pending Evaluation</span>`;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>
          <strong>${esc(sub.studentName)}</strong>
          <span style="display: block; font-size: 0.75rem; color: var(--text-muted);">${esc(sub.studentRollNo)}</span>
        </td>
        <td>${subTimeStr}</td>
        <td>${lateFlagHTML}</td>
        <td>${deliverableHTML}</td>
        <td>${reviewBadge}</td>
        <td>
          <button class="btn btn-primary btn-sm" onclick="openEvaluationModal('${sub.id}')">
            ${sub.reviewStatus === 'graded' ? 'Re-Grade / View' : 'Evaluate & Grade'}
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  }

  openModal('modalSubmissionsDesk');
}

// Teacher evaluates submission, views document preview, downloads file
const TEXT_EXTENSIONS = ['txt','md','js','ts','json','html','htm','css','py','java','c','cpp','h','cs','php','sql','csv','xml','yml','yaml','log','sh','rb','go','rs','kt','swift'];

function getExt(name) {
  return (String(name || '').split('.').pop() || '').toLowerCase();
}

function releasePreviewUrl() {
  if (previewObjectUrl) {
    URL.revokeObjectURL(previewObjectUrl);
    previewObjectUrl = null;
  }
}

function openEvaluationModal(subId) {
  const submissions = DB.getSubmissions();
  const sub = submissions.find(s => s.id === subId);
  if (!sub) return;

  const assignments = DB.getAssignments();
  const asg = assignments.find(a => a.id === sub.assignmentId);

  document.getElementById('evalSubmissionId').value = sub.id;
  document.getElementById('evalStudentName').textContent = `Evaluate: ${sub.studentName} (${sub.studentRollNo})`;
  document.getElementById('evalAssignmentMeta').textContent = `${asg ? asg.title : ''} • Submitted: ${new Date(sub.submissionDate).toLocaleString()} ${sub.isLate ? '[LATE]' : '[ON TIME]'}`;
  document.getElementById('studentRemarksText').textContent = sub.remarks || 'No notes provided by student.';

  const actionContainer = document.getElementById('deliverableActionBtns');
  const previewContainer = document.getElementById('docPreviewContainer');
  actionContainer.innerHTML = '';
  releasePreviewUrl();

  if (sub.submissionType === 'file') {
    const downloadBtn = document.createElement('button');
    downloadBtn.type = 'button';
    downloadBtn.className = 'btn btn-outline btn-sm';
    downloadBtn.textContent = `📥 Download "${sub.fileName}"`;
    downloadBtn.onclick = () => triggerFileDownload(sub);
    actionContainer.appendChild(downloadBtn);

    previewContainer.textContent = 'Loading preview...';
    renderFilePreview(sub, previewContainer);
  } else {
    const url = safeUrl(sub.linkUrl);
    if (url) {
      const linkBtn = document.createElement('a');
      linkBtn.href = url;
      linkBtn.target = '_blank';
      linkBtn.rel = 'noopener noreferrer';
      linkBtn.className = 'btn btn-outline btn-sm';
      linkBtn.textContent = '↗ Open External Link';
      actionContainer.appendChild(linkBtn);
    }
    previewContainer.innerHTML = `
      <div style="padding: 1.5rem;">
        <h4 style="font-size: 0.95rem; margin-bottom: 0.5rem;">External Project Repository / Live URL:</h4>
        ${url
          ? `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" style="font-size: 1.05rem; font-weight: 600; word-break: break-all; color: var(--primary);">${esc(url)}</a>`
          : `<p style="color: var(--danger);">Invalid or unsafe link: ${esc(sub.linkUrl)}</p>`}
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.75rem;">Opens in a new tab.</p>
      </div>
    `;
  }

  const maxMarks = asg ? asg.maxMarks : 20;
  document.getElementById('evalMaxMarksLabel').textContent = `/ ${maxMarks}`;
  document.getElementById('evalMarksObtained').max = maxMarks;
  document.getElementById('evalMarksObtained').value = (sub.marksObtained !== null && sub.marksObtained !== undefined) ? sub.marksObtained : '';
  document.getElementById('evalReviewStatus').value = sub.reviewStatus || 'graded';
  document.getElementById('evalFeedback').value = sub.feedback || '';

  openModal('modalEvaluateStudent');
}

async function renderFilePreview(sub, container) {
  const fallback = (msg) => {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem;">
        <p><strong>${esc(sub.fileName)}</strong> (${esc(sub.fileSize || 'Attachment')})</p>
        <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.25rem;">${esc(msg)}</p>
      </div>`;
  };

  try {
    const blob = await getSubmissionBlob(sub);
    if (!blob) {
      fallback('The file data could not be found in this browser. Files are stored locally, so they can only be opened on the browser/device where they were uploaded.');
      return;
    }
    const ext = getExt(sub.fileName);
    const mime = (blob.type || sub.fileType || '').toLowerCase();

    if (mime.startsWith('image/') && mime !== 'image/svg+xml') {
      previewObjectUrl = URL.createObjectURL(blob);
      container.innerHTML = '';
      const img = document.createElement('img');
      img.src = previewObjectUrl;
      img.alt = 'Student submission';
      img.style.cssText = 'max-width: 100%; border-radius: var(--radius-sm);';
      container.appendChild(img);
    } else if (mime === 'application/pdf' || ext === 'pdf') {
      // Make sure it really is a PDF (header "%PDF") before embedding
      const head = await blob.slice(0, 5).text();
      if (head.startsWith('%PDF')) {
        previewObjectUrl = URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));
        container.innerHTML = '';
        const frame = document.createElement('iframe');
        frame.src = previewObjectUrl;
        frame.title = 'PDF preview';
        frame.style.cssText = 'width: 100%; height: 420px; border: 0;';
        container.appendChild(frame);
      } else {
        fallback('This file is named .pdf but is not a valid PDF, so it cannot be previewed. Use Download to inspect it.');
      }
    } else if (mime.startsWith('text/') || TEXT_EXTENSIONS.includes(ext)) {
      const text = await blob.text(); // proper UTF-8 decoding
      container.textContent = text.length > 50000 ? text.slice(0, 50000) + '\n\n... (truncated, download for full file)' : text;
    } else {
      fallback('Preview is not available for this file type (DOCX / ZIP / other). Click Download above to open it locally.');
    }
  } catch (err) {
    console.error(err);
    fallback('Could not load the file preview. Try the Download button.');
  }
}

// Download Deliverable Helper (uses a Blob URL - large data: URLs get blocked by browsers)
async function triggerFileDownload(sub) {
  try {
    const blob = await getSubmissionBlob(sub);
    if (!blob) {
      showToast('File data not found in this browser.', 'warning');
      return;
    }
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = sub.fileName || 'student_assignment_deliverable';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
    showToast(`Downloading deliverable: ${sub.fileName}`, 'info');
  } catch (err) {
    console.error(err);
    showToast('Download failed.', 'warning');
  }
}

// Save Marks and Faculty Feedback
function handleSaveGrade(e) {
  e.preventDefault();
  const subId = document.getElementById('evalSubmissionId').value;
  const marksObtained = parseInt(document.getElementById('evalMarksObtained').value, 10);
  const reviewStatus = document.getElementById('evalReviewStatus').value;
  const feedback = document.getElementById('evalFeedback').value.trim();

  let submissions = DB.getSubmissions();
  const sub = submissions.find(s => s.id === subId);
  if (!sub) return;

  const gradedAsg = DB.getAssignments().find(a => a.id === sub.assignmentId);
  const maxAllowed = gradedAsg ? gradedAsg.maxMarks : 100;
  if (isNaN(marksObtained) || marksObtained < 0 || marksObtained > maxAllowed) {
    alert(`Marks must be between 0 and ${maxAllowed}.`);
    return;
  }

  sub.marksObtained = marksObtained;
  sub.reviewStatus = reviewStatus;
  sub.feedback = feedback;
  sub.reviewedAt = new Date().toISOString();

  DB.saveSubmissions(submissions);

  // Send Notification to Student
  const assignments = DB.getAssignments();
  const asg = assignments.find(a => a.id === sub.assignmentId);
  createStudentNotification(
    sub.studentId, 
    'Assignment Graded', 
    `Your assignment "${asg ? asg.title : 'Assignment'}" was evaluated: ${marksObtained} Marks.`
  );

  playChime();
  closeModal('modalEvaluateStudent');
  showToast(`Marks (${marksObtained}) & Feedback published!`, 'success');

  // Refresh modals & views
  openSubmissionsDesk(sub.assignmentId);
  updateDashboardMetrics();
  renderAssignments();
}

// =============================================================================
// 9. TEACHER EXCLUSIVE: ALL STUDENTS DIRECTORY & ACADEMIC PROGRESS REPORT
// =============================================================================

function renderStudentRoster() {
  const users = DB.getUsers();
  const students = users.filter(u => u.role === 'student');
  const assignments = DB.getAssignments();
  const submissions = DB.getSubmissions();

  const searchVal = (document.getElementById('searchStudentInput')?.value || '').toLowerCase();
  const tbody = document.getElementById('studentRosterTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const filteredStudents = students.filter(s => {
    return s.name.toLowerCase().includes(searchVal) || (s.rollNo && s.rollNo.toLowerCase().includes(searchVal));
  });

  if (filteredStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--text-muted); padding: 2rem;">No students found matching your criteria.</td></tr>`;
    return;
  }

  filteredStudents.forEach(student => {
    const studentSubs = submissions.filter(s => s.studentId === student.id);
    const submittedCount = studentSubs.length;
    const totalAssignments = assignments.length;
    
    // On-Time compliance %
    const onTimeSubs = studentSubs.filter(s => !s.isLate).length;
    const complianceRate = submittedCount > 0 ? Math.round((onTimeSubs / submittedCount) * 100) : 100;
    const lateFlagsCount = studentSubs.filter(s => s.isLate).length;

    // Average Score
    const gradedSubs = studentSubs.filter(s => s.reviewStatus === 'graded' && s.marksObtained !== null);
    let avgPercentage = 'N/A';
    if (gradedSubs.length > 0) {
      let earned = 0;
      let totalMax = 0;
      gradedSubs.forEach(s => {
        const asg = assignments.find(a => a.id === s.assignmentId);
        earned += s.marksObtained;
        totalMax += (asg ? asg.maxMarks : 20);
      });
      avgPercentage = `${Math.round((earned / totalMax) * 100)}%`;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div style="font-weight: 700;">${esc(student.name)}</div>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${esc(student.rollNo || 'Roll-N/A')} • ${esc(student.email)}</span>
      </td>
      <td>${esc(student.department || 'CSE')} (${esc(student.semester || '5th Sem')})</td>
      <td>
        <strong>${submittedCount} / ${totalAssignments}</strong>
        <div class="progress-container">
          <div class="progress-fill" style="width: ${(submittedCount / Math.max(totalAssignments, 1)) * 100}%;"></div>
        </div>
      </td>
      <td>
        <span class="badge ${complianceRate >= 80 ? 'badge-success' : 'badge-warning'}">
          ${complianceRate}% On-Time
        </span>
      </td>
      <td>
        ${lateFlagsCount > 0 ? `<span class="badge badge-danger">${lateFlagsCount} Late</span>` : `<span class="badge badge-success">0</span>`}
      </td>
      <td>
        <strong style="color: var(--primary); font-size: 0.95rem;">${avgPercentage}</strong>
      </td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="openStudentReportCard('${student.id}')">
          Academic Report 📊
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openStudentReportCard(studentId) {
  const users = DB.getUsers();
  const student = users.find(u => u.id === studentId);
  if (!student) return;

  const assignments = DB.getAssignments();
  const submissions = DB.getSubmissions();
  const studentSubs = submissions.filter(s => s.studentId === student.id);

  document.getElementById('reportStudentName').textContent = `${student.name}'s Academic Progress Record`;
  document.getElementById('reportStudentMeta').textContent = `Enrollment: ${student.rollNo || 'N/A'} • Department: ${student.department || 'CSE'} • ${student.semester || '5th Sem'}`;

  // Calculate high-level stats
  const submittedCount = studentSubs.length;
  const totalCount = assignments.length;
  const onTimeCount = studentSubs.filter(s => !s.isLate).length;
  const onTimeRate = submittedCount > 0 ? Math.round((onTimeCount / submittedCount) * 100) : 100;

  const gradedSubs = studentSubs.filter(s => s.reviewStatus === 'graded');
  let avgPercentage = '0%';
  if (gradedSubs.length > 0) {
    let earned = 0;
    let totalMax = 0;
    gradedSubs.forEach(s => {
      const asg = assignments.find(a => a.id === s.assignmentId);
      earned += s.marksObtained;
      totalMax += (asg ? asg.maxMarks : 20);
    });
    avgPercentage = `${Math.round((earned / totalMax) * 100)}%`;
  }

  document.getElementById('reportAvgScore').textContent = avgPercentage;
  document.getElementById('reportSubmittedRatio').textContent = `${submittedCount} / ${totalCount}`;
  document.getElementById('reportOnTimeRate').textContent = `${onTimeRate}%`;

  // Populate Assignment History Table
  const tbody = document.getElementById('studentReportHistoryBody');
  tbody.innerHTML = '';

  assignments.forEach(asg => {
    const sub = studentSubs.find(s => s.assignmentId === asg.id);
    let statusText = '';
    let marksText = '-';
    let remarksText = 'Pending Submission';

    if (sub) {
      statusText = sub.isLate 
        ? `<span class="badge badge-danger">Late Submission</span>` 
        : `<span class="badge badge-success">On-Time</span>`;
      
      marksText = sub.reviewStatus === 'graded' 
        ? `<strong>${sub.marksObtained} / ${asg.maxMarks}</strong>` 
        : '<span class="badge badge-warning">Under Review</span>';

      remarksText = esc(sub.feedback || 'No remarks entered yet.');
    } else {
      const isPast = new Date() > new Date(asg.dueDate);
      statusText = isPast 
        ? `<span class="badge badge-danger">Missing / Overdue</span>` 
        : `<span class="badge badge-warning">Not Submitted</span>`;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><strong>${esc(asg.title)}</strong></td>
      <td>${new Date(asg.dueDate).toLocaleDateString()}</td>
      <td>${statusText}</td>
      <td>${marksText}</td>
      <td style="font-size: 0.8rem; color: var(--text-muted);">${remarksText}</td>
    `;
    tbody.appendChild(row);
  });

  openModal('modalStudentReport');
}

// =============================================================================
// 10. NOTIFICATIONS, THEME, AUDIO & UTILITIES
// =============================================================================

function toggleNotifDropdown() {
  document.getElementById('notifDropdown').classList.toggle('hidden');
}

function updateNotificationsUI() {
  const currentUser = DB.getCurrentUser();
  if (!currentUser) return;

  const notifs = DB.getNotifications().filter(n => n.userId === currentUser.id || n.userId === 'all');
  const badge = document.getElementById('notifCountBadge');
  const list = document.getElementById('notifList');

  const unreadCount = notifs.filter(n => n.unread).length;
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  list.innerHTML = '';
  if (notifs.length === 0) {
    list.innerHTML = `<li style="padding: 1rem; text-align: center; color: var(--text-muted); font-size: 0.82rem;">No recent notifications.</li>`;
    return;
  }

  notifs.slice(0, 10).forEach(n => {
    const li = document.createElement('li');
    li.className = `notif-item ${n.unread ? 'unread' : ''}`;
    li.innerHTML = `
      <p><strong>${esc(n.title)}</strong>: ${esc(n.message)}</p>
      <span>${new Date(n.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
    `;
    list.appendChild(li);
  });
}

function clearAllNotifications() {
  const currentUser = DB.getCurrentUser();
  if (!currentUser) return;

  let notifs = DB.getNotifications();
  notifs = notifs.filter(n => n.userId !== currentUser.id && n.userId !== 'all');
  DB.saveNotifications(notifs);
  updateNotificationsUI();
}

function createStudentNotification(studentId, title, message) {
  const notifs = DB.getNotifications();
  notifs.unshift({
    id: `notif_${Date.now()}`,
    userId: studentId,
    title,
    message,
    time: new Date().toISOString(),
    unread: true
  });
  DB.saveNotifications(notifs);
}

function createSystemNotificationForAllStudents(title, message) {
  const notifs = DB.getNotifications();
  const students = DB.getUsers().filter(u => u.role === 'student');
  students.forEach(std => {
    notifs.unshift({
      id: `notif_${Date.now()}_${std.id}`,
      userId: std.id,
      title,
      message,
      time: new Date().toISOString(),
      unread: true
    });
  });
  DB.saveNotifications(notifs);
}

// Audio Chime Trigger
function playChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.setValueAtTime(1175, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.4);
    osc.onended = () => ctx.close();
  } catch (e) { /* audio is optional */ }
}

// Theme Switcher (Dark / Light Mode)
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem(STORAGE_KEYS.THEME, newTheme);

  document.getElementById('themeIconSun').classList.toggle('hidden', newTheme === 'dark');
  document.getElementById('themeIconMoon').classList.toggle('hidden', newTheme === 'light');
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.getElementById('themeIconSun').classList.toggle('hidden', saved === 'dark');
  document.getElementById('themeIconMoon').classList.toggle('hidden', saved === 'light');
}

// Universal Toast Banner
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> <div>${esc(message)}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(20px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Modal Helpers
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  if (id === 'modalEvaluateStudent') releasePreviewUrl();
}

// Close modals when clicking overlay
window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
  // Close notif dropdown if clicked outside
  const notifWrapper = document.getElementById('notifWrapper');
  const notifDropdown = document.getElementById('notifDropdown');
  if (notifWrapper && notifDropdown && !notifWrapper.contains(e.target)) {
    notifDropdown.classList.add('hidden');
  }
});

// =============================================================================
// 11. BOOTSTRAP APP ON LOAD
// =============================================================================

window.addEventListener('DOMContentLoaded', () => {
  initDatabase();
  initTheme();

  // Check if session exists
  const currentUser = DB.getCurrentUser();
  if (currentUser) {
    loadAppForCurrentUser();
  } else {
    selectAuthRole('student');
    switchAuthMode('signin');
  }
});
