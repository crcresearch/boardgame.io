/*
 * Copyright 2017 The boardgame.io Authors.
 *
 * Use of this source code is governed by a MIT-style
 * license that can be found in the LICENSE file or at
 * https://opensource.org/licenses/MIT.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

const Card = ({ width, color, number, letter, hasBorder }) => {
  const height = width * 1.6;

  return (
    <div style={{ width, height, padding: 5 }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: color ?? 'violet',
          borderRadius: 5,
          position: 'relative',
          border: hasBorder ? 'dotted black 2px' : undefined,
          boxSizing: 'border-box',
          padding: 2,
        }}
      >
        <div style={{ fontSize: 16 }}>{letter}</div>
        <div style={{ position: 'absolute', bottom: 0 }}>{number}</div>
      </div>
    </div>
  );
};

const Hand = ({ cards, width, hidden }) => {
  const cardWidth = width / cards.length;
  const newCards = hidden
    ? cards.map((card) => ({ number: card.number }))
    : cards;

  return (
    <div style={{ display: 'flex', width }}>
      {newCards.map((card) => (
        <Card width={cardWidth} {...card} />
      ))}
    </div>
  );
};

const Screen = ({ playerID }) => {
  const width = 300;
  const height = 600;
  console.log(playerID);
  console.log(typeof playerID);

  const p0Cards = [
    { color: 'yellow', number: 1, letter: 'A' },
    { color: 'blue', number: 2, letter: 'B' },
    { color: 'blue', number: 3, letter: 'C' },
    { color: 'white', number: 4, letter: 'D' },
    { color: 'green', number: 5, letter: 'E' },
  ];

  const p1Cards = [
    { color: 'red', number: 6, letter: 'D' },
    { color: 'blue', number: 7, letter: 'D' },
    { color: 'green', number: 8, letter: 'A' },
    { color: 'yellow', number: 9, letter: 'E' },
    { color: 'white', number: 10, letter: 'C' },
  ];

  const boardCards = [
    { color: 'green', letter: 'A' },
    { color: 'white', letter: 'B' },
    { color: 'yellow', letter: 'C' },
    { color: 'red', letter: 'D' },
    { letter: 'Blue', hasBorder: true, color: 'none' },
  ];

  return (
    <div
      style={{
        width,
        height,
        border: '3px solid black',
        borderRadius: 15,
        backgroundColor: 'silver',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div>
        <Hand width={width} cards={playerID === '0' ? p1Cards : p0Cards} />
      </div>
      <div
        style={{
          flex: '1 0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Hand width={width * 0.8} cards={boardCards} />
      </div>
      <div>
        <Hand
          width={width}
          cards={playerID === '0' ? p0Cards : p1Cards}
          hidden
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
    return (
      <div style={{ margin: 30 }}>
        <Screen playerID={this.props.playerID} />
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
