/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './board.css';

const gameCardtoBoardCard = (cardString) => {
  console.log({ cardString });
  const splitStr = cardString.split('_');

  const color = {
    yel: 'yellow',
    bl: 'blue',
    red: 'red',
    gr: 'green',
    wh: 'white',
  }[splitStr[0]];

  const letter = {
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'E',
  }[splitStr[1]];

  const id = Number(splitStr[2]);

  return {
    color,
    letter,
    id,
  };
};

const boardCardToGameCard = (cardObj) => {
  const color = {
    yellow: 'yel',
    blue: 'bl',
    red: 'red',
    green: 'gr',
    white: 'wh',
  }[cardObj.color];

  const number = {
    A: '1',
    B: '2',
    C: '3',
    D: '4',
    E: '5',
  }[cardObj.letter];

  const id = String(cardObj.id);

  return [color, number, id].join('_');
};

const midGameDeckToMidBoardDeck = (completedDeck) => {
  const colorMap = {
    yel: 'yellow',
    bl: 'blue',
    red: 'red',
    gr: 'green',
    wh: 'white',
  };
  const deckArr = [];
  for (const key in Object.keys(completedDeck)) {
    const color = colorMap[key];
    const cardNumber = completedDeck[key];
    if (cardNumber === null) {
      deckArr.push({ letter: color, isEmpty: true, color: 'none' });
    } else {
      const numberMap = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E',
      };
      const letter = numberMap[cardNumber];
      deckArr.push({ color: color, letter: letter });
    }
  }
  return deckArr;
};

const cardColors = {
  blue: '#59A1E4',
  yellow: '#E4BD59',
  red: '#EB5E5E',
  green: '#59DE44',
  white: '#ffccff', // now pink
  purple: '#9F59E4',
  none: 'none',
};

const Card = ({
  width,
  color,
  id,
  letter,
  isEmpty,
  isHighlighted,
  onClick,
}) => {
  const height = width * 1.6;

  return (
    <div style={{ width, height, padding: 5 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: cardColors[color] ?? cardColors['purple'],
          borderRadius: 10,
          position: 'relative',
          border: isEmpty
            ? 'dotted black 2px'
            : isHighlighted
            ? 'solid orange 4px'
            : undefined,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={onClick}
      >
        <div style={{ flex: '1 0 auto', fontSize: 16, fontWeight: 'bold' }}>
          {letter}
        </div>
        <div style={{ fontWeight: 'bold' }}>{id}</div>
      </div>
    </div>
  );
};

const Hand = ({ cards, width, hidden }) => {
  const cardWidth = 44;
  const newCards = hidden
    ? cards.map((card) => ({ id: card.id, onClick: card.onClick }))
    : cards;

  return (
    <div
      style={{
        display: 'flex',
        width,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        boxSizing: 'border-box',
        flexWrap: 'wrap',
      }}
    >
      {newCards.map((card) => (
        <Card width={cardWidth} {...card} />
      ))}
    </div>
  );
};

const ActionButton = ({ text, onClick, disabled, zIndex }) => {
  return (
    <button
      style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        backgroundColor: cardColors['purple'],
        width: 80,
        height: 40,
        border: 'none',
        borderRadius: 10,
        opacity: disabled ? 0.7 : 1,
        zIndex,
      }}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

const ClueButton = ({ color, text, onClick, isActive, isHighlighted }) => {
  const size = 40;

  return (
    <button
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: cardColors[color] ?? cardColors['purple'],
        border: isHighlighted ? 'solid 4px orange' : 'none',
        opacity: isActive ? 1 : 0.3,
        boxSizing: 'border-box',
        fontWeight: 'bold',
        fontSize: 16,
        color: 'white',
      }}
      onClick={onClick}
      disabled={!isActive}
    >
      {text}
    </button>
  );
};

const Shade = ({ onClick }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(1, 1, 1, 0.5)',
    }}
    onClick={onClick}
  />
);

