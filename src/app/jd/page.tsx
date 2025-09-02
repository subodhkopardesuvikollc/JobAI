import ScreenLoader from "@/components/ScreenLoader";
import { redirect } from "next/navigation";

const page = () => {
  redirect(`/jd/new`);
  return (
    <div>
      <ScreenLoader message="Almost there..." />
    </div>
  );
};

export default page;
