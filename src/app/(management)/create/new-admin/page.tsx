import NewAdminForm from '@/components/features/create/form/NewAdminForm';

export default function CreateAdminPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col items-center p-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold">New Admin</h1>
            <p className="text-muted-foreground mt-2">
              Onboard a new faculty member
            </p>
          </div>

          <NewAdminForm />
        </main>
      </div>
    </div>
  );
}
