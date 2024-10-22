import React, { useState, useEffect } from 'react';

const TableComponent = () => {
  const initialRows = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  const [rows, setRows] = useState(initialRows);
  const [isXNext, setIsXNext] = useState(true); // Track whose turn it is (X starts first)
  const [winner, setWinner] = useState(null); // Track the winner
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Message for modal
  const [showNextButton, setShowNextButton] = useState(false); // Control visibility of Next Game button

  useEffect(() => {
    // If it's the computer's turn and there's no winner yet, let the AI make a move
    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500); // AI makes a move after 500 milliseconds
      return () => clearTimeout(timer);
    }
  }, [isXNext, winner]);

  const handleCellClick = (rowIndex, cellIndex) => {
    if (rows[rowIndex][cellIndex] !== "" || winner) {
      return; // Do nothing if the cell is already filled or if there's a winner
    }

    const newRows = rows.map((row, rIndex) =>
      row.map((cell, cIndex) => {
        if (rIndex === rowIndex && cIndex === cellIndex) {
          return isXNext ? "X" : ""; // Set X for the player
        }
        return cell; // Return the current cell value for all other cells
      })
    );

    setRows(newRows);

    const newWinner = calculateWinner(newRows);
    if (newWinner) {
      setWinner(newWinner);
      setModalMessage(newWinner === "X" ? "You win!" : "You lose!");
      setShowNextButton(newWinner === "X"); // Show Next Game button only if player wins
      setModalVisible(true); // Show modal on game end
      return;
    }

    // Check for a tie
    if (newRows.flat().every(cell => cell !== "")) {
      setModalMessage("No win! It's a tie!");
      setModalVisible(true);
      return;
    }

    setIsXNext(false);
  };

  const makeComputerMove = () => {
    const emptyCells = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (rows[i][j] === "") {
          emptyCells.push({ i, j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newRows = rows.map((row, rIndex) =>
        row.map((cell, cIndex) => {
          if (rIndex === randomCell.i && cIndex === randomCell.j) {
            return "O"; // Set O for the computer
          }
          return cell; // Return the current cell value for all other cells
        })
      );

      setRows(newRows);

      const newWinner = calculateWinner(newRows);
      if (newWinner) {
        setWinner(newWinner);
        setModalMessage(newWinner === "X" ? "You win!" : "You lose!");
        setShowNextButton(newWinner === "X"); // Show Next Game button only if player wins
        setModalVisible(true); // Show modal on game end
        return;
      }

      // Check for a tie after computer's move
      if (newRows.flat().every(cell => cell !== "")) {
        setModalMessage("No win! It's a tie!");
        setModalVisible(true);
        return;
      }
    }

    setIsXNext(true); // Switch turn back to player
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[Math.floor(a / 3)][a % 3] &&
        squares[Math.floor(a / 3)][a % 3] === squares[Math.floor(b / 3)][b % 3] &&
        squares[Math.floor(a / 3)][a % 3] === squares[Math.floor(c / 3)][c % 3]) {
        return squares[Math.floor(a / 3)][a % 3]; // Return the winner (X or O)
      }
    }
    return null; // No winner found
  };

  const handleGameOver = (action) => {
    if (action === "replay") {
      resetGame();
    } else {
      alert("Next game feature is not implemented yet.");
      resetGame(); // For now, just reset the game
    }
    setModalVisible(false); // Hide modal after action
  };

  const resetGame = () => {
    setRows(initialRows);
    setWinner(null);
    setIsXNext(true); // Reset to X's turn
    setShowNextButton(false); // Reset Next Game button visibility
  };

  return (
    <div className="table-container">
      <h2>{winner ? `Winner: ${winner}` : `Next Player: ${isXNext ? "X" : "O"}`}</h2>
      <table border="1" style={{ textAlign: "center" }}>
        
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => handleCellClick(rowIndex, cellIndex)}
                  style={{ cursor: 'pointer', width: '50px', height: '50px' }} // Added width and height for better visuals
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button  className="button" onClick={() => handleGameOver("replay")}>Restart</button>
      {modalVisible && (
        <div className="modal">
          <div  className="modal-content">
            <h3>{modalMessage}</h3>
            <button  className="button" onClick={() => handleGameOver("replay")}>Replay</button>
            {showNextButton && (
              <button  className="button" onClick={() => handleGameOver("next")}>Next Game</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Basic styles for the modal



export default TableComponent;
