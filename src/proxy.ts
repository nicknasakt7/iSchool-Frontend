import { auth } from '@/lib/auth/auth';
import { NextResponse } from 'next/server';

// const protectedRoutes = ['/dashboard', '/students', '/assessments', '/checkin' ,'/create/new-entry' , '/create/new-admin'];
const publicRoutes = [
  '/',
  '/login',
  '/reset-password',
  '/parents-registration',
];
const teacherRoutes = [
  '/dashboard',
  '/students',
  '/students/[student-id]',
  '/students/[student-id]/[edit-student-id]',
  '/assessments',
  '/checkin',
  '/create/new-entry',
];
const adminRoutes = [
  '/',
  '/dashboard',
  '/students',
  '/students/[student-id]',
  '/students/[student-id]/[edit-student-id]',
  '/assessments',
  '/checkin',
  '/create/new-entry',

  // admin-management
  '/admin-managements/enrollments',

  '/admin-managements/teachers/teacher-managements',
  '/admin-managements/teachers/new-teacher',

  '/admin-managements/relations',

  '/admin-managements/academic-setup/grade-architecture',
  '/admin-managements/academic-setup/create-subject',
  '/admin-managements/academic-setup/students-promotion',

  '/admin-managements/finance/fee-management',
  '/admin-managements/finance/create-transaction',
];
const superAdminRoutes = [
  '/',
  '/dashboard',
  '/students',
  '/students/[student-id]',
  '/students/[student-id]/[edit-student-id]',
  '/assessments',
  '/checkin',
  '/create/new-entry',

  // admin-management
  '/admin-managements/enrollments',

  '/admin-managements/teachers/teacher-managements',
  '/admin-managements/teachers/new-teacher',

  '/admin-managements/relations',

  '/admin-managements/academic-setup/grade-architecture',
  '/admin-managements/academic-setup/create-subject',
  '/admin-managements/academic-setup/students-promotion',

  '/admin-managements/finance/fee-management',
  '/admin-managements/finance/create-transaction',

  // super admin only
  '/create/new-admin',
];
const parents = ['/', '/parents/student-info', '/parents/payment'];

const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  TEACHER: 'TEACHER',
  PARENTS: 'PARENTS',
};

export const proxy = auth(req => {
  const pathname = req.nextUrl.pathname;
  const isAuthenticated = !!req.auth;
  const role = req.auth?.user?.role;

  if (!isAuthenticated) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL('/', req.url));
    } else {
      return NextResponse.next();
    }
  }

  if (pathname === '/login' && isAuthenticated) {
    if (role === ROLE.PARENTS) {
      return NextResponse.redirect(new URL('/parents/student-info', req.url));
    }
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Teacher
  const isTeacherRoute = teacherRoutes.some(el =>
    el === '/' ? pathname === el : pathname.startsWith(el),
  );

  if (isTeacherRoute && role === ROLE.TEACHER) {
    return NextResponse.next();
  }

  // Admin
  const isAdminRoute = adminRoutes.some(el =>
    el === '/' ? pathname === el : pathname.startsWith(el),
  );

  if (isAdminRoute && role === ROLE.ADMIN) {
    return NextResponse.next();
  }

  // super_admin
  const isSuperAdminRoutes = superAdminRoutes.some(el =>
    el === '/' ? pathname === el : pathname.startsWith(el),
  );

  if (isSuperAdminRoutes && role === ROLE.SUPER_ADMIN) {
    return NextResponse.next();
  }

  // PARENTS
  const isParentsRoutes = parents.some(el =>
    el === '/' ? pathname === el : pathname.startsWith(el),
  );

  if (isParentsRoutes && role === ROLE.PARENTS) {
    return NextResponse.next();
  }

  if (role === ROLE.PARENTS) {
    return NextResponse.redirect(new URL('/parents/student-info', req.url));
  }

  return NextResponse.redirect(new URL('/dashboard', req.url));
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|webp|gif|svg|ico)).*)',
  ],
};
