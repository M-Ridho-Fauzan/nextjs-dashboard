import { Inter, Lusitana } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  style: ["normal"],
  // display: Display,
  // variable: ;
  preload: true,
  // fallback: "",
  adjustFontFallback: true,
  subsets: ["latin"],
});
