import { CommonProviderProps } from "@/common/types/providers/indext";
import { CookiesProvider } from "react-cookie";

export default function ReactCookiesProvider({
  children,
}: CommonProviderProps) {
  return <CookiesProvider>{children}</CookiesProvider>;
}
