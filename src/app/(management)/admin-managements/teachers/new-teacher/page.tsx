import NewTeacherForm from '@/components/features/create/form/NewTeacherForm';

export default function CreateTeacherPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Sidebar */}
      {/* <Sidebar /> */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col items-center justify-start p-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold">New Teacher</h1>
            <p className="text-muted-foreground mt-2">
              Onboard a new faculty member
            </p>
          </div>

          {/* Form */}
          <NewTeacherForm />
        </main>
      </div>
    </div>
  );
}
