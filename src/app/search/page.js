import { Suspense } from "react";
import SearchClient from "./SearchUser";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
