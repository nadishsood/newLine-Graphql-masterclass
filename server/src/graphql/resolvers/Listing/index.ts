import { IResolvers } from 'apollo-server-express';
import { Database, Listing } from "../../../lib/types"
import { ObjectId } from "mongodb";


export const listingResolvers: IResolvers = {
    Query: {
      listings: async (
        _root: undefined,
        _args: {},
        { db }: { db: Database }
      ): Promise<Listing[]> => {
        return await db.listings.find({}).toArray();
      }
    },
    Mutation: {
      deleteListing: async (
        _root: undefined,
        { id }: { id: string },
        { db }: { db: Database }
      ): Promise<Listing> => {
        const deleteRes = await db.listings.findOneAndDelete({
          _id: new ObjectId(id)
        });
  
        if (!deleteRes.value) {
          throw new Error("failed to delete listing");
        }
  
        return deleteRes.value;
      }
    },
    //the returns from listings and deleteListings go into the args of this child Listing,-- see 4.7 at 8:10 nicely 
    Listing: {
      //trivial resolvers because root field passes a Listing object and values can be directly inferred from there. 
      // title: (listing: Listing) => listing.title, 
      // image: (listing: Listing) => listing.image, 

      //we have to do this because in object passed by the root field, the types don't match with what our api expects
      //so explicit resolvers, _id has to be converted to a string because in schema the type of id is string
      id: (listing: Listing): string => listing._id.toString()
    }
  };


// Why are we returning promise here in this mutation
// We've customized our ESLint rules to not enforce the requirement of having to define explicit function return types since we're okay with TypeScript inferring the function return types whenever it can. However, in our resolver functions, it would be helpful to specify the return type to ensure we return the correct type of values for each function.


// Promise<Listing[] means this fn will return a promise which when resolved will be an array of listings.


// We'll destruct the db property from the third context parameter. The type of the db object is the Database interface we've set up in the src/lib/types.ts file. We'll import the Database interface and assign the type of the db object to the Database interface type.