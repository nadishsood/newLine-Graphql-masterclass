import {useState, useEffect} from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  Listing,
  ListingsData
} from "./types";

const LISTINGS = `
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
const DELETE_LISTING = `
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
  const [listings, setListings] = useState<Listing[] | null>(null);

  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    // console.log(data); // check the console to see the listings data from our GraphQL Request!
    setListings(data.listings);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const deleteListing = async (id: string) => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id, // hardcoded id variable,
      },
    });
    // console.log(data); // check the console to see the result of the mutation!
    fetchListings();
  };

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      
    </div>
  );
};

// TypeScript checks props and types

// 6.5
// Although the custom server fetch() function we've established in the last lesson works, the data being returned isn't appropriately typed. In this lesson, we'll take advantage of TypeScript generics to ensure we get queried data from our server fetch() function with the appropriate type.

// FunctionComponent is a genericn  interface that excpects a type variable which is used to define the props on the component - see how in the video: Functional Components & TypeScript

// here also if we define FunctionComponent<Props>, then we dont have to define the ({}=>Props) -- same thing with quip mongodb collections interface.
// When using the FunctionComponent interface type, we also no longer need to specify the type of props from the argument itself.

//FC interface can also accept children.
//FC Interface allows proptypes etc to be used.
//FC
