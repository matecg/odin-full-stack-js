function createPlayer(name, mark, isComputer) {
    // TODO: Change as soon as we have user input
    const chooseTile = (emptyTiles) => {
        return Math.floor(Math.random() * emptyTiles.length);
    }
    return { name, mark, isComputer }
}

function createBoard() {
    const output = [];
    for (let i = 0; i < 9; i++) {
        output.push({ tile: i, content: "" });
    }
    return output;
}

const gameState = (function () {
    const winSequences = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    const board = createBoard();
    const players = [
        createPlayer("Drake", "X", false),
        createPlayer("Josh", "O", true)];
    let turn = 0;


    return { turn, board, players };
})();

console.log(gameState.board);
console.log(gameState.players);