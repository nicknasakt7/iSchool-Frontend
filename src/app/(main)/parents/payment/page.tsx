import CheckoutPage from "@/components/stripe/checkout";
import {
  FlaskConical,
  GraduationCap,
  SquareArrowLeft,
  Volleyball,
} from "lucide-react";

export default function Payment() {
  const fee = [
    { title: "Tuition Fee", amount: 12400 },
    { title: "Lab & Science Materials", amount: 980 },
    { title: "Extracurricular Activities", amount: 520 },
  ];

  const total = fee.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex min-h-screen bg-gray-100 p-8 gap-8">
      {/*ฝั่งซ้าย */}
      <div className="w-1/2">
        <div className="flex items-center gap-2">
          <SquareArrowLeft size={18} />
          <span>Back to Dashboard</span>
        </div>

        <h1 className="text-5xl font-bold">
          Complete your <span className="text-blue-600">Enrollment</span>
        </h1>

        <p className="text-gray-600 mt-4 mb-8">
          Review your semester fees before proceeding to secure checkout
        </p>

        {/*mock list */}

        <div className="space-y-4">
          <div className=" bg-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex gap-3">
              {" "}
              <div className=" flex w-10 h-10 items-center justify-center rounded-full bg-amber-400">
                <GraduationCap />
              </div>
              <span>Tuition Fee</span>
            </div>
            <span>$12,400</span>
          </div>

          <div className=" bg-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex gap-3">
              {" "}
              <div className=" flex w-10 h-10 items-center justify-center rounded-full bg-pink-400">
                <FlaskConical />
              </div>
              <span>Lab & Science Materials</span>
            </div>
            <span>$980</span>
          </div>

          <div className=" bg-white p-4 rounded-xl flex items-center justify-between">
            <div className="flex gap-3">
              {" "}
              <div className=" flex w-10 h-10 items-center justify-center rounded-full bg-blue-400">
                <Volleyball />
              </div>
              <span>Extracurricular Activities</span>
            </div>
            <span>$520</span>
          </div>
        </div>
        {/*total */}
        <div>
          <div>
            <p>TOTAL TO PLAY</p>
            <h1>
              {total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}
            </h1>
          </div>
        </div>
      </div>

      {/* checkout */}
      <div className="mt-6">
        <CheckoutPage />
      </div>
    </div>
  );
}
