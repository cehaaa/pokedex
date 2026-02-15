"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { POKEMON } from "@/constants/queryKeys";

import { useDebounce } from "../useDebounce";
import { getPokemonDetailsByName } from "@/api/pokemon";
import { get } from "@/lib/get";
import { isAxiosError } from "@/lib/http";
interface UseSearchPokemonProps {
  name: string;
}

const ERROR_MESSAGES = {
  EMPTY_SEARCH_TERM: "Please enter a valid search term",
  NOT_FOUND: "No pokemon found",
  DEFAULT_ERROR: "Oops! Something went wrong",
};

export function getPokemonQueryKey(name: string) {
  return [POKEMON, name];
}

export function useSearchPokemon({ name }: UseSearchPokemonProps) {
  const debouncedName = useDebounce({ value: name, delay: 800 });

  const [manualError, setManualError] = useState({
    isError: false,
    message: ERROR_MESSAGES.DEFAULT_ERROR,
  });

  const resetManualError = () => {
    setManualError({
      isError: false,
      message: ERROR_MESSAGES.DEFAULT_ERROR,
    });
  };

  const { data, isLoading, error, ...rest } = useQuery({
    queryKey: getPokemonQueryKey(debouncedName),
    queryFn: async () => {
      resetManualError();

      try {
        const response = await getPokemonDetailsByName({ name: debouncedName });
        return response;
      } catch (error) {
        const status = get(error, "response.status");
        if (isAxiosError(error) && status === 404) {
          setManualError({
            isError: true,
            message: ERROR_MESSAGES.NOT_FOUND,
          });
          return null;
        }
        throw error;
      }
    },
    enabled: !!debouncedName,
    retry: false,
  });

  return { data, isLoading, error: manualError, ...rest };
}
