import { useState } from "react";

const Table = () => {
    const singleRowData = {
        name: "John Doe",
        age: 30,
        email: "john@example.com"
      };
    
      // Create an array with a single row to map over
      const rows = [singleRowData];
    
     // Create an array with a single row to map over
  

  // State to keep track of clicked cell
  const [clickedCell, setClickedCell] = useState(null);

  // Function to handle cell click
  const handleCellClick = (cell) => {
    setClickedCell(cell);
  };

    return (  
        <div className="Table">
             <table width="50%">
        <tbody>
        {rows.map((row, index) => (
          // Create three rows from the single row data
          [1, 2, 3,4].map((_, i) => (
            <tr key={`${index}-${i}`}>
              <td onClick={() => handleCellClick('name')}>{row.name} {clickedCell === 'name' ? 'X' : ''}</td>
              <td onClick={() => handleCellClick('age')}>{row.age} {clickedCell === 'age' ? 'X' : ''}</td>
              <td onClick={() => handleCellClick('email')}>{row.email} {clickedCell === 'email' ? 'X' : ''}</td>
            </tr>
          ))
        ))}
        </tbody>
      </table>
        </div>
    );
}
 
export default Table;