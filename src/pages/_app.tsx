import ThemeWrapper from "@/components/ThemeWrapper";
import AppProvider from "@/context/AppContext";
import "@/styles/globals.css";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <AppProvider>
        <ThemeWrapper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </ThemeWrapper>
      </AppProvider>
    </SessionProvider>
  );
}
