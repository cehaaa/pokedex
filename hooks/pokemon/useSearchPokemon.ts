import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useDebounce } from "../useDebounce";
import { getPokemonDetailsByName } from "@/api/pokemon";
import { get } from "@/lib/get";
import { isAxiosError } from "@/lib/http";
import { toSlug } from "@/utils/toSlug";
import { getPokemonQueryKey } from "@/utils/getPokemonQueryKey";

interface UseSearchPokemonProps {
  name: string;
}

const ERROR_MESSAGES = {
  NOT_FOUND: "No pokemon found",
  DEFAULT_ERROR: "Oops! Something went wrong",
};

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
        const response = await getPokemonDetailsByName({
          name: toSlug(debouncedName),
        });
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
        setManualError({
          isError: true,
          message: ERROR_MESSAGES.DEFAULT_ERROR,
        });
        throw error;
      }
    },
    enabled: !!debouncedName,
    retry: false,
  });

  return { data, isLoading, error: manualError, ...rest };
}
