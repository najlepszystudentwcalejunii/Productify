import { useAuth, useUser } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { syncUser } from "../lib/api";

// the best way to implement this is by using webhooks
function useUserSync() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  const {
    mutate: syncUserMutation,
    isPending,
    isSuccess,
  } = useMutation({ mutationFn: syncUser });

  useEffect(() => {
    if (isSignedIn && user && !isPending && !isSuccess) {
      console.log("sync");
      syncUserMutation({
        email: user.primaryEmailAddress?.emailAddress || "fdsfs",
        name: user.fullName || user.firstName,
        imageUrl: user.imageUrl,
      });
    }
  }, [isSignedIn, user, isPending, isSuccess, syncUserMutation]);

  return { isSynced: isSuccess };
}

export default useUserSync;
