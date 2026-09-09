import { createActor } from "@/backend";
import type { Backend } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";

/**
 * Wraps `useActor(createActor)` from `@caffeineai/core-infrastructure` and
 * exposes the typed `Backend` actor (or `null` while the actor is being
 * initialised). The hook automatically handles identity-based actor creation
 * and config loading, including the `uploadFile` / `downloadFile` helpers
 * backed by `StorageClient` from `@caffeineai/object-storage`.
 */
export function useBackend(): { actor: Backend | null; isFetching: boolean } {
  const { actor, isFetching } = useActor(createActor);
  return { actor: actor as Backend | null, isFetching };
}
