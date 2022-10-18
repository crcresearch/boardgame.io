/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

function IsVictory(cells) {
  const positions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const isRowComplete = (row) => {
    const symbols = row.map((i) => cells[i]);
    return symbols.every((i) => i !== null && i === symbols[0]);
  };

  return positions.map(isRowComplete).some((i) => i === true);
}

const TicTacToe = {
  name: 'tic-tac-toe',

  setup: () => ({
    gameDeck: new Deck([
      yel_1_1,
      yel_1_2,
      yel_1_3,
      yel_2_1,
      yel_2_2,
      yel_3_1,
      yel_3_2,
      yel_4_1,
      yel_4_2,
      yel_1_5,
      bl_1_1,
      bl_1_2,
      bl_1_3,
      bl_2_1,
      bl_2_2,
      bl_3_1,
      bl_3_2,
      bl_4_1,
      bl_4_2,
      bl_1_5,
      red_1_1,
      red_1_2,
      red_1_3,
      red_2_1,
      red_2_2,
      red_3_1,
      red_3_2,
      red_4_1,
      red_4_2,
      red_1_5,
      gr_1_1,
      gr_1_2,
      gr_1_3,
      gr_2_1,
      gr_2_2,
      gr_3_1,
      gr_3_2,
      gr_4_1,
      gr_4_2,
      gr_1_5,
      wh_1_1,
      wh_1_2,
      wh_1_3,
      wh_2_1,
      wh_2_2,
      wh_3_1,
      wh_3_2,
      wh_4_1,
      wh_4_2,
      wh_1_5,
    ]),
    myDeck: new Deck(),
    player2Deck: new Deck(),
    colorHints: ['yellow', 'red', 'green', 'blue', 'white'],
    letterHints: ['A', 'B', 'C', 'D', 'E']
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  shuffle: ({ G, ctx }) => {
    const deck = [...G.gameDeck];
    deck.shuffle();
  },
  deal: ({ G, ctx }) => {
    let deck = [...G.gameDeck];
    let mydeck = [...G.myDeck];
    let p2deck = [...G.player2Deck];

    // Draw 5 cards from the deck for your hand
    var drawnCards = deck.draw(5);
    mydeck.addToBottom(drawnCards);

    // Draw 5 cards from the deck for player2's hand
    drawnCards = deck.draw(5);
    p2deck.addToBottom(drawnCards);
  },
  draw: ({ G, ctx }) => {
    let deck = [...G.gameDeck];
    let mydeck = [...G.myDeck];
    var cardDrawn = deck.draw(1);
    mydeck.addToBottom([cardDrawn]);
  },
  moves: {
    giveHint: (() => {

    }),
    discardCard: (() => {

    }),
    playCard: (() => {
      
    })
  }
};

export default TicTacToe;
