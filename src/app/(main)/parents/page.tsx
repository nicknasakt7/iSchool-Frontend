import { Metadata } from "next";

export const metadata: Metadata = {
  title: "parent/studentinfo",
};

export default function payment() {
  return (
    <div className="bg-amber-500 flex justify-center items-center gap-3">
      <div>student</div>
      <div className="hover:bg-blue-600">payment</div>
    </div>
  );
}
