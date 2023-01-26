import { Component, OnInit, OnDestroy } from '@angular/core';

import { Player } from '@app/models/player.model';
import { Game } from '@app/models/game.model';
import { Turn } from '@app/models/turn.model';
import { GameInfo } from '@app/models/game-info.model';
import { GamePlay } from '@app/models/game-play.model';
import { House } from '@app/models/house.model';

import { GraphQLService } from "@app/services/graphql.service"

@Component({
  selector: 'app-gamepage',
  templateUrl: './gamepage.component.html',
  styleUrls: ['./gamepage.component.scss'],
})
export class GamepageComponent implements OnInit, OnDestroy {

  currentGame?: Game
  gameInfo?: GameInfo
  gamePlay?: GamePlay

  zoneOneValue: number = 0;
  zoneTwoValue: number = 0;

  currentPlayer!: Player
  whosPlaying?: Player;


  constructor(
    private graphQLService: GraphQLService
  ) {
  }

  ngOnInit(): void {

    this.currentPlayer = JSON.parse(localStorage.getItem('player')!)
    this.currentGame = JSON.parse(localStorage.getItem('game')!)

    this.initialize()
  }

  ngOnDestroy() {
  }

  initialize() {
    if (this.currentPlayer === null) {

      this.graphQLService.addNewPlayer()
        .subscribe(
          ({ data }: any) => {
            this.currentPlayer = data.addNewPlayer
            localStorage.setItem('player', JSON.stringify(this.currentPlayer))
            this.initializeGame();
          },
          error => {
          }
        )
    } else {
      this.initializeGame();
    }
  }

  initializeGame() {
    this.graphQLService
      .setGameQuery(this.currentPlayer.id)
      .getCurrentGame()
      .subscribe(({ data }: any) => {
        this.gameInfo = data.getCurrentGame
        this.currentGame = this.gameInfo?.game

        localStorage.setItem('game', JSON.stringify(this.currentGame))
        if (this.currentGame?.status === 'ongoing') {
          this.graphQLService.getGameQuery().stopPolling()

          this.initializeGamePlay();
        }
      })
  }

  initializeGamePlay() {
    this.graphQLService.setWhosPlayingQuery(this.currentGame?.id).getWhosPlaying().subscribe(({ data }: any) => {
      this.whosPlaying = data.getWhosPlaying
    })
    this.graphQLService
      .getTurn(this.gameInfo?.playerOne?.id, this.currentGame?.id)
      .subscribe(({ data }: any) => {

        let playerOneTurn = data.getTurn

        this.graphQLService
          .getTurn(this.gameInfo?.playerTwo?.id, this.currentGame?.id)
          .subscribe(({ data }: any) => {
            this.gamePlay = {
              playerOne: playerOneTurn,
              playerTwo: data.getTurn
            }
          })
      })


  }

  getGamePlayValues() {
    if (this.gamePlay) {
      return Object.values(this.gamePlay);
    }
    return null;
  }


  formatHouseValues(turn: Turn): House[] {
    if (turn.player?.id == this.gameInfo?.playerOne?.id) {
      return [...turn.houseValues].reverse();
    } else {
      return turn.houseValues;
    }
  }

  play(
    gamePlayIndex: number,
    houseId: number,
    playerId: number
  ): void {

    if (this.whosPlaying?.id !== playerId) {
      return;
    }

    this.graphQLService.play(playerId, this.currentGame?.id, houseId)
      .subscribe(
        ({ data }: any) => {

        },
        error => {
        }
      )
  }

  //logic basis for backend
  // play(
  //   gameplayIndex: number,
  //   houseId: number,
  //   playerId: number
  // ): void {

  //   if (this.whosTurn?.id !== playerId) {
  //     return;
  //   }



  //   if (this.gameplays) {
  //     let gameplay = this.gameplays[gameplayIndex];

  //     let clickedHouseIndex = gameplay.houseValues.findIndex((v) => {
  //       return v.id == houseId;
  //     });
  //     let seeds = gameplay.houseValues[clickedHouseIndex].value;
  //     gameplay.houseValues[clickedHouseIndex].value = 0;



  //     let currentHouseId = houseId
  //     let currentGamePlayIndex = gameplayIndex
  //     for (let index = seeds; index >= 1; index--) {
  //       let currentGamePlay = this.gameplays[currentGamePlayIndex];

  //       currentHouseId++;

  //       if (currentHouseId <= 6) {
  //         let currentHouseIndex = currentGamePlay.houseValues.findIndex((v) => {
  //           return v.id == currentHouseId;
  //         });


  //         ////check if in player's side
  //         ////check if seeds is 0
  //         ////get ung adjacent  value
  //         if (this.whosTurn?.id == currentGamePlay.player.id && currentGamePlay.houseValues[currentHouseIndex].value == 0) {
  //           console.log('get adjacent  seeds ', currentHouseIndex);
  //         }
  //         currentGamePlay.houseValues[currentHouseIndex].value++;
  //       }

  //       if (currentHouseId > 6) {
  //         if (currentGamePlay.player.id === playerId) {
  //           currentGamePlay.zoneValue++

  //           this.playerZoneValue(currentGamePlay.player.id)
  //           currentHouseId = 0;

  //         }

  //       }


  //       this.gameplays[currentGamePlayIndex] = currentGamePlay;
  //       if (currentHouseId === 0) {

  //         if (index > 1) {

  //           currentGamePlayIndex = currentGamePlayIndex == 0 ? 1 : 0;
  //         }
  //       } else {

  //         if (index == 1 && currentHouseId <= 6) {

  //           if (this.whosTurn?.id == this.playerOne?.id) {
  //             this.whosTurn = this.playerTwo;
  //           } else {
  //             this.whosTurn = this.playerOne;
  //           }
  //         }
  //       }
  //     }

  //   }
}



