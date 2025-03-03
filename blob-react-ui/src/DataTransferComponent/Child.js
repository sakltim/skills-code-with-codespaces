import React, { useContext } from 'react';
import { MyContext } from './Parent';

// function Child({ message }) {
//     return <div>Child Div with Parent Message - {message}</div>;
//   }

// function Child({ onData }) {
//     console.log("Child Component");
//     console.log(onData.childData);
//     const message = "Hello message from Child!";
//     return (
//       <button onClick={() => onData("Hello message from Child!")}>
//         Child Button Send Data to Parent
//       </button>
//     );
//   }

function Child() {
    const value = useContext(MyContext);
    return <div>{value}</div>;
  }

  
  export default Child;