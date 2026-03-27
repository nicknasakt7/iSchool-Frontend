// import Sidebar from '@/components/layout/sidebar';
// import Header from '@/components/layout/header';

import NewEntryForm from '@/components/features/create/form/NewEntryForm';

export default function Page() {
  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}

      <div className="flex-1 flex flex-col">
        {/* <Header /> */}

        <main className="p-8 flex justify-center">
          <NewEntryForm />
        </main>
      </div>
    </div>
  );
}