const ClueModal = ({ playerHand, closeModal, setSelectedCards, isOpen }) => {
  const [selectedButton, setSelectedButton] = useState(undefined);
  const colorGroups = _.groupBy(playerHand, (card) => card.color);
  const letterGroups = _.groupBy(playerHand, (card) => card.letter);
  const activeColors = Object.keys(colorGroups);
  const activeLetters = Object.keys(letterGroups);
  const allColors = ['red', 'yellow', 'green', 'blue', 'white'];
  const allLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        // backgroundColor: 'rgba(1, 1, 1, 0.5)',
        display: isOpen ? 'flex' : 'none',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
      }}
      onClick={() => {
        closeModal();
        setSelectedButton(undefined);
        setSelectedCards([]);
      }}
    >
      <div
        style={{
          width: '80%',
          height: '70%',
          backgroundColor: '#D9D9D9',
          borderRadius: 15,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Give a clue</h2>
        <div
          style={{
            display: 'flex',
            gap: 5,
            justifyContent: 'center',
            margin: 10,
          }}
        >
          {allColors.map((color) => (
            <ClueButton
              color={color}
              onClick={() => {
                setSelectedButton(color);
                setSelectedCards(colorGroups[color].map((card) => card.id));
              }}
              isActive={activeColors.includes(color)}
              isHighlighted={selectedButton === color}
            />
          ))}
        </div>
        <div
          style={{
            display: 'flex',
            gap: 5,
            justifyContent: 'center',
            margin: 10,
          }}
        >
          {allLetters.map((letter) => (
            <ClueButton
              onClick={() => {
                setSelectedButton(letter);
                setSelectedCards(letterGroups[letter].map((card) => card.id));
              }}
              isActive={activeLetters.includes(letter)}
              text={letter}
              isHighlighted={selectedButton === letter}
            />
          ))}
        </div>
        <br />
        <ActionButton
          text="Send clue"
          onClick={() => {}}
          disabled={!selectedButton}
        />
      </div>
    </div>
  );
};

const Screen = ({ playerID, playerTurn, lastClue, G, ctx, moves }) => {
  const [clueModalOpen, setClueModalOpen] = useState(false);
  const [isPlayingCard, setIsPlayingCard] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);
  const [selectedOtherCards, setSelectedOtherCards] = useState([]);

  const width = 300;
  const height = 600;

  console.log({ G });
  const p0Cards = G.player1Deck.map((card) => gameCardtoBoardCard(card));
  const p1Cards = G.player2Deck.map((card) => gameCardtoBoardCard(card));
  const boardCards = midGameDeckToMidBoardDeck(G.completedDeck);

  // const p0Cards = [
  //   { color: 'yellow', id: 1, letter: 'A' },
  //   { color: 'blue', id: 2, letter: 'B' },
  //   { color: 'blue', id: 3, letter: 'C' },
  //   { color: 'white', id: 4, letter: 'D' },
  //   { color: 'green', id: 5, letter: 'E' },
  // ];

  // const p1Cards = [
  //   { color: 'red', id: 6, letter: 'D' },
  //   { color: 'blue', id: 7, letter: 'D' },
  //   { color: 'green', id: 8, letter: 'A' },
  //   { color: 'yellow', id: 9, letter: 'E' },
  //   { color: 'white', id: 10, letter: 'C' },
  // ];

  // const boardCards = [
  //   { color: 'green', letter: 'A' },
  //   { color: 'white', letter: 'D' },
  //   { color: 'yellow', letter: 'C' },
  //   { color: 'red', letter: 'B' },
  //   { letter: 'Blue', isEmpty: true, color: 'none' },
  // ];

  const currentPlayerCards = (playerID === '0' ? p0Cards : p1Cards).map(
    (card) => {
      return isPlayingCard
        ? {
            onClick: () => {
              console.log(G.completedDeck);
              const gameCardStr = boardCardToGameCard(card);
              const gameCard = gameCardStr.split('_');
              const color = gameCard[0];
              const bestMidCardNum = G.completedDeck[gameCard[0]];
              console.log({ gameCard, bestMidCardNum });
              const cardIsValid =
                bestMidCardNum === null ||
                Number(gameCard[1]) - bestMidCardNum === 1;
              if (cardIsValid) {
                const newMidDeck = {
                  ...G.completedDeck,
                  [color]: Number(gameCard[1]),
                };
                console.log({ newMidDeck });
                moves.playCard(newMidDeck, gameCardStr);
              }
            },
            ...card,
          }
        : isDiscarding
        ? { onClick: () => setSelectedPlayerCard(card), ...card }
        : card;
    }
  );

  const otherPlayerCards = (playerID === '0' ? p1Cards : p0Cards).map(
    (card) => {
      return selectedOtherCards.includes(card.id)
        ? { isHighlighted: true, ...card }
        : card;
    }
  );

  return (
    <div
      style={{
        width,
        height,
        border: '3px solid black',
        borderRadius: 15,
        backgroundColor: 'white',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          backgroundColor: '#D9D9D9',
          borderRadius: '15px 15px 0 0',
          boxSizing: 'border-box',
          width: '100%',
          position: 'relative',
        }}
      >
        <Hand width={width} cards={otherPlayerCards} />
        {(isPlayingCard || isDiscarding) && (
          <Shade
            onClick={() => {
              setIsPlayingCard(false);
              setIsDiscarding(false);
            }}
          />
        )}
      </div>
      <div
        style={{
          flex: '1 0 auto',
          display: 'flex',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: '1 0 auto',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              flex: '1 0 auto',
              position: 'relative',
            }}
          >
            {playerID === playerTurn && (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  margin: 10,
                  width: '100%',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <ActionButton
                  text="Give clue"
                  onClick={() => setClueModalOpen(true)}
                />
                <ActionButton
                  text="Play card"
                  onClick={() => setIsPlayingCard(true)}
                  zIndex={isPlayingCard ? 5 : undefined}
                />
                <ActionButton
                  text="Discard"
                  onClick={() => setIsDiscarding(true)}
                  zIndex={isDiscarding ? 5 : undefined}
                />
              </div>
            )}
            {lastClue && <span>{lastClue}</span>}
            <Hand width={width * 0.8} cards={boardCards} />
            {(isPlayingCard || isDiscarding) && (
              <Shade
                onClick={() => {
                  setIsPlayingCard(false);
                  setIsDiscarding(false);
                }}
              />
            )}
          </div>
          <div
            style={{
              width: '300px',
              backgroundColor: '#D9D9D9',
              borderRadius: '0 0 15px 15px',
              boxSizing: 'border-box',
            }}
          >
            <Hand width={width} cards={currentPlayerCards} hidden />
          </div>
          {clueModalOpen && <Shade />}
        </div>
        <ClueModal
          playerHand={otherPlayerCards}
          closeModal={() => setClueModalOpen(false)}
          setSelectedCards={setSelectedOtherCards}
          isOpen={clueModalOpen}
        />
      </div>
    </div>
  );
};

