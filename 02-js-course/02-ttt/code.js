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

    return { name, mark, isWinner, chooseTile, isComputer }
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
    const players = [];
    let nextPlayerIdx = 0;
    let board = createBoard();

    const addPlayer = ({ name, isComputer }) => {
        let newP = isComputer ? createComputerPlayer(name, "⭕") :
            createPlayer(name, "❌");
        players.push(newP);
    }

    const getEmptyTiles = () => board.slice(0).filter(tile => tile.content === "");

    const isNextComputer = () => "isComputer" in players[nextPlayerIdx]
        && players[nextPlayerIdx].isComputer;

    const playTurn = (tileIdx) => {
        if (!shouldContinue()) return;
        let next = players[nextPlayerIdx];
        tileIdx = tileIdx && !next.isComputer ? tileIdx : next.chooseTile(getEmptyTiles());

        board[tileIdx].content = next.mark;
        const winnerComb = checkForVictory(next);
        nextPlayerIdx = (nextPlayerIdx + 1) % players.length;
        next = players[nextPlayerIdx];
        if (winnerComb.length > 0) return winnerComb;
    }

    const checkForVictory = (player) => {
        for (const comb of winCombinations) {
            const marks = comb.map(idx => board[idx].content);
            if (marks.every(tileMark => tileMark === player.mark)) {
                player.isWinner = true;
                return comb;
            }
        }
        return [];
    }
    const wipe = () => {
        board = createBoard();
        players.forEach(p => p.isWinner = false);
        nextPlayerIdx = 0;
    }

    const shouldContinue = () => !players.some(p => p.isWinner);
    const getBoard = () => board.slice(0);

    return { playTurn, isNextComputer, addPlayer, wipe, getBoard };
})();

(function (doc, state) {
    const boardBtns = doc.querySelectorAll(".board>button");
    const nextBtn = doc.querySelector(".next-btn");
    const setupForm = doc.querySelector(".game-setup");
    const restartBtn = doc.querySelector('.restart-btn');

    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (!data.p1.length) {
            doc.querySelector("#p1").classList.add("invalid-name");
            return;
        }
        state.addPlayer({ name: data.p1, isComputer: false });
        state.addPlayer({ name: data.p2, isComputer: "is-computer" in data })
        e.target.classList.add("hidden");
        const gameInfo = doc.querySelector(".game-info");
        gameInfo.classList.toggle("hidden");
        const spans = gameInfo.querySelectorAll("p>span");
        spans[0].textContent = data.p1;
        spans[1].textContent = data.p2;
    })

    const processWin = (winnerComb) => {
        boardBtns.forEach(btn => {
            btn.classList.remove('empty');
            if (winnerComb.some(num => num === +btn.dataset.tile)) {
                btn.classList.add('winner', 'marked');
            }
            btn.disabled = true;
        });
        nextBtn.disabled = true;
        doc.querySelector(".restart").classList.remove('hidden');
    }

    boardBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (state.isNextComputer()) return;
            console.log(state.getBoard());
            const { tile } = e.target.dataset;
            const winnerComb = state.playTurn(tile);
            e.target.disabled = true;
            e.target.textContent = state.getBoard()[tile].content;

            if (winnerComb) {
                processWin();
                return;
            }

            e.target.classList.remove('empty');
            e.target.classList.add('marked');
        });

        restartBtn.addEventListener('click', () => {
            boardBtns.forEach(btn => {
                btn.className = "";
                btn.classList.add("empty");
                btn.textContent = "";
                btn.disabled = false;
            });
            state.wipe();
            nextBtn.disabled = false;
        })
    });

    nextBtn.addEventListener('click', () => {
        if (!state.isNextComputer()) return;
        const winComb = state.playTurn();
        const board = state.getBoard();
        boardBtns.forEach((btn, i) => {
            btn.textContent = board[i].content;
            if (board[i].content) {
                btn.classList.remove('empty');
                btn.classList.add('marked');
                btn.disabled = true;
            }
        });
        if (winComb) {
            processWin(winComb);
        }
    })


})(document, gameState)