import MensWearList from "@/components/mens-wear/mens-wear-list";
import { Suspense } from "react";

const MensWearPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MensWearList />
    </Suspense>
  );
};

export default MensWearPage;
