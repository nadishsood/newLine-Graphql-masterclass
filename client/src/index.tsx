import React from 'react';
import {render} from 'react-dom';
import reportWebVitals from './reportWebVitals';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Listings } from "./sections";
const client = new ApolloClient({
  uri: "/api"
});


render(
  <ApolloProvider client={client}>

    <Listings title="dummyTitle"/>
  </ApolloProvider>, 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
