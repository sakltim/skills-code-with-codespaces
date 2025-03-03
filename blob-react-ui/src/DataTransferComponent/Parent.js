// import React from "react";
// import { useState } from 'react';
import Child from "./Child";
import React, { createContext } from 'react';

export const MyContext = createContext();

function Parent() {
  const sharedValue = "Shared via Context";
  return (
    <MyContext.Provider value={sharedValue}>
      <Child />
    </MyContext.Provider>
  );
}

// function Parent() {
//   const [childData, setChildData] = useState("");

//   const handleDataFromChild = (data) => {
//     console.log("Data from child before: ", data.childData);
//     setChildData(data);
//     console.log("Data from child after: ", data.childData);
//   };

//   return (
//     <div>
//       <Child onData={handleDataFromChild} />
//       <p>Data from child: {childData}</p>
//     </div>
//   );
// }

// function Parent() {
//     const greeting = "Hello message from Parent!";
//     return <Child message={greeting} />;
//   }
  
  export default Parent;