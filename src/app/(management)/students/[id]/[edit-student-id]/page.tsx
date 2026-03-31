import ProfileForm from "@/components/profile/profile-form";
import StudentIntelligenceHeader from "@/components/profile/student-intelligence-header";

export default function ProfilePage() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <StudentIntelligenceHeader />

      {/* Card */}
      <div className="bg-white rounded-2xl p-6 shadow">
        <ProfileForm />
      </div>
    </div>
  );
}
