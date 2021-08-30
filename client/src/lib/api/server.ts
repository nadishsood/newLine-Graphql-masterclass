interface Body <TVariables>{
    query: string;
    variables?: TVariables
  }
  
//   export const server = {
//     fetch: async (body: Body) => {
//       const res = await fetch("/api", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(body)
//       });
  
//       return res.json();
//     }
//   };

export const server = {
    //default value for Tdata is any.
    fetch: async <TData = any, TVariables = any>(body: Body<TVariables>) => {
      const res = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      //so when the promise resolves it will have a data field which will/should be of type TData
      return res.json() as Promise<{data: TData}>;
    }
  }

  
//   At this moment, our server.fetch() method is a promise that when resolved returns a data type of any. This isn't strongly typed so we'll revise this in an upcoming lesson. For now, we'll verify if we're able to interact with the Node server from the React client.