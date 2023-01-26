import {
    GET_CURRENT_GAME,
    ADD_NEW_PLAYER,
    GET_TURN,
    GET_WHOS_PLAYING,
    PLAY
} from '@app/graphql/graphql.queries';

import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';


@Injectable({
    providedIn: 'root'
})

export class GraphQLService {

    private gameQuery!: QueryRef<any, EmptyObject>
    private whosPlayingQuery!: QueryRef<any, EmptyObject>

    constructor(private apollo: Apollo) {
    }

    setGameQuery(playerId: number) {
        this.gameQuery = this.apollo
            .watchQuery<any>({
                query: GET_CURRENT_GAME,
                variables: {
                    playerId: playerId
                },
                pollInterval: 500 //only used polling to get updated values since i cant make the websocket work
            })
        return this;

    }

    getCurrentGame(): any {
        return this.gameQuery.valueChanges
    }

    getGameQuery() {
        return this.gameQuery;
    }

    addNewPlayer() {
        return this.apollo
            .mutate({
                mutation: ADD_NEW_PLAYER,
            })
    }


    getTurn(playerId?: number, gameId?: number) {
        return this.apollo
            .watchQuery<any>({
                query: GET_TURN,
                variables: {
                    playerId: playerId,
                    gameId: gameId
                },
            }).valueChanges
    }

    setWhosPlayingQuery(gameId?: number) {
        this.whosPlayingQuery = this.apollo
            .watchQuery<any>({
                query: GET_WHOS_PLAYING,
                variables: {
                    gameId: gameId
                },
                pollInterval: 500 //only used polling to get updated values since i cant make the websocket work
            })
        return this;
    }

    getWhosPlaying(): any {
        return this.whosPlayingQuery.valueChanges
    }

    getWhosPlayingQuery() {
        return this.whosPlayingQuery;
    }


    play(playerId?: number, gameId?: number, houseId?: number) {
        return this.apollo
            .mutate({
                mutation: PLAY,
                variables: {
                    playerId: playerId,
                    gameId: gameId,
                    houseId: houseId
                }
            })
    }


}