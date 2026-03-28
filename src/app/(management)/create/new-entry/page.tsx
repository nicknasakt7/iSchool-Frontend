// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';

import NewEntryForm from '@/components/features/create/form/NewEntryForm';

export default function CreateStudentPage() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="p-6 flex justify-center">
        <NewEntryForm />
      </main>
    </div>
  );
}
