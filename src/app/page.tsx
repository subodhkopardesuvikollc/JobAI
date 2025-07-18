import ScreenLoader from "@/components/ScreenLoader";
import { redirect } from "next/navigation";

export default async function Home() {
  redirect(`/jd`);

  return (
    <div>
      <ScreenLoader message="Loading..." />
    </div>
  );
}
