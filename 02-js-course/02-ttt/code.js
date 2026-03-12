function createPlayer(name, mark) {
    let isWinner = false;

    return { name, mark, isWinner }
}

function createComputerPlayer(name, mark) {
    let isWinner = false;
    const isComputer = true;
    const chooseTile = (emptyTiles) => {
        const randIdx = Math.floor(Math.random() * emptyTiles.length);
        return emptyTiles[randIdx].index;
    }

    return { name, mark, isWinner, chooseTile, isComputer}
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
        createPlayer("Drake", "❌"),
        createComputerPlayer("Josh", "⭕")];

    let emptyTiles = board.length;
    let nextPlayerIdx = 0;

    const getEmptyTiles = () => board.slice(0).filter(tile => tile.content === "");

    const playTurn = (tileIdx) => {
        let next = players[nextPlayerIdx];
        tileIdx = tileIdx && !next.isComputer ? tileIdx : next.chooseTile(getEmptyTiles());
        
        board[tileIdx].content = next.mark;
        checkForVictory(next);
        nextPlayerIdx = (nextPlayerIdx + 1) % players.length;
        next = players[nextPlayerIdx];
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
        && emptyTiles > 0;

    return {board, playTurn };
})();

const gameInterface = (function (doc, state) {
    const boardBtns = doc.querySelectorAll(".board>button");
    const nextBtn = doc.querySelector(".next-btn");

    boardBtns.forEach((btn, i) => {
        btn.addEventListener('click', (e) => {
            const { tile } = e.target.dataset;
            state.playTurn(tile);
            e.target.textContent = state.board[tile].content;
            e.target.classList.remove('empty');
            e.target.classList.add('marked');
            e.target.disabled = true;
        })
    });

    nextBtn.addEventListener('click', () => {
        state.playTurn();
        boardBtns.forEach((btn, i) => {
            const text = state.board[i].content;
            btn.textContent = text;
            if (text) {
                btn.classList.remove('empty');
                btn.classList.add('marked');
                btn.disabled = true;
            }
        });
    })


})(document, gameState)