import React from 'react'
import {Square} from "../Square/Square";
import "./Board.css"

export class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
            status: '',
            gameOver: false
        };
    }

    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>
    }

    handleClick(i) {
        this.performMove(i);
    }

    performMove(i) {
        if (!this.state.gameOver) {
            const squares = this.state.squares.slice();

            if (this.state.squares[i] === null) {

                squares[i] = this.state.xIsNext ? 'X' : 'O';
                this.setState({squares: squares});
                this.checkTurn(squares);
            }
        }
    }

    checkTurn(squares) {
        let winner = this.calculateWinner(squares);

        if (winner) {
            this.setState({gameOver: true, status: 'The winner is: ' + (winner)});

        } else {
            this.setState({
                squares: squares,
                xIsNext: !this.state.xIsNext,
                status: 'The next turn for: ' + (this.state.xIsNext ? 'O' : 'X')
            });
        }
    }

    getStatus() {
        return this.state.status;
    }

    calculateWinner(squares) {
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

    render() {
        return <div>
            <div className="status">{this.getStatus()}</div>
            <div className="board">
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        </div>
    }
}
