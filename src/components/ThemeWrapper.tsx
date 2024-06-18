import { AppContext } from "@/context/AppContext";
import { darkTheme, lightTheme } from "@/utils/theme";
import { ThemeProvider } from "@emotion/react";
import { ReactNode, useContext } from "react";

interface Prop {
  children: ReactNode;
}

const ThemeWrapper = ({ children }: Prop) => {
  const { data } = useContext(AppContext);
  const theme = data.isLightTheme ? lightTheme : darkTheme;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeWrapper;
