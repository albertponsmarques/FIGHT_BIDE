
import getEquip from './getEquipByID';

export default function getMatch(idGame, gamesList, teamsList){

  const game2 = {
    id: "2",
    name: "aaaa",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "12",
          name: "aaaaa1"
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
    name: "aaa.name",
    scheduled: Number(new Date()),
    sides: {
      home: {
        team: {
          id: "10",
          name: "Team 1"
        },
        score: {
          score: "aaa.punts_local"
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
          score: 4
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

  let thisGame = null

  getGameInList()

  function getGameInList(){
    gamesList.forEach(game => {
      if (game.id == idGame){
        thisGame = game
      }
    });;
  }



  if(thisGame != null){
    if(thisGame.last_gameLocal == null){
      const game = {
        id: thisGame.id,
        name: thisGame.name,
        scheduled: thisGame.scheduled,
        sides: {
          home: {
            team: {
              id: thisGame.equip_local,
              name: getEquip(thisGame.equip_local, teamsList)
            },
            score: {
              score: thisGame.punts_local
            }
          },
          visitor: {
            team: {
              id: thisGame.equip_visitant,
              name: getEquip(thisGame.equip_visitant, teamsList)
            },
            score: {
              score: thisGame.punts_visitant
            }
          }
        }
      };
  
      return game
    }
    else{
      const game = {
        id: thisGame.id,
        name: thisGame.name,
        scheduled: thisGame.scheduled,
        sides: {
          home: {
            team: {
              id: thisGame.equip_local,
              name: getEquip(thisGame.equip_local, teamsList)
            },
            score: {
              score: thisGame.punts_local
            },
            seed: {
              displayName: "A1",
              rank: 1,
              sourceGame: getMatch(thisGame.last_gameLocal, gamesList, teamsList),
              sourcePool: {}
            }
          },
          visitor: {
            team: {
              id: thisGame.equip_visitant,
              name: getEquip(thisGame.equip_visitant, teamsList)
            },
            score: {
              score: thisGame.punts_visitant
            },
            seed: {
              displayName: "A2",
              rank: 1,
              sourceGame: getMatch(thisGame.last_gameVisitant, gamesList, teamsList),
              sourcePool: {}
            }
          }
        }
      };
  
      return game
    }
  } else{
    return game1
  }


}