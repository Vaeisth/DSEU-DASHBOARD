// API Base URL
export const API_BASE_URL = 'http://68.183.89.54:8081';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',

  // Profile
  PROFILE: '/profile',
  UPLOAD_IMAGE: '/profile/upload-image',

  // Super Admin
  ALL_USERS: '/superadmin/all-users',
  TODAYS_ATTENDANCE: '/superadmin/todays-attendance',
  LEAVE_REQUESTS: '/superadmin/get-leave-requests',
  LEAVE_REQUESTS_HISTORY: '/superadmin/get-leave-requests-history',
  ALL_ANNOUNCEMENTS: '/superadmin/get-all-announcements',
  CREATE_ANNOUNCEMENT: '/superadmin/create-announcement',
  ALL_CAMPUSES: '/superadmin/get-all-campuses',
  ALL_ON_DUTY_USERS: '/superadmin/all-on-duty-users',
  ATTENDANCE_REPORT: '/superadmin/today-attendance-report',
  LEAVE_REQUEST_APPROVE: '/superadmin/approve-leave-request',
  LEAVE_REQUEST_REJECT: '/superadmin/reject-leave-request',
  ADD_CAMPUSES: '/super_admin/add_campus',
  DELETE_CAMPUS: '/super_admin/remove_campus',


  // VC
  VC_COUNTS: '/vc/counts',
  VC_ALL_PENDING: '/vc/all_pending',
  VC_ALL_APPROVED: '/vc/all_approved',
  VC_ALL_REJECTED: '/vc/all_rejected',

  // Employee
  EMPLOYEE_ATTENDANCE_STATUS: '/employee/attendance-status',
  EMPLOYEE_LEAVE_BALANCE: '/employee/leave-balance',
  EMPLOYEE_PENDING_APPROVALS: '/employee/pending-approvals',

  // admin
  ADMIN_LEAVE_REQUESTS: '/admin/get-leave-requests',
  ADMIN_LEAVE_REQUESTS_HISTORY: '/admin/get-leave-requests-history',

  // Ghante ka hisab 
  EMPLOYEE_TOTAL_DURATION: '/attendance/total_duration',
  EMPLOYEE_ON_DUTY: '/attendance/on_duty',

  // Mics
  HOLIDAY_CALENDAR: '/profile/get-calender',

  //Admin
  ADMIN_ANNOUNCEMENT: '/get-announcements'
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 