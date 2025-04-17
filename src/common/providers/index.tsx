import I18nProvider from "./i18n/I18nProvider";
import QueryProvider from "./react-query/QueryProvider";
import { CommonProviderProps } from "../types/providers/indext";

export default function AppProviders({ children }: CommonProviderProps) {
  return (
    <QueryProvider>
      <I18nProvider>{children}</I18nProvider>
    </QueryProvider>
  );
}
