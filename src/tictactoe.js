// 2023-04-03 01:08:35
// tictactoe React app 코드를 만들어줘

import React, { useState } from 'react';

// 게임 보드를 렌더링하는 함수
function Board({ squares, onClick }) {
    // 각각의 보드 칸을 렌더링하는 함수
    function renderSquare(i) {
        return (
            <button className="square" onClick={() => onClick(i)}>
                {squares[i]}
            </button>
        );
    }

    // 보드 렌더링
    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

// 게임을 관리하는 함수
function Game() {
    // 게임 상태를 저장하는 state 변수
    const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    // 현재 게임 상태를 가져오는 함수
    const current = history[stepNumber];
    const winner = calculateWinner(current.squares);

    // 게임 보드를 클릭했을 때 실행되는 함수
    function handleClick(i) {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = current.squares.slice();
        if (winner || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(newHistory.concat([{ squares: squares }]));
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    }

    // 게임 상태를 역추적하는 함수
    function jumpTo(step) {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    }

    // 게임 승자를 계산하는 함수
    function calculateWinner(squares) {
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
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    // 게임 렌더링
    const moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={i => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}

export default Game;