function createPlayer(name, mark, isComputer) {
    let isWinner = false;
    // TODO: Change as soon as we have user input
    const chooseTile = (emptyTiles) => {
        const randIdx = Math.floor(Math.random() * emptyTiles.length);
        return emptyTiles[randIdx].index;
    }
    return { name, mark, isComputer, isWinner, chooseTile }
}

function createBoard() {
    const output = [];
    for (let i = 0; i < 9; i++) {
        output.push({ index: i, content: "" });
    }
    return output;
}

const gameState = (function () {
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]
    const board = createBoard();
    const players = [
        createPlayer("Drake", "X", false),
        createPlayer("Josh", "O", true)];
    let turn = 0;

    const getEmptyTiles = () => board.slice(0).filter(tile => tile.content === "");

    const playTurn = (player) => {
        const chosenTile = player.chooseTile(getEmptyTiles());
        board.find(tile => tile.index === chosenTile).content = player.mark;
        return `${player.name} chose tile ${chosenTile + 1}`;
    }

    const checkForVictory = (player) => {
        for (const comb of winCombinations) {
            const marks = comb.map(idx => board[idx].content);
            if (marks.every(tileMark => tileMark === player.mark)) {
                player.isWinner = true;
                return;
            }
        }
    }

    const shouldContinue = () => !players.some(p => p.isWinner)
        && getEmptyTiles().length > 0;

    const play = () => {
        while (shouldContinue()) {
            console.log(`------ TURN ${++turn} ------`);
            for (const p of players) {
                const turnResult = playTurn(p);
                console.log(turnResult);
                checkForVictory(p);
                if (p.isWinner) break;
            }
            console.log(board)
        }
    }

    return { play };
})();

gameState.play();