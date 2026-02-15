"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useSearchPokemon } from "@/hooks/pokemon/useSearchPokemon";

import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { MagnifyingGlass } from "../ui/Icon";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const name = searchParams.get("name") || "";

  const handleSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", value);
    router.push(`/search?${params.toString()}`);
  };

  const { isLoading } = useSearchPokemon({ name });

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e.target.value);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex border border-zinc-900 items-center border-r-0">
        <input
          type="text"
          placeholder="Enter a Pokemon name"
          className="w-full border-zinc-300 p-2 focus:outline-none"
          value={name}
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
      </div>
    </div>
  );
}
