import SearchInput from "@/components/SearchPage/SearchInput";
import SearchResult from "@/components/SearchPage/SearchResult";

export default function SearchPageContent() {
  return (
    <>
      <section className="mb-5">
        <SearchInput />
      </section>

      <section>
        <SearchResult />
      </section>
    </>
  );
}
