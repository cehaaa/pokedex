import { Suspense } from "react";
import SearchPageContent from "@/components/SearchPage/SearchPageContent";

export default async function Page() {
  return (
    <Suspense>
      <SearchPageContent />
    </Suspense>
  );
}
