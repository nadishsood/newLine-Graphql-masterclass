import { useState, useEffect } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
}

export const useQuery = <TData = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null
  });

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await server.fetch<TData>({ query });
      setState({ data });
    };

    fetchApi();
  }, [query]);

  return state;
};
//see Alexanders generics to understand how this TData is going to be set in Listings.tsx
// The State interface will contain the data object that will be returned from our API call. The shape of data will be from a type variable the interface will accept and be passed from the useQuery Hook function. We'll label the type variable the State interface is to accept as TData as well.
 // We'll pass in the State interface as the expected type variable of the useState Hook, and we'll initialize our state data object as null.

//  The fetchApi() function will be responsible for making the API request by running the server.fetch() function. As we run server.fetch(), we'll pass in the query payload it expects and a type variable of the data that is to be returned. We'll retrieve the data from the request and update the state property created in our Hook.

// The useQuery Hook isn't smart enough to recognize that the query parameter value is to be a constant value declared outside of the component. Even if the <Listings> component gets re-rendered on change, we'll still be referencing the same LISTINGS constant value. As a recommended approach mentioned by Dan Abramov - if a dependency (function or non-function value) is truly constant, there's no harm in placing it as part of the dependencies list of an effect.

