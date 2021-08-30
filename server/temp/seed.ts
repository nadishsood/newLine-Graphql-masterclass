// TypeScript may warn us that we're introducing a TypeScript file outside of the rootDir/, which are the files we want TypeScript code to be compiled (i.e. the files in the src/ folder). The reason we're placing the seed.ts file outside of our src/ folder (which is where our app is being instantiated and run) is because the seed() function we'll create is to only be used for development. The seed() function is to help populate mock data in our database so we can test the rest of our app. When we get to deploying our app, we won't need this seed file and parent temporary folder.

// Since the code in the seed file isn't needed for our app, we don't need TypeScript to compile it to valid JavaScript. In the tsconfig.json file, we can specify files and folders we don't want to be included in the TypeScript compilation process with the exclude option. We'll specify that the temp folder should be excluded from our TypeScript compilation.

// In our seed() function, we want the entire mock listings array to be inserted into our test_listings collection in our Mongo database. We've specified the type of a listing that resembles the shape of a listing collection document in the src/lib/types folder. To make sure we're inserting listings that resemble the shape that we expect, we'll import the Listing interface type and define the type of the mock listings array as Listing[].

import { ObjectId } from "mongodb";
import { connectDatabase } from "../src/database";
import { Listing } from "../src/lib/types";

const seed = async () => {
  try {
    console.log("[seed] : running...");

    const db = await connectDatabase();
    const listings: Listing[] = [
      {
        _id: new ObjectId(),
        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
        price: 10000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 2,
        rating: 5
      },
      {
        _id: new ObjectId(),
        title: "Luxurious home with private pool",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
        address: "100 Hollywood Hills Dr, Los Angeles, California",
        price: 15000,
        numOfGuests: 2,
        numOfBeds: 1,
        numOfBaths: 1,
        rating: 4
      },
      {
        _id: new ObjectId(),
        title: "Single bedroom located in the heart of downtown San Fransisco",
        image:
          "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
        address: "200 Sunnyside Rd, San Fransisco, California",
        price: 25000,
        numOfGuests: 3,
        numOfBeds: 2,
        numOfBaths: 2,
        rating: 3
      }
    ];

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log("[seed] : success");
  } catch {
    throw new Error("failed to seed database");
  }
};

seed();