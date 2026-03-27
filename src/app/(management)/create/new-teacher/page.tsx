// =========================
// app/new-teacher/page.tsx
// =========================

import NewTeacherForm from '@/components/features/create/form/NewTeacherForm';

// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* <Header /> */}

        <main className="flex flex-col items-center justify-start p-10">
          {/* Title Section */}

          {/* Form */}
          <NewTeacherForm />
        </main>
      </div>
    </div>
  );
}
