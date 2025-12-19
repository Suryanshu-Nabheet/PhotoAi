import { useAuth as useClerkAuth, useUser } from "@clerk/nextjs";

export function useAuth(): {
  getToken: () => Promise<string | null>;
  isAuthenticated: boolean;
  user: ReturnType<typeof useUser>["user"];
} {
  const { getToken, isSignedIn } = useClerkAuth();
  const { user } = useUser();

  return {
    getToken,
    isAuthenticated: !!isSignedIn,
    user,
  };
}
