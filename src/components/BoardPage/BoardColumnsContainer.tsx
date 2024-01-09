import React from "react";

function BoardColumnsContainer() {
  return <div></div>;
}

export default BoardColumnsContainer;

// export default BoardColumnsContainer;
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const BoardDetailPage = () => {
//   const { id } = useParams();
//   const [board, setBoard] = useState(null);

//   useEffect(() => {
//     // Fetch board data based on the id parameter
//     const fetchBoardData = async () => {
//       try {
//         const response = await fetch(`/api/boards/${id}`);
//         const data = await response.json();
//         setBoard(data);
//       } catch (error) {
//         console.error('Error fetching board data', error);
//       }
//     };

//     fetchBoardData();
//   }, [id]);

//   return (
//     <div>
//       {/* Display board columns and cards here */}
//       {board && (
//         <div>
//           <h2>{board.name}</h2>
//           {/* ... other board details ... */}
//         </div>
//       )}
//     </div>
//   );
// };

// export default BoardDetailPage;
