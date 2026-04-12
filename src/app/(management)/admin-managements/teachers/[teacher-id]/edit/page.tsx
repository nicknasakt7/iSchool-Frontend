import TeacherProfileForm from '@/components/features/admin-management/teachers/teacher-profile-form';

type Props = {
  params: Promise<{ 'teacher-id': string }>;
};

export default async function EditTeacherPage({ params }: Props) {
  const { 'teacher-id': teacherId } = await params;

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-0">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Teacher Profile</h1>
        <p className="text-gray-500 mt-1">
          Edit teacher information including name, email, and gender.
        </p>
      </div>
      <TeacherProfileForm teacherId={teacherId} />
    </div>
  );
}
