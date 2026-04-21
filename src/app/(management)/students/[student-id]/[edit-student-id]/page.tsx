import ProfileForm from '@/components/profile/profile-form';
import StudentIntelligenceHeader from '@/components/profile/student-intelligence-header';

type Props = {
  params: Promise<{ 'student-id': string }>;
};

export default async function ProfilePage({ params }: Props) {
  const { 'student-id': studentId } = await params;

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-0">
      <StudentIntelligenceHeader />
      <ProfileForm studentId={studentId} />
    </div>
  );
}
