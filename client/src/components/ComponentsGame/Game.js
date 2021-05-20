import React, { Component } from "react";
import PropTypes from "prop-types";
import { EAST, NORTH, WEST, SOUTH } from "./constantsGame";
import Board from "./Board";
import Tabs from "./Tabs";
import Pacman from "./Player/Pacman";
import { walkingMulti, changeDirectionMulti } from "./Player/moves";
import "./style.scss";

import io from "socket.io-client";
import queryString from "query-string";

let socket;

const ENDPOINT = "https://lacman-si.herokuapp.com";
//const ENDPOINT = "http://localhost:5000";

export default class Lacman extends Component {
  constructor(props) {
    super(props);

    const data = queryString.parse(props.location.search);

    this.handleKeyDown = this.handleKeyDown.bind(this); //Manejador de eventos

    //initialize socket state
    this.state = {
      room: data.roomCode,
      roomFull: false,
      users: [],
      currentUser: "",
      gameOver: false,
      winnerTeam: "",
      walkingTime: Date.now(),
      scoreTeamOne: 0,
      scoreTeamTwo: 0,
      players: [
        {
          id: "Player 1",
          score: 0,
          lost: false,
          color: "red",
          position: [12.5, 15],
          direction: EAST,
          nextDirection: SOUTH,
        },
        {
          id: "Player 2",
          score: 0,
          lost: false,
          color: "yellow",
          position: [12.5, 15],
          direction: EAST,
          nextDirection: SOUTH,
        },
        {
          id: "Player 3",
          score: 0,
          lost: false,
          color: "red",
          position: [12.5, 15],
          direction: EAST,
          nextDirection: SOUTH,
        },
        {
          id: "Player 4",
          score: 0,
          lost: false,
          color: "yellow",
          position: [12.5, 15],
          direction: EAST,
          nextDirection: SOUTH,
        },
      ],
      lostTeam: "",
      tabs: this.generateTabs(),
    };

    this.timers = {
      start: null,
      walking: null,
    };
  }

  initSocket() {
    const connectionOptions = {
      forceNew: true,
      reconnectionAttempts: "Infinity",
      timeout: 10000,
      transports: ["websocket"],
    };
    socket = io.connect(ENDPOINT, connectionOptions);

    socket.emit("join", { room: this.state.room }, (error) => {
      if (error) this.setState({ roomFull: true });
    });

    socket.on("initGameState", ({ gameOver, player }) => {
      this.setState({ gameOver: gameOver, player: player });
    });

    socket.on("roomData", ({ users }) => {
      this.setState({ users: users });
    });

    socket.on("currentUserData", ({ name }) => {
      this.setState({ currentUser: name });
    });
  }

  loadData() {
    window.addEventListener("keydown", this.handleKeyDown);

    // En jugada recibida (Recibir movimiento jugadores)
    socket.on("move", (listener) => {
      this.updateData(listener.user, listener.direction);

      this.timers.start = setTimeout(() => {
        this.setState({ walkingTime: Date.now() });
        this.walkingInMapMulti();
      }, 2000);

      /* FINALIZACIÓN PARTIDA */
      if (
        this.state.scoreTeamOne > this.state.scoreTeamTwo &&
        this.state.gameOver
      ) {
        this.setState({ winnerTeam: "TEAM 1", lostTeam: "TEAM 2" });
      } else if (
        this.state.scoreTeamOne < this.state.scoreTeamTwo &&
        this.state.gameOver
      ) {
        this.setState({ winnerTeam: "TEAM 2", lostTeam: "TEAM 1" });
      }
    });
  }

  componentDidMount() {
    this.initSocket();
    this.loadData();
  }

  isBigTab([posX, posY]) {
    return (posX === 0 || posX === 25) && (posY === 7 || posY === 26);
  }

  generateTabs() {
    const putRow = (startX, posY, num) =>
      new Array(num).fill(0).map((item, index) => [startX + index, posY]);

    const putSeparateTabsInRow = (xPoints, posY) =>
      xPoints.map((posX) => [posX, posY]);

    const putContinuousTabsInRow = (ranges, posY) =>
      ranges.reduce(
        (items, [startX, num]) => [...items, ...putRow(startX, posY, num)],
        []
      );

    const putCol = (posX, startY, num) =>
      new Array(num).fill(0).map((item, index) => [posX, startY + index]);

    const tabsGroup = [
      ...putRow(0, 0, 26),
      ...putSeparateTabsInRow([0, 11, 14, 25], 1),
      ...putSeparateTabsInRow([0, 11, 14, 25], 2),
      ...putContinuousTabsInRow(
        [
          [0, 6],
          [8, 4],
          [14, 4],
          [20, 6],
        ],
        3
      ),
      ...putSeparateTabsInRow([2, 5, 8, 17, 20, 23], 4),
      ...putSeparateTabsInRow([2, 5, 8, 17, 20, 23], 5),
      ...putContinuousTabsInRow(
        [
          [0, 3],
          [5, 7],
          [14, 7],
          [23, 3],
        ],
        6
      ),
      ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 7),
      ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 8),
      ...putContinuousTabsInRow(
        [
          [0, 12],
          [14, 12],
        ],
        9
      ),
      ...putCol(5, 10, 11),
      ...putCol(20, 10, 11),
      ...putContinuousTabsInRow(
        [
          [0, 6],
          [8, 4],
          [14, 4],
          [20, 6],
        ],
        21
      ),
      ...putSeparateTabsInRow([0, 5, 8, 17, 20, 25], 22),
      ...putSeparateTabsInRow([0, 5, 8, 17, 20, 25], 23),
      ...putRow(0, 24, 26),
      ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 25),
      ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 26),
      ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 27),
      ...putContinuousTabsInRow(
        [
          [0, 12],
          [14, 12],
        ],
        28
      ),
    ];

    return tabsGroup.map((position, index) => ({
      key: index,
      position,
      eaten: false,
      big: this.isBigTab(position),
    }));
  }

  handleKeyDown(event) {
    if (event.key === "ArrowRight") {
      return this.changeDirection(EAST);
    }
    if (event.key === "ArrowUp") {
      return this.changeDirection(NORTH);
    }
    if (event.key === "ArrowLeft") {
      return this.changeDirection(WEST);
    }
    if (event.key === "ArrowDown") {
      return this.changeDirection(SOUTH);
    }
    return null;
  }

  changeDirection(direction) {
    socket.emit("move", { user: this.state.currentUser, direction: direction });
  }

  updateData(userListened, direction) {
    //Actualizar movimiento de los jugadores
    for (var i = 0; i < this.state.players.length; i++) {
      if (userListened === this.state.players[i].id) {
        this.setState(changeDirectionMulti(this.state, i, { direction }));
      }
    }
  }

  walkingInMapMulti() {
    const move = walkingMulti(this.state);
    this.setState(move);

    clearTimeout(this.timers.walking);
    this.timers.walking = setTimeout(() => this.walkingInMapMulti(), 50);
  }

  cleanup() {
    //cleanup on component unmount
    socket.emit("disconnection");
    //shut down connnection instance
    socket.off();
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    clearTimeout(this.timers.start);
    clearTimeout(this.timers.walking);
    return this.cleanup();
  }

  render() {
    const { onEnd, ...otherProps } = this.props;
    const props = { gridSize: 18, ...otherProps };

    const paintPlayers = this.state.players.map(({ id, ...playerN }) => (
      <Pacman key={id} {...props} {...playerN} onEnd={onEnd} />
    ));

    return (
      <div>
        {!this.state.roomFull ? (
          <>
            <div className="topInfo">
              <h1>Game Code: {this.state.room}</h1>
            </div>
            {this.state.users.length === 1 && (
              <h1 className="topInfoText">
                Waiting for Player 2 to join the game.
              </h1>
            )}
            {this.state.users.length === 2 && (
              <h1 className="topInfoText">
                Waiting for Player 3 to join the game.
              </h1>
            )}
            {this.state.users.length === 3 && (
              <h1 className="topInfoText">
                Waiting for Player 4 to join the game.
              </h1>
            )}

            {this.state.users.length === 4 && (
              <>
                {this.state.gameOver ? (
                  <div>
                    <h1 className="gameover">GAME OVER!</h1>
                    <h1 className="serverFull">
                      {(this.state.currentUser === "Player 1" ||
                        this.state.currentUser === "Player 3") && (
                        <>
                          {this.state.winnerTeam == "TEAM 1" ? (
                            <h1 className="topInfoTextResults">
                              {"You're the winner!"}
                            </h1>
                          ) : (
                            <h1 className="topInfoTextResults">
                              {"You're the loser :("}
                            </h1>
                          )}
                        </>
                      )}
                      {(this.state.currentUser === "Player 2" ||
                        this.state.currentUser === "Player 4") && (
                        <>
                          {this.state.winnerTeam == "TEAM 2" ? (
                            <h1 className="topInfoTextResults">
                              {"You're the winner!"}
                            </h1>
                          ) : (
                            <h1 className="topInfoTextResults">
                              {"You're the loser :("}
                            </h1>
                          )}
                        </>
                      )}
                      {window.removeEventListener(
                        "keydown",
                        this.handleKeyDown
                      )}
                    </h1>
                  </div>
                ) : (
                  <div>
                    <div className="lacman">
                      <Board {...props} />
                      <Tabs {...props} tabs={this.state.tabs} />
                      {paintPlayers}
                      {/* TEAM 1 */}
                      <img
                        className="team one"
                        src={require(`./../../assets/TEAM_1.png`).default}
                      />
                      <div id="rectangle" className="framep1"></div>
                      <div id="minirectangle" className="frameminip1"></div>
                      <p className="lacman-score name1">PLAYER 1</p>
                      <img
                        className="rounded lacman-player p1"
                        src={require(`./../../assets/PLAYER_1.png`).default}
                      />
                      <div className="lacman-score teamOne">
                        <span className="running-score">
                          {this.state.scoreTeamOne}
                        </span>
                      </div>
                      <div id="rectangle" className="framep3"></div>
                      <div id="minirectangle" className="frameminip3"></div>
                      <p className="lacman-score name3">PLAYER 3</p>
                      <img
                        className="lacman-player p3"
                        src={require(`./../../assets/PLAYER_3.png`).default}
                      />
                      {/* TEAM 2 */}
                      <img
                        className="team two"
                        src={require(`./../../assets/TEAM_2.png`).default}
                      />
                      <div id="rectangle" className="framep2"></div>
                      <div id="minirectangle" className="frameminip2"></div>
                      <p className="lacman-score name2">PLAYER 2</p>
                      <img
                        className="lacman-player p2"
                        src={require(`./../../assets/PLAYER_2.png`).default}
                      />
                      <div className="lacman-score teamTwo">
                        <span className="running-score">
                          {this.state.scoreTeamTwo}
                        </span>
                      </div>
                      <div id="rectangle" className="framep4"></div>
                      <div id="minirectangle" className="frameminip4"></div>
                      <p className="lacman-score name4">PLAYER 4</p>
                      <img
                        className="lacman-player p4"
                        src={require(`./../../assets/PLAYER_4.png`).default}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <h1 className="serverFull">Room full</h1>
        )}

        <br />
        <a href="/">
          <button className="game-button red pos">SALIR</button>
        </a>
      </div>
    );
  }
}

Lacman.propTypes = {
  gridSize: PropTypes.number,
  onEnd: PropTypes.func,
};
