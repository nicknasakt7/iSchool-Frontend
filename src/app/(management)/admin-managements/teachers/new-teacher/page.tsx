import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NewTeacherForm from '@/components/features/create/form/NewTeacherForm';

export default function CreateTeacherPage() {
  return (
    <div className="flex min-h-screen bg-muted/40">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex flex-col items-center justify-start p-10">
          <div className="w-full max-w-3xl mb-4">
            <Link
              href="/admin-managements/teachers/teacher-managements"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
          </div>

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
