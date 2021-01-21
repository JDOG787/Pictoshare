import { AppProps } from 'next/app';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '../styles/global.css';

const client = new ApolloClient({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  cache: new InMemoryCache()
});


function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
          <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default App