class Board extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
    isConnected: PropTypes.bool,
    isPreview: PropTypes.bool,
  };

  onClick = (id) => {
    if (this.isActive(id)) {
      this.props.moves.clickCell(id);
    }
  };

  isActive(id) {
    return this.props.isActive && this.props.G.cells[id] === null;
  }

  render() {
    const playerTurn = '0';

    return (
      <div style={{ margin: 30 }}>
        <Screen
          playerID={this.props.playerID}
          playerTurn={playerTurn}
          G={this.props.G}
          ctx={this.props.ctx}
          moves={this.props.moves}
        />
      </div>
    );

    // let tbody = [];
    // for (let i = 0; i < 3; i++) {
    //   let cells = [];
    //   for (let j = 0; j < 3; j++) {
    //     const id = 3 * i + j;
    //     cells.push(
    //       <td
    //         key={id}
    //         className={this.isActive(id) ? 'active' : ''}
    //         onClick={() => this.onClick(id)}
    //       >
    //         {this.props.G.cells[id]}
    //       </td>
    //     );
    //   }
    //   tbody.push(<tr key={i}>{cells}</tr>);
    // }

    // let disconnected = null;
    // if (this.props.isMultiplayer && !this.props.isConnected) {
    //   disconnected = <div>Disconnected!</div>;
    // }

    // let winner = null;
    // if (this.props.ctx.gameover) {
    //   winner =
    //     this.props.ctx.gameover.winner !== undefined ? (
    //       <div id="winner">Winner: {this.props.ctx.gameover.winner}</div>
    //     ) : (
    //       <div id="winner">Draw!</div>
    //     );
    // }

    // let player = null;
    // if (this.props.playerID) {
    //   player = <div id="player">Player: {this.props.playerID}</div>;
    // }

    // if (this.props.isPreview) {
    //   disconnected = player = null;
    // }

    // return (
    //   <div>
    //     <table id="board">
    //       <tbody>{tbody}</tbody>
    //     </table>
    //     {player}
    //     {winner}
    //     {disconnected}
    //   </div>
    // );
  }
}

export default Board;
