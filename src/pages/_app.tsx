import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ThemeProvider } from "next-themes";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import UnauthenticatedApp from "./_unauthenticated-app";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Component {...pageProps} />
          <Toaster />
        </SignedIn>
        <SignedOut>
          <UnauthenticatedApp />
        </SignedOut>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
