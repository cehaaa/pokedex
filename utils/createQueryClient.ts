import { QueryClient } from "@tanstack/react-query";
import {
  DEFAULT_STALE_TIME_MEDIUM,
  DEFAULT_GC_TIME_MEDIUM,
} from "@/constants/queries";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: DEFAULT_STALE_TIME_MEDIUM,
        gcTime: DEFAULT_GC_TIME_MEDIUM,
      },
    },
  });
}
