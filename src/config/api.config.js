// API Base URL
export const API_BASE_URL = 'http://209.38.121.22:8081';

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/login',

  // Profile
  PROFILE: '/profile',
  UPLOAD_IMAGE: '/profile/upload-image',
  GET_CURRENT_USER: '/get-current-user',

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
  GET_ATTENDANCE_REPORT: '/attendance/report',

  // VC
  VC_COUNTS: '/vc/counts',
  VC_ALL_PENDING: '/vc/all_pending',
  VC_ALL_APPROVED: '/vc/all_approved',
  VC_ALL_REJECTED: '/vc/all_rejected',

  // Employee
  EMPLOYEE_ATTENDANCE_STATUS: '/employee/attendance-status',
  EMPLOYEE_LEAVE_BALANCE: '/employee/leave-balance',
  EMPLOYEE_PENDING_APPROVALS: '/get-pending-requests',
  EMPLOYEE_LEAVE_HISTORY: '/user/get-leave-history',

  //Admin
  ADMIN_LEAVE_REQUESTS: '/admin/get-leave-requests',
  ADMIN_LEAVE_REQUESTS_HISTORY: '/admin/get-leave-requests-history',
  APPROVE_LEAVE_ADMIN: '/approve-leave',
  REJECT_LEAVE_ADMIN: '/reject-leave',
  ADMIN_ANNOUNCEMENT: '/get-announcements',
  ADMIN_ON_DUTY: '/admin/all-on-duty-users',

  // Ghante ka hisab 
  EMPLOYEE_TOTAL_DURATION: '/attendance/total_duration',
  EMPLOYEE_ON_DUTY: '/attendance/on_duty',

  // Mics
  HOLIDAY_CALENDAR: '/profile/get-calender',
  TOTAL_DURATION: '/attendance/total_duration',  // to get the active hours

  // stocks
  CREATE_STOCK: '/central_stock/create_stock',
  GET_ALL_STOCK: '/central_stock/get_all_stocks'
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`; 