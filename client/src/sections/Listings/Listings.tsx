import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

// The Hooks in React Apollo expect our GraphQL documents to be constructed as trees.
// We can have our GraphQL documents be created as abstract trees with the help of the gql template tag just like we've seen in our Node server application

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, refetch, loading, error } = useQuery<ListingsData>(LISTINGS);

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);


  const handleDeleteListing = async (id: string) => {
    await deleteListing({variables: {id}});
    refetch();
  };

  const listings = data ? data.listings : null;

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => handleDeleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  if(loading){
    return <h2>Loading</h2>
  }

  if(error){
    return <h2>Something went wrong - try again later</h2>
  }

  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h4>Deletion in progress...</h4>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h4>
      Uh oh! Something went wrong with deleting :(. Please try again soon.
    </h4>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
    </div>
  );
};





//Without useQuery custom hook:


// import {useState, useEffect} from "react";
// import { server } from "../../lib/api";
// import {
//   DeleteListingData,
//   DeleteListingVariables,
//   Listing,
//   ListingsData
// } from "./types";

// const LISTINGS = `
//   query Listings {
//     listings {
//       id
//       title
//       image
//       address
//       price
//       numOfGuests
//       numOfBeds
//       numOfBaths
//       rating
//     }
//   }
// `;
// const DELETE_LISTING = `
//   mutation DeleteListing($id: ID!) {
//     deleteListing(id: $id) {
//       id
//     }
//   }
// `;

// interface Props {
//   title: string;
// }

// export const Listings = ({ title }: Props) => {
//   const [listings, setListings] = useState<Listing[] | null>(null);

//   const fetchListings = async () => {
//     const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
//     // console.log(data); // check the console to see the listings data from our GraphQL Request!
//     setListings(data.listings);
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const deleteListing = async (id: string) => {
//     const { data } = await server.fetch<
//       DeleteListingData,
//       DeleteListingVariables
//     >({
//       query: DELETE_LISTING,
//       variables: {
//         id, // hardcoded id variable,
//       },
//     });
//     // console.log(data); // check the console to see the result of the mutation!
//     fetchListings();
//   };

//   const listingsList = listings ? (
//     <ul>
//       {listings.map(listing => {
//         return (
//           <li key={listing.id}>
//             {listing.title}{" "}
//             <button onClick={() => deleteListing(listing.id)}>Delete</button>
//           </li>
//         );
//       })}
//     </ul>
//   ) : null;

//   return (
//     <div>
//       <h2>{title}</h2>
//       {listingsList}
      
//     </div>
//   );
// };

// TypeScript checks props and types

// 6.5
// Although the custom server fetch() function we've established in the last lesson works, the data being returned isn't appropriately typed. In this lesson, we'll take advantage of TypeScript generics to ensure we get queried data from our server fetch() function with the appropriate type.

// FunctionComponent is a genericn  interface that excpects a type variable which is used to define the props on the component - see how in the video: Functional Components & TypeScript

// here also if we define FunctionComponent<Props>, then we dont have to define the ({}=>Props) -- same thing with quip mongodb collections interface.
// When using the FunctionComponent interface type, we also no longer need to specify the type of props from the argument itself.

//FC interface can also accept children.
//FC Interface allows proptypes etc to be used.
//FC


// Our listings GraphQL query doesn't depend on variables but we can very well have passed in variables to our Hook to consume if needed. However, we'll have to be careful here since if our component ever re-renders, a new variables object will be passed into our Hook if variables are defined in the component (unlike the query document). If we were to do this, we may need to take additional steps to perhaps memoize the variables being passed as well. This is where a useRef Hook may need to be used.
