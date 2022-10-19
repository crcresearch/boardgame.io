/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import _ from 'lodash';

const drawCards = (G, number) => {
  const cards = _.take(G.gameDeck, number);
  G.gameDeck = G.gameDeck.slice(number);
  return cards;
};

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

  setup: () => {
    let gameDeck = _.shuffle([
      'yel_1_1',
      'yel_1_2',
      'yel_1_3',
      'yel_2_1',
      'yel_2_2',
      'yel_3_1',
      'yel_3_2',
      'yel_4_1',
      'yel_4_2',
      'yel_5_1',
      'bl_1_1',
      'bl_1_2',
      'bl_1_3',
      'bl_2_1',
      'bl_2_2',
      'bl_3_1',
      'bl_3_2',
      'bl_4_1',
      'bl_4_2',
      'bl_5_1',
      'red_1_1',
      'red_1_2',
      'red_1_3',
      'red_2_1',
      'red_2_2',
      'red_3_1',
      'red_3_2',
      'red_4_1',
      'red_4_2',
      'red_5_1',
      'gr_1_1',
      'gr_1_2',
      'gr_1_3',
      'gr_2_1',
      'gr_2_2',
      'gr_3_1',
      'gr_3_2',
      'gr_4_1',
      'gr_4_2',
      'gr_5_1',
      'wh_1_1',
      'wh_1_2',
      'wh_1_3',
      'wh_2_1',
      'wh_2_2',
      'wh_3_1',
      'wh_3_2',
      'wh_4_1',
      'wh_4_2',
      'wh_5_1',
    ]);

    // Draw 5 for p1
    let player1Deck = _.take(gameDeck, 5);
    gameDeck = gameDeck.slice(5);

    // Draw 5 for p2
    let player2Deck = _.take(gameDeck, 5);
    gameDeck = gameDeck.slice(5);

    const completedDeck = {
      yel: null,
      red: null,
      gr: null,
      bl: null,
      wh: null,
    };
    const lastClue = null;

    return {
      gameDeck,
      player1Deck,
      player2Deck,
      colorHints: ['yellow', 'red', 'green', 'blue', 'white'],
      letterHints: ['A', 'B', 'C', 'D', 'E'],
      completedDeck,
      lastClue,
    };
  },

  turn: {
    minMoves: 1,
    maxMoves: 1,
  },

  shuffle: ({ G, ctx }) => {
    const deck = [...G.gameDeck];
    G.gameDeck = _.shuffle(deck);
    // deck.shuffle();
  },
  // deal: ({ G, ctx }) => {
  //   let deck = [...G.gameDeck];
  //   let mydeck = [...G.myDeck];
  //   let p2deck = [...G.player2Deck];

  //   // Draw 5 cards from the deck for your hand
  //   var drawnCards = deck.draw(5);
  //   mydeck.addToBottom(drawnCards);

  //   // Draw 5 cards from the deck for player2's hand
  //   drawnCards = deck.draw(5);
  //   p2deck.addToBottom(drawnCards);
  // },
  moves: {
    giveHint: () => {},

    discardCard: ({ G, ctx }, card) => {
      const deck = [...G.gameDeck];
      const playerTurn = ctx.currentPlayer;
      const deckName = {
        0: 'player1Deck',
        1: 'player2Deck',
      }[playerTurn];
      let newPlayerDeck = _.without(G[deckName], card);
      newPlayerDeck = [...newPlayerDeck, ...drawCards(G, 1)];
      G[deckName] = newPlayerDeck;
    },

    playCard: ({ G, ctx }, completedDeck, card) => {
      G.completedDeck = completedDeck;
      const playerTurn = ctx.currentPlayer;
      const deckName = {
        0: 'player1Deck',
        1: 'player2Deck',
      }[playerTurn];
      let newPlayerDeck = _.without(G[deckName], card);
      newPlayerDeck = [...newPlayerDeck, ...drawCards(G, 1)];
      G[deckName] = newPlayerDeck;
    },
  },
};

export default TicTacToe;
