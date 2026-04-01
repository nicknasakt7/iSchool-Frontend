import ParentForm from '@/components/features/homepage/parents-registration/ParentForm';

export default function ParentRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Parent Registration</h1>
          <p className="text-gray-500 mt-2">
            Please fill in your information to create an account
          </p>
        </div>

        <ParentForm />

        <p className="text-center text-sm text-gray-500">
          SECURE REGISTRATION | SSL ENCRYPTED
        </p>
      </div>
    </div>
  );
}
