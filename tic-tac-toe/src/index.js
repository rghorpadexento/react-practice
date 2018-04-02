import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

{
  /* function used to render single square.
  Actually it was declared as Class previously but later changed to function
  Because it is not doing anything else rather than rendering the single square
If you have a class with simple render element you can change it to function for better use */
}
function Square (props) {
  return (
    <button
      className='square'
      onClick={props.onClick}
      style={{ color: props.color }}
    >
      {props.value}
    </button>
  )
}

{
  /* Board class having some logic of rendering each square and creating board using for loops
It is internally using Square component/function to render the elements
It's a stateless component as there is no state defined */
}
class Board extends React.Component {
  renderSquare (i, color) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        color={color}
      />
    )
  }

  createBoard = () => {
    let row = []
    var counter = 0
    const [first, second, third] = this.props.colorSquares
      ? this.props.colorSquares
      : ''
    for (let i = 0; i < 3; i++) {
      let col = []
      for (let j = 0; j < 3; j++) {
        const color = second &&
          (counter == first || counter == second || counter == third)
          ? 'blue'
          : ''

        col.push(this.renderSquare(counter, color))
        counter++
      }
      row.push(<div className='board-row'>{col}</div>)
    }
    return row
  }

  render () {
    return (
      <div>
        {this.createBoard()}
      </div>
    )
  }
}

{
  /* This is Main statefull component which contains and transfers the props to other components.
  Internally calls Board component to render board each time user clicks on square */
}
class Game extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          valueRowCol: Array(2).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      moveOrder: true
    }
  }

  handleClick (i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    const valRowCol = getRowCol(i)
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([{ squares, valRowCol }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  jumpTo (step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  reverse () {
    const order = this.state.moveOrder
    this.setState({ moveOrder: !order })
  }

  render () {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    const moves = history.map((step, move) => {
      const isCurrentMove = !!(this.state.stepNumber === move && move)
      const colorMove = isCurrentMove ? 'Blue' : ''
      const desc = move
        ? 'Go to Move #' + move + '    =>    ' + step.valRowCol
        : 'Go to game start'
      return (
        <li key={move}>
          <button
            style={{ color: colorMove }}
            onClick={() => this.jumpTo(move)}
          >
            {desc}
          </button>
        </li>
      )
    })
    const newMoves = this.state.moveOrder ? moves : moves.reverse()
    const order = this.state.moveOrder ? 'Descending Moves' : 'Ascending Moves'

    let status
    if (winner) {
      status = 'Winner :' + winner.winner
    } else if (this.state.stepNumber === 9) {
      status = 'Match Draw'
    } else {
      status = 'Next Player:' + (this.state.xIsNext ? 'X' : 'O')
    }
    const colorSquares = winner && winner.squares ? winner.squares : null
    return (
      <div className='game'>
        <div className='game-board'>
          <Board
            squares={current.squares}
            colorSquares={colorSquares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className='game-info'>
          <div>
            <button onClick={() => this.reverse()}>{order}</button>
          </div>
          <div>{status}</div>
          <div>{newMoves}</div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('root'))

function calculateWinner (squares) {
  const lines = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8]
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        squares: lines[i]
      }
    }
  }
  return null
}

function getRowCol (buttonClicked) {
  const rowCol = [
    [1, 1],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 1],
    [3, 2],
    [3, 3]
  ]

  return rowCol[buttonClicked]
}
