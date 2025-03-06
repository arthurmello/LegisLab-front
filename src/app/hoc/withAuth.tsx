import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/home");
      }
    }, [user, loading, router]);

    if (loading || !user) {
      return <p>Loading...</p>; // Show a loading state while checking auth
    }

    return <Component {...props} />;
  };
} 