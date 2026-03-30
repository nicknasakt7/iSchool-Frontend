// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';
// import NewAdminForm from '@/components/forms/new-admin-form';

import NewAdminForm from '@/components/features/create/form/NewAdminForm';

export default function CreateAdminPage() {
  return (
    <div>
      <main className="flex flex-col items-center p-6">
        {/* Title */}
        <div className="text-center"></div>

        {/* Form */}
        <NewAdminForm />
      </main>
    </div>
  );
}
