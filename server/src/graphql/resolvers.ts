// import { IResolvers } from 'apollo-server-express';
// import { Database, Listing } from "../lib/types";
// import { ObjectId } from "mongodb";


// export const resolvers: IResolvers = {
//     Query: {
//       listings: async (
//         _root: undefined,
//         _args: {},
//         { db }: { db: Database }
//       ): Promise<Listing[]> => {
//         return await db.listings.find({}).toArray();
//       }
//     },
//     Mutation: {
//       deleteListing: async (
//         _root: undefined,
//         { id }: { id: string },
//         { db }: { db: Database }
//       ): Promise<Listing> => {
//         const deleteRes = await db.listings.findOneAndDelete({
//           _id: new ObjectId(id)
//         });
  
//         if (!deleteRes.value) {
//           throw new Error("failed to delete listing");
//         }
  
//         return deleteRes.value;
//       }
//     },
//     Listing: {
//       id: (listing: Listing): string => listing._id.toString()
//     }
//   };


// // Why are we returning promise here in this mutation
// // We've customized our ESLint rules to not enforce the requirement of having to define explicit function return types since we're okay with TypeScript inferring the function return types whenever it can. However, in our resolver functions, it would be helpful to specify the return type to ensure we return the correct type of values for each function.


