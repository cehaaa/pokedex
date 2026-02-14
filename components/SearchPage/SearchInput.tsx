"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchPokemon } from "@/hooks/pokemon/useSearchPokemon";

import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import { MagnifyingGlass } from "../UI/Icon";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";
  const [searchTerm, setSearchTerm] = useState(name);
  const debouncedSearchTerm = useDebounce({ value: searchTerm, delay: 800 });

  const { isLoading, error, handleOnSearch } = useSearchPokemon();

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="space-y-1.5">
      <form
        className="flex border border-zinc-900 items-center border-r-0"
        onSubmit={handleOnSearch}
      >
        <input
          type="text"
          placeholder="Enter a Pokemon name"
          className="w-full border-zinc-300 p-2 focus:outline-none"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <div className="shrink-0">
          <Button>
            {isLoading ? (
              <Spinner className="size-5" />
            ) : (
              <MagnifyingGlass className="size-5" strokeWidth={2} />
            )}
          </Button>
        </div>
      </form>
      {error.isError && (
        <p className="text-red-500 text-xs font-medium">{error.message}</p>
      )}
    </div>
  );
}
