import { gql } from 'apollo-angular'

const GET_CURRENT_GAME = gql`
query getCurrentGame($playerId: Int) {
  getCurrentGame(playerId: $playerId) {
      id
      game {
        id
        status
      }
      playerOne {
        id
        name
      }
      playerTwo {
        id
        name
      }
      winner {
        id
        name
      }
    }
  }
`


// const GET_GAMES = gql`
// query getGames {
//     getGames {
//       id
//       status
//       winner {
//         id
//         name
//       }
//     }
//   }
// `

// const GET_GAME_BY_ID = gql`
// query getGameById($gameId: Int) {
//     getGameById(gameId: $gameId) {
//       id
//       status
//       winner {
//         id
//         name
//       }
//     }
//   }
// `

const ADD_NEW_PLAYER = gql`
    mutation addNewPlayer {
        addNewPlayer {
            id
            name
        }
    }
`


const GET_TURN = gql`
query getTurn($playerId: Int, $gameId: Int) {
    getTurn(playerId: $playerId, gameId: $gameId) {
      id
      game {
        id
        status
      }
      houseValues {
        id
        value
      }
      zoneValue
      player {
        id
        name
      }
    }
  }
`


const GET_WHOS_PLAYING = gql`
query getWhosPlaying($gameId: Int) {
    getWhosPlaying(gameId: $gameId) {
        id
        name
    }
  }
`

// const GET_PLAYER_ONGOING_GAME = gql`subscription {
//     getPlayerOngoingGame {
//       id
//       status
//       winner {
//         id
//         name
//       }
//     }
//   }`


const PLAY = gql`
  mutation play($playerId: Int, $gameId: Int, $houseId: Int) {
      play(playerId: $playerId, gameId: $gameId, houseId: $houseId) {
          playerOne {
            id
            game {
              id
              status
            }
            houseValues {
              id
              value
            }
            zoneValue
            player {
              id
              name
            }
          }
          playerTwo {
            id
            game {
              id
              status
            }
            houseValues {
              id
              value
            }
            zoneValue
            player {
              id
              name
            }
          }
      }
  }
`


export {
  GET_CURRENT_GAME,
  ADD_NEW_PLAYER,
  GET_TURN,
  GET_WHOS_PLAYING,
  PLAY,
  // GET_PLAYER_ONGOING_GAME, 
  // GET_GAME_BY_ID, 
  // GET_GAMES, 
}