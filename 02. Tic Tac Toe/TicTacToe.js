// prettier-ignore
const winConditions = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

const TicTacToe = $container => {
  let state = {
    player: 'X',
    board: new Array(9).fill(''),
    isDraw: false,
    isTicTacToe: false,
  };

  // prettier-ignore
  const render = () => {
    const { player, board } = state;
    let { isTicTacToe, isDraw } = state;

    isDraw = board.every(user => user !== '');
    isTicTacToe = winConditions.some(([A, B, C]) => board[A] && board[A] === board[B] && board[B] === board[C]);

    $container.innerHTML = `
      <h1 class="title">Tic Tac Toe</h1>
      <div class="game">
        <div class="game-status">
          ${isTicTacToe ? `Winner is ${player === 'O' ? 'X' : 'O'}` : isDraw ? 'Draw' : `Next Player: ${player}`}
        </div>
        <div class="game-grid">
          ${board.map((player, id) => `<div class="game-grid-item" data-id="${id}">${player}</div>`).join('')}
        </div>
        <button class="game-reset">Try again?</button>
      </div>`;
  };

  // prettier-ignore
  const setState = (newState = {
    player: 'X',
    board: new Array(9).fill(''),
    isDraw: false,
    isTicTacToe: false,
  }) => {
    state = { ...state, ...newState };
    render();
  };

  const placeTurn = ({ dataset, textContent }) => {
    if (state.isDraw || state.isTicTacToe || textContent) return;

    const { board } = state;
    board[dataset.id] = state.player;

    setState({ board, player: state.player === 'X' ? 'O' : 'X' });
  };

  document.addEventListener('DOMContentLoaded', render);

  document.addEventListener('click', e => {
    if (!e.target.matches('.game-grid-item, .game-reset')) return;

    if (e.target.classList.contains('game-grid-item')) placeTurn(e.target);
    else if (e.target.classList.contains('game-reset')) setState();
  });
};

export default TicTacToe;
