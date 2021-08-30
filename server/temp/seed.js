"use strict";
// TypeScript may warn us that we're introducing a TypeScript file outside of the rootDir/, which are the files we want TypeScript code to be compiled (i.e. the files in the src/ folder). The reason we're placing the seed.ts file outside of our src/ folder (which is where our app is being instantiated and run) is because the seed() function we'll create is to only be used for development. The seed() function is to help populate mock data in our database so we can test the rest of our app. When we get to deploying our app, we won't need this seed file and parent temporary folder.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// Since the code in the seed file isn't needed for our app, we don't need TypeScript to compile it to valid JavaScript. In the tsconfig.json file, we can specify files and folders we don't want to be included in the TypeScript compilation process with the exclude option. We'll specify that the temp folder should be excluded from our TypeScript compilation.
// In our seed() function, we want the entire mock listings array to be inserted into our test_listings collection in our Mongo database. We've specified the type of a listing that resembles the shape of a listing collection document in the src/lib/types folder. To make sure we're inserting listings that resemble the shape that we expect, we'll import the Listing interface type and define the type of the mock listings array as Listing[].
var mongodb_1 = require("mongodb");
var database_1 = require("../src/database");
var seed = function () { return __awaiter(void 0, void 0, void 0, function () {
    var db, listings, _i, listings_1, listing, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                console.log("[seed] : running...");
                return [4 /*yield*/, database_1.connectDatabase()];
            case 1:
                db = _b.sent();
                listings = [
                    {
                        _id: new mongodb_1.ObjectId(),
                        title: "Clean and fully furnished apartment. 5 min away from CN Tower",
                        image: "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
                        address: "3210 Scotchmere Dr W, Toronto, ON, CA",
                        price: 10000,
                        numOfGuests: 2,
                        numOfBeds: 1,
                        numOfBaths: 2,
                        rating: 5
                    },
                    {
                        _id: new mongodb_1.ObjectId(),
                        title: "Luxurious home with private pool",
                        image: "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
                        address: "100 Hollywood Hills Dr, Los Angeles, California",
                        price: 15000,
                        numOfGuests: 2,
                        numOfBeds: 1,
                        numOfBaths: 1,
                        rating: 4
                    },
                    {
                        _id: new mongodb_1.ObjectId(),
                        title: "Single bedroom located in the heart of downtown San Fransisco",
                        image: "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
                        address: "200 Sunnyside Rd, San Fransisco, California",
                        price: 25000,
                        numOfGuests: 3,
                        numOfBeds: 2,
                        numOfBaths: 2,
                        rating: 3
                    }
                ];
                _i = 0, listings_1 = listings;
                _b.label = 2;
            case 2:
                if (!(_i < listings_1.length)) return [3 /*break*/, 5];
                listing = listings_1[_i];
                return [4 /*yield*/, db.listings.insertOne(listing)];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                console.log("[seed] : success");
                return [3 /*break*/, 7];
            case 6:
                _a = _b.sent();
                throw new Error("failed to seed database");
            case 7: return [2 /*return*/];
        }
    });
}); };
seed();
