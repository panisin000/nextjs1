import "@/styles/globals.css";
import "@/components/NavBar";
import { Sarabun } from "next/font/google";
const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});
import NavBar from "@/components/NavBar";
export default function App({ Component, pageProps }) {
  return (
    <div className={"h-full " + sarabun.className}>
      <NavBar />
      <Component {...pageProps} />
    </div>
  );
}
