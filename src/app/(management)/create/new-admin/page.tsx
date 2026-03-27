// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';
// import NewAdminForm from '@/components/forms/new-admin-form';

import NewAdminForm from '@/components/features/create/form/NewAdminForm';

export default function Page() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col">
        {/* <Header /> */}

        <main className="flex flex-col items-center p-10">
          {/* Title */}
          <div className="text-center mb-8"></div>

          {/* Form */}
          <NewAdminForm />
        </main>
      </div>
    </div>
  );
}
