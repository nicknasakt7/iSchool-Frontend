import { Oswald, Poppins } from "next/font/google";

export const osWald = Oswald();

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
