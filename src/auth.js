import { useEffect } from "react";
import useAuth from "./hooks/useAuth";
import { useRouter } from "next/navigation";
import CustomSpinner from "./CustomSpinner/CustomSpinner";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        // If user is not authenticated, redirect to login page
        router.replace("/login");
      }
    }, [user, loading]);

    if (loading) {
      // You can show a loading spinner or some indication while checking authentication
      return <CustomSpinner />;
    }

    // If user is authenticated, render the component
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
