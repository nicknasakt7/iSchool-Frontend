import NewEntryForm from '@/components/features/create/form/NewEntryForm';

export default function CreateStudentPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col items-center p-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold">New Entry</h1>
            <p className="text-muted-foreground mt-2">
              Add a new student record to the system
            </p>
          </div>

          <NewEntryForm />
        </main>
      </div>
    </div>
  );
}
