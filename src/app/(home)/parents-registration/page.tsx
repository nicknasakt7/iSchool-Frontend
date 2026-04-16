import ParentForm from "@/components/features/homepage/parents-registration/ParentForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ParentRegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token ?? "";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <Card className="w-full max-w-xl rounded-3xl border border-slate-200 shadow-sm">
        <CardHeader className="space-y-2 text-center pb-4">
          <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
            Parent Registration
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Please fill in your information to create an account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-6 pb-6 pt-0">
          <ParentForm token={token} />

          <p className="mt-6 text-center text-xs tracking-wide text-slate-400">
            SECURE REGISTRATION | SSL ENCRYPTED
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
