import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ThemeProvider } from "next-themes";
import "~/styles/globals.css";
import { Toaster } from "~/components/ui/toaster";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import SignIn from "./_sign-in";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Component {...pageProps} />
          <Toaster />
        </SignedIn>
        <SignedOut>
          <SignIn />
        </SignedOut>
      </ClerkProvider>
    </ThemeProvider>
  );
};

export default api.withTRPC(MyApp);
