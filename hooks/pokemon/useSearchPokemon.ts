"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import type { Pokemon } from "@/types/Pokemon";

import kebabCase from "lodash/kebabCase";
import { isAxiosError } from "axios";

import { getPokemonDetailsByName } from "@/api/pokemon";

interface UseSearchPokemonProps {
  name: string;
}

const ERROR_MESSAGES = {
  EMPTY_SEARCH_TERM: "Please enter a valid search term",
  NOT_FOUND: "No results found",
  DEFAULT_ERROR: "Oops! Something went wrong",
};

export function useSearchPokemon({ name }: UseSearchPokemonProps) {
  const firstTimeFetchRef = useRef(true);
  const isNameEmpty = name.trim().length === 0;

  const [manualError, setManualError] = useState({
    isError: false,
    message: ERROR_MESSAGES.DEFAULT_ERROR,
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["pokemon", name],
    enabled: false,
    retry: false,
    queryFn: async () => {
      try {
        const pokemon = await getPokemonDetailsByName<Pokemon>({
          name: kebabCase(name),
        });
        if (!pokemon) {
          throw new Error(ERROR_MESSAGES.NOT_FOUND);
        }
        return pokemon;
      } catch (error) {
        if (isAxiosError(error)) {
          if (error.response?.status === 404) {
            setManualError({
              isError: true,
              message: ERROR_MESSAGES.NOT_FOUND,
            });
          }
        }
        throw error;
      }
    },
  });

  const handleResetError = useCallback(() => {
    setManualError({ isError: false, message: ERROR_MESSAGES.DEFAULT_ERROR });
  }, []);

  const handleOnSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleResetError();

    if (isNameEmpty) {
      setManualError({
        isError: true,
        message: ERROR_MESSAGES.EMPTY_SEARCH_TERM,
      });
      return;
    }

    try {
      await refetch();
    } catch {
      setManualError({
        isError: true,
        message: ERROR_MESSAGES.NOT_FOUND,
      });
    }
  };

  useEffect(() => {
    if (!isNameEmpty && firstTimeFetchRef.current) refetch();
    firstTimeFetchRef.current = false;
  }, [isNameEmpty, refetch]);

  return { data, isLoading, error: manualError, handleOnSearch };
}
