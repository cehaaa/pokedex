"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSearchPokemon } from "@/hooks/pokemon";
import { useDebounce, useCreateQueryString } from "@/hooks";

import SearchInput from "@/components/SearchPage/SearchInput";
import SearchResult from "@/components/SearchPage/SearchResult";

export default function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createQueryString = useCreateQueryString(searchParams);

  const name = searchParams.get("name") || "";

  const [searchTerm, setSearchTerm] = useState(name);
  const debouncedSearchTerm = useDebounce({ value: searchTerm });

  const {
    data: pokemon,
    handleOnSearch,
    error,
    isLoading,
  } = useSearchPokemon({ name: debouncedSearchTerm });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <section className="mb-5">
        <SearchInput
          error={{ isError: false, message: "" }}
          isLoading={isLoading}
          searchTerm={searchTerm}
          handleOnSearch={handleOnSearch}
          handleSearchInputChange={handleSearchInputChange}
        />
      </section>

      <section>
        <SearchResult pokemon={pokemon} />
      </section>
    </>
  );
}
