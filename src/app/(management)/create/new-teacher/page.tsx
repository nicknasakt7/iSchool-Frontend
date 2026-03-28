// =========================
// app/new-teacher/page.tsx
// =========================

import NewTeacherForm from '@/components/features/create/form/NewTeacherForm';

// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';

export default function CreateTeacherPage() {
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col items-center justify-start p-6">
          {/* Form */}
          <NewTeacherForm />
        </main>
      </div>
    </div>
  );
}
