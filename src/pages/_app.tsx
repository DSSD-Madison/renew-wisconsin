import type { AppProps } from "next/app";
import Layout from "~/components/Layout";
import DataContextProvider from "~/contexts/dataContext";
import "~/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DataContextProvider>
      <Layout>
          <Component {...pageProps} />
      </Layout>
    </DataContextProvider>
  );
}
