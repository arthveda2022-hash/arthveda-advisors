import { useBackend } from "@/hooks/useBackend";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";
import { useQuery } from "@tanstack/react-query";

/**
 * Wraps `useInternetIdentity()` from `@caffeineai/core-infrastructure` and
 * augments it with an `isAdmin` flag derived from the backend's
 * `isCallerAdmin()` method. The admin check runs as a React Query so it
 * re-evaluates whenever the identity changes.
 */
export function useAuth() {
  const {
    identity,
    login,
    clear,
    isAuthenticated,
    loginStatus,
    isLoggingIn,
    isLoginError,
    loginError,
  } = useInternetIdentity();
  const { actor, isFetching } = useBackend();

  const principal: Principal | undefined = identity?.getPrincipal();

  const adminQuery = useQuery<boolean>({
    queryKey: ["isAdmin", principal?.toText() ?? "anonymous"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching && isAuthenticated,
  });

  return {
    isAuthed: isAuthenticated,
    principal,
    login,
    logout: clear,
    isAdmin: adminQuery.data === true,
    isAdminLoading: isAuthenticated && adminQuery.isLoading,
    isAdminError: adminQuery.isError,
    loginStatus,
    isLoggingIn,
    isLoginError,
    loginError,
  };
}
