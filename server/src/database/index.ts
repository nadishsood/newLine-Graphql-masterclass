import { MongoClient } from "mongodb";

const user = "nadishsood";
const userPassword = "QW5671001ss@"; // user password
const cluster = "tinyhousetutorialcluste.crgyx"



const url = `mongodb+srv://${user}:${userPassword}@${cluster}.mongodb.net/main?retryWrites=true&w=majority`;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const connectDatabase = async () => {
    const client = await MongoClient.connect(url,{
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = client.db("main");
  
    return {
      listings: db.collection("test_listings")
    };
  };