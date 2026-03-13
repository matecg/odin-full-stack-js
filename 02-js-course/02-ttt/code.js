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
    const board = createBoard();
    const players = [];
    let nextPlayerIdx = 0;

    const addPlayer = ({name, isComputer}) => {
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

    const shouldContinue = () => !players.some(p => p.isWinner);

    return { board, playTurn, isNextComputer, addPlayer};
})();

(function (doc, state) {
    const boardBtns = doc.querySelectorAll(".board>button");
    const nextBtn = doc.querySelector(".next-btn");
    const setupForm = doc.querySelector(".game-setup");

    setupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        // console.log(data.p1.length)
        if (!data.p1.length) {
            doc.querySelector("#p1").classList.toggle("invalid-name");
            return;
        }
        state.addPlayer({name:data.p1, isComputer:false});
        state.addPlayer({name:data.p2, isComputer: "is-computer" in data})
        e.target.classList.add("hidden");
        doc.querySelector(".game-info").classList.toggle("hidden");
    })

    boardBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            if (state.isNextComputer()) return;
            const { tile } = e.target.dataset;
            state.playTurn(tile);
            e.target.textContent = state.board[tile].content;
            e.target.classList.remove('empty');
            e.target.classList.add('marked');
            e.target.disabled = true;
        })
    });

    nextBtn.addEventListener('click', () => {
        if (!state.isNextComputer()) return;
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