/*
 * Copyright 2017 The boardgame.io Authors
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import _ from 'lodash';

let cardID = 1;

const drawCards = (gameDeck, number) => {
  const cards = _.take(gameDeck, number).map(
    (card) => `${card}_${String(cardID++)}`
  );
  const newGameDeck = gameDeck.slice(number);
  return [newGameDeck, cards];
};

function IsVictory(completedDeck) {
  return Object.values(completedDeck).every((value) => value === 5);
}

const TicTacToe = {
  name: 'tic-tac-toe',

  setup: () => {
    let gameDeck = _.shuffle([
      'yel_1',
      'yel_1',
      'yel_1',
      'yel_2',
      'yel_2',
      'yel_3',
      'yel_3',
      'yel_4',
      'yel_4',
      'yel_5',
      'bl_1',
      'bl_1',
      'bl_1',
      'bl_2',
      'bl_2',
      'bl_3',
      'bl_3',
      'bl_4',
      'bl_4',
      'bl_5',
      'red_1',
      'red_1',
      'red_1',
      'red_2',
      'red_2',
      'red_3',
      'red_3',
      'red_4',
      'red_4',
      'red_5',
      'gr_1',
      'gr_1',
      'gr_1',
      'gr_2',
      'gr_2',
      'gr_3',
      'gr_3',
      'gr_4',
      'gr_4',
      'gr_5',
      'wh_1',
      'wh_1',
      'wh_1',
      'wh_2',
      'wh_2',
      'wh_3',
      'wh_3',
      'wh_4',
      'wh_4',
      'wh_5',
    ]);

    // Draw 5 for p1
    let player1Deck;
    [gameDeck, player1Deck] = drawCards(gameDeck, 5);

    // Draw 5 for p2
    let player2Deck;
    [gameDeck, player2Deck] = drawCards(gameDeck, 5);

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
  },

  endIf: ({ G, ctx }) => {
    if (IsVictory(G.completedDeck)) {
      return true;
    }
  },

  moves: {
    giveClue: ({ G, ctx }, clueText) => {
      G.lastClue = clueText;
    },

    discardCard: ({ G, ctx }, card) => {
      if (G.gameDeck.length === 0) endGame();
      const playerTurn = ctx.currentPlayer;
      const deckName = {
        0: 'player1Deck',
        1: 'player2Deck',
      }[playerTurn];
      let newPlayerDeck = _.without(G[deckName], card);
      const [newGameDeck, newCards] = drawCards(G.gameDeck, 1);
      newPlayerDeck = newPlayerDeck.concat(newCards);
      G[deckName] = newPlayerDeck;
      G.gameDeck = newGameDeck;
    },

    playCard: ({ G, ctx }, completedDeck, card) => {
      G.completedDeck = completedDeck;
      const playerTurn = ctx.currentPlayer;
      const deckName = {
        0: 'player1Deck',
        1: 'player2Deck',
      }[playerTurn];
      let newPlayerDeck = _.without(G[deckName], card);
      if (G.gameDeck.length === 0) endGame();
      const [newGameDeck, newCards] = drawCards(G.gameDeck, 1);
      newPlayerDeck = newPlayerDeck.concat(newCards);
      G[deckName] = newPlayerDeck;
      G.gameDeck = newGameDeck;
    },
  },
};

export default TicTacToe;
