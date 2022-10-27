import React from 'react';
import { QueryParamProvider } from 'use-query-params';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReachAdapter } from 'use-query-params/adapters/reach';
import { parse, stringify } from 'query-string';

interface DataListProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
    },
  },
});

const DataListProvider: React.FunctionComponent<DataListProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryParamProvider
        adapter={ReachAdapter}
        options={{
          searchStringToObject: parse,
          objectToSearchString: stringify,
        }}
      >
        {children}
      </QueryParamProvider>
    </QueryClientProvider>
  );
};

export default DataListProvider;
