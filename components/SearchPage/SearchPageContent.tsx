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

	const q = searchParams.get("q") || "";

	const [searchTerm, setSearchTerm] = useState(q);
	const debouncedSearchTerm = useDebounce({ value: searchTerm });

	const {
		data: pokemon,
		handleOnSearch,
		error,
		isLoading,
	} = useSearchPokemon({
		name: searchTerm,
	});

	const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	useEffect(() => {
		const queryString = createQueryString("q", debouncedSearchTerm);
		router.replace(`/search?${queryString}`);
	}, [debouncedSearchTerm]);

	return (
		<>
			<section className='mb-5'>
				<SearchInput
					error={error}
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
