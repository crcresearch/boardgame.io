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

const Card = ({ width, color, number }) => {
  const height = width * 1.6;

  return (
    <div style={{ width, height, backgroundColor: color ?? 'purple' }}>
      {number}
    </div>
  );
};

const Hand = ({ cards, width }) => {
  const cardWidth = width / cards.length;

  return (
    <div style={{ display: 'flex', width }}>
      {cards.map((card) => (
        <Card width={cardWidth} color={card.color} number={card.number} />
      ))}
    </div>
  );
};

const Screen = () => {
  const width = 300;
  const height = 600;

  const myCards = [
    { color: 'red', number: 1 },
    { color: 'blue', number: 2 },
    { color: 'green', number: 3 },
    { color: 'yellow', number: 4 },
    { color: 'white', number: 5 },
  ];

  const otherPlayerCards = [
    { color: 'red', number: 1 },
    { color: 'blue', number: 2 },
    { color: 'green', number: 3 },
    { color: 'yellow', number: 4 },
    { color: 'white', number: 5 },
  ];

  return (
    <div
      style={{
        width,
        height,
        border: '3px solid black',
        borderRadius: 10,
        backgroundColor: 'silver',
      }}
    >
      <Hand width={width} cards={otherPlayerCards} />
      <Hand width={width} cards />
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
        <Screen />
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
