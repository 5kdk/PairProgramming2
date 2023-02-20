const TicTacToe = $container => {
  let state = {
    player: 'X',
    board: new Array(9).fill(''),
    isDraw: false,
    isTicTacToe: false,
  };

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // prettier-ignore
  const render = () => {
    state.isDraw = state.board.every(user => user !== '');
    
    for(const [one, two, three] of winConditions) {
      if (state.board[one] && state.board[one] === state.board[two] && state.board[two] === state.board[three]) state.isTicTacToe = true;
    };

    const { player, board, isDraw, isTicTacToe } = state;
    
    $container.innerHTML = `
      <h1 class="title">Tic Tac Toe</h1>
      <div class="game">
        <div class="game-status">${
          isDraw
            ? 'Draw'
            : isTicTacToe
            ? `Winner is ${player === 'O' ? 'X' : 'O'}`
            : `Next Player: ${player}`
        }</div>
        <div class="game-grid">
          ${board.map((player, id) =>
            `<div class="game-grid-item" data-id="${id}">${player}</div>`
          ).join('')}
        </div>
        <button class="game-reset">Try again?</button>
      </div>`;
  };

  const setState = newState => {
    state = { ...state, ...newState };
    render();
  };

  const play = id => {
    if (state.isDraw || state.isTicTacToe) return;

    let board = state.board;
    board[id] = state.player;

    setState({ board, player: state.player === 'X' ? 'O' : 'X' });
  };

  // at initial load
  window.addEventListener('DOMContentLoaded', render);

  // each play
  window.addEventListener('click', e => {
    if (!e.target.classList.contains('game-grid-item') || e.target.textContent) return;

    play(e.target.dataset.id);
  });

  // reset button
  window.addEventListener('click', e => {
    if (!e.target.classList.contains('game-reset')) return;

    setState({ player: 'X', board: new Array(9).fill(''), isDraw: false, isTicTacToe: false });
  });
};

export default TicTacToe;
