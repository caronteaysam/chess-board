const global_chess_style = document.createElement ( 'style' );
global_chess_style.innerText = `
    .chess-board {
        --size: min(100vw,100vh);
        height: var(--size);
        width: var(--size);
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        grid-template-rows: repeat(8, 1fr);
        border: calc(var(--size) * .02) solid #333333;
        margin: auto;
        box-sizing: border-box;
    }

    .chess-piece {
        position: absolute;
        width: 100%;
        height: 100%;
    }

    .chess-square {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .chess-square-selected {
        border: calc(var(--size) * .01) solid green;
        box-sizing: border-box;
    }
`;
document.head.appendChild ( global_chess_style );

function createPieceTeam ( img_url ) {

    return function ( div ) {
        
        const img = document.createElement ( 'img' );
        img.classList.add ( `chess-piece` );
        img.src = img_url;
        img.style.userSelect = 'none';

        return img;
    }
}

function createSquareTeam ( background_color, color ) {

    const id = createSquareTeam.id++;
    global_chess_style.innerText += `
        .chess-square-${id} {
            background-color: ${background_color};
            color: ${color};
        }
    `;

    return function ( ) {

        const div = document.createElement ( 'div' );
        div.classList.add ( `chess-square` );
        div.classList.add ( `chess-square-${id}` );

        return div;
    }
}; createSquareTeam.id = 0;

function createBoard ( square_team_1, square_team_2 ) {

    const board = document.createElement ( 'section' );
    board.classList.add ( 'chess-board' );

    // 64 is the board size ( 8 * 8 )
    for ( let i = 0; i < 64; i++ ) {

        const offset  = ( i / 8 | 0 ) % 2;
        const is_team_2 = ( i + offset ) % 2;

        const square = is_team_2 ? square_team_2 ( ) : square_team_1 ( );

        board.appendChild ( square );
    }

    return board;
}

function createChess ( config ) {

    const board = createBoard ( config.square1, config.square2 );

    const children = board.children;

    // team 1
    children[7 * 8 + 0].appendChild ( config.pieces.rook.team1 ( ));
    children[7 * 8 + 1].appendChild ( config.pieces.knight.team1 ( ));
    children[7 * 8 + 2].appendChild ( config.pieces.bishop.team1 ( ));
    children[7 * 8 + 3].appendChild ( config.pieces.queen.team1 ( ));
    children[7 * 8 + 4].appendChild ( config.pieces.king.team1 ( ));
    children[7 * 8 + 5].appendChild ( config.pieces.bishop.team1 ( ));
    children[7 * 8 + 6].appendChild ( config.pieces.knight.team1 ( ));
    children[7 * 8 + 7].appendChild ( config.pieces.rook.team1 ( ));
    
    // team 2
    children[0 * 8 + 0].appendChild ( config.pieces.rook.team2 ( ));
    children[0 * 8 + 1].appendChild ( config.pieces.knight.team2 ( ));
    children[0 * 8 + 2].appendChild ( config.pieces.bishop.team2 ( ));
    children[0 * 8 + 3].appendChild ( config.pieces.queen.team2 ( ));
    children[0 * 8 + 4].appendChild ( config.pieces.king.team2 ( ));
    children[0 * 8 + 5].appendChild ( config.pieces.bishop.team2 ( ));
    children[0 * 8 + 6].appendChild ( config.pieces.knight.team2 ( ));
    children[0 * 8 + 7].appendChild ( config.pieces.rook.team2 ( ));

    for ( let i = 0; i < 8; i++ ) {

        children[6 * 8 + i].appendChild ( config.pieces.pawn.team1 ( ));
        children[1 * 8 + i].appendChild ( config.pieces.pawn.team2 ( ));
    }

    let last_selected = undefined;

    for ( let i = 0; i < 64; i++ ) {

        children[i].addEventListener ( 'click', e => {

            if ( last_selected ) last_selected.classList.remove ( 'chess-square-selected' );
            e.target.classList.add ( 'chess-square-selected' );
            last_selected = e.target;
        } );
    }

    document.body.appendChild ( board );
}

const DEFAULTS = {

    square1: createSquareTeam ( '#F0D9B5', '#B58863' ),
    square2: createSquareTeam ( '#B58863', '#F0D9B5' ),
    pieces: {
        bishop: {
            team1: createPieceTeam ( './assets/images/pieces/bishop-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/bishop-dark.svg' )
        },
        king: {
            team1: createPieceTeam ( './assets/images/pieces/king-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/king-dark.svg' )
        },
        knight: {
            team1: createPieceTeam ( './assets/images/pieces/knight-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/knight-dark.svg' )
        },
        pawn: {
            team1: createPieceTeam ( './assets/images/pieces/pawn-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/pawn-dark.svg' )
        },
        queen: {
            team1: createPieceTeam ( './assets/images/pieces/queen-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/queen-dark.svg' )    
        },
        rook: {
            team1: createPieceTeam ( './assets/images/pieces/rook-light.svg' ),
            team2: createPieceTeam ( './assets/images/pieces/rook-dark.svg' )
        },
    }
}

// CHESS 1
createChess ( DEFAULTS );

// CHESS 2
createChess ( Object.assign ( {}, DEFAULTS, {

    square1: createSquareTeam ( '#5AAA95', '#B58863' ),
    square2: createSquareTeam ( '#087F8C', '#F0D9B5' ),
}));

// CHESS 3
createChess ( Object.assign ( {}, DEFAULTS, {

    square1: createSquareTeam ( '#7E5A9B', '#B58863' ),
    square2: createSquareTeam ( '#63458A', '#F0D9B5' ),
}));