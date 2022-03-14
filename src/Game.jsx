import React from "react";
import {
  Bracket,
  BracketGame,
  BracketGenerator
} from "react-tournament-bracket";
import { Component } from 'react/cjs/react.production.min'

export default class Game extends Component{
  render(){
    const gamesList = this.props.gamesList
    const match = {id: "", name: "", scheduled: "", equip_local: "", equip_visitant: "", punts_local: "", punts_visitant: "", torneig: ""}


    const g2 = gamesList.pop()

    console.log(g2)

    const game2 = {
      id: "2",
      name: g2,
      scheduled: Number(new Date()),
      sides: {
        home: {
          team: {
            id: "12",
            name: "Team 1"
          },
          score: {
            score: 1
          }
        },
        visitor: {
          team: {
            id: "13",
            name: "Team 4"
          },
          score: {
            score: 0
          }
        }
      }
    };

    const g3 = gamesList.pop()

    const game3 = {
      id: "3",
      name: "mi-finals",
      scheduled: Number(new Date()),
      sides: {
        home: {
          team: {
            id: "11",
            name: "Team 2"
          },
          score: {
            score: 1
          }
        },
        visitor: {
          team: {
            id: "12",
            name: "Team 3"
          },
          score: {
            score: 0
          }
        }
      }
    };
    const game1 = {
      id: "1",
      name: "emi-finals",
      scheduled: Number(new Date()),
      sides: {
        home: {
          team: {
            id: "10",
            name: "Team 1"
          },
          score: {
            score: 2
          },
          seed: {
            displayName: "A1",
            rank: 1,
            sourceGame: game2,
            sourcePool: {}
          }
        },
        visitor: {
          team: {
            id: "11",
            name: "Team 2"
          },
          score: {
            score: 3
          },
          seed: {
            displayName: "A2",
            rank: 1,
            sourceGame: game3,
            sourcePool: {}
          }
        }
      }
    };
  
    return (
      <>
        <div className="col-lg-5">
          <Bracket game={game1} />
        </div>
        <div className="col-lg-5 final">
          <BracketGame game={game1} />
        </div>
      </>
    );
  }
  

 
}