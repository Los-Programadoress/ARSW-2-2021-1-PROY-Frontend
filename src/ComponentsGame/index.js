import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EAST, NORTH, WEST, SOUTH } from './constantsGame';
import Board from './Board';
import Tabs from './Tabs';
import Pacman from './Player/Pacman';
import { walking, changeDirection } from './Player/moves';
import './style.scss';

export default class Lacman extends Component {
    constructor(props) {
        super(props);

        this.handleKeyDown = this.handleKeyDown.bind(this) //Manejador de eventos
        
        this.state = {
            walkingTime: Date.now(),
            score: 0,
            player: {
                position: [12.5, 15],
                direction: EAST,
                nextDirection: EAST
            },
            lost: false,
        tabs: this.generateTabs()
        };

        this.timers = {
            start: null,
            walking: null
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);

        this.timers.start = setTimeout(() => {
            this.setState({ walkingTime: Date.now() });
            this.walkingInMap();
        }, 3000);
    }

    isBigTab([posX, posY]) {
        return (posX === 0 || posX === 25) && (posY === 7 || posY === 26);
    }
    
    generateTabs() {
        const putRow = (startX, posY, num) => new Array(num).fill(0)
            .map((item, index) => ([startX + index, posY]));

        const putSeparateTabsInRow = (xPoints, posY) => xPoints
            .map(posX => ([posX, posY]));
    
        const putContinuousTabsInRow = (ranges, posY) => ranges
            .reduce((items, [startX, num]) => ([
                ...items, ...putRow(startX, posY, num)
            ]), []);

        const putCol = (posX, startY, num) => new Array(num).fill(0)
            .map((item, index) => ([posX, startY + index]));
        
        const tabsGroup = [
            ...putRow(0, 0, 26),
            ...putSeparateTabsInRow([0, 11, 14, 25], 1),
            ...putSeparateTabsInRow([0, 11, 14, 25], 2),
            ...putContinuousTabsInRow([[0, 6], [8, 4], [14, 4], [20, 6]], 3),
            ...putSeparateTabsInRow([2, 5, 8, 17, 20, 23], 4),
            ...putSeparateTabsInRow([2, 5, 8, 17, 20, 23], 5),
            ...putContinuousTabsInRow([[0, 3], [5, 7], [14, 7], [23, 3]], 6),
            ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 7),
            ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 8),
            ...putContinuousTabsInRow([[0, 12], [14, 12]], 9),
            ...putCol(5, 10, 11),
            ...putCol(20, 10, 11),
            ...putContinuousTabsInRow([[0, 6], [8, 4], [14, 4], [20, 6]], 21),
            ...putSeparateTabsInRow([0, 5, 8, 17, 20, 25], 22),
            ...putSeparateTabsInRow([0, 5, 8, 17, 20, 25], 23),
            ...putRow(0, 24, 26),
            ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 25),
            ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 26),
            ...putSeparateTabsInRow([0, 5, 11, 14, 20, 25], 27),
            ...putContinuousTabsInRow([[0, 12], [14, 12]], 28)
            ]

        return (
            tabsGroup.map((position, index) => ({
                key: index,
                position,
                eaten: false,
                big: this.isBigTab(position)
            }))
        );
    }

    handleKeyDown (event){
        if (event.key === 'ArrowRight') {
            return this.changeDirection(EAST);
        }
        if (event.key === 'ArrowUp') {
            return this.changeDirection(NORTH);
        }
        if (event.key === 'ArrowLeft') {
            return this.changeDirection(WEST);
        }
        if (event.key === 'ArrowDown') {
            return this.changeDirection(SOUTH);
        }
        
        return null;
    };

    changeDirection(direction) {
        this.setState(changeDirection(this.state, { direction }));
    }
    
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        clearTimeout(this.timers.start);
        clearTimeout(this.timers.walking);
    }

    walkingInMap() {
        const move = walking(this.state);
        this.setState(move);
        
        clearTimeout(this.timers.walking);
        this.timers.walking = setTimeout(() => this.walkingInMap(), 20);
    }

    render() {
        const { onEnd, ...otherProps } = this.props;
        const props = { gridSize: 12, ...otherProps };
        return (
            <div className="lacman">
                <Board {...props} />
                <Tabs {...props} tabs={this.state.tabs} />
                <Pacman {...props} {...this.state.player} lost={this.state.lost} onEnd={onEnd} />
                <div className="lacman-score">
                    <span className="running-score">{'Score: '}{this.state.score}</span>
                </div>
            </div>
        );
    }
}

Lacman.propTypes = {
    gridSize: PropTypes.number.isRequired,
    onEnd: PropTypes.func
};