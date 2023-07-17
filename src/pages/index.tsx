import { useUser } from "@clerk/nextjs";
import AuthenticatedApp from "./_authenticated-app";
import UnauthenticatedApp from "./_unauthenticated-app";

export default function Home() {
  const { isSignedIn } = useUser();
  return isSignedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}
