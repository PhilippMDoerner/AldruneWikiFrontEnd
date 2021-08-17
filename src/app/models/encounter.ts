import { EncounterConnection } from "src/app/models/encounterconnection";
import { Constants } from '../app.constants';
import { ArticleObject } from './base-models';

export interface Encounter extends ArticleObject{
    pk?: number,
    description: string,
    encounterConnections?: EncounterConnection[],
    location: number,
    location_details?: {name: string, pk: number, name_full: string, parent_location_name: string},
    title: string,
    diaryentry: number,
    order_index: number;
}

/**
 * SPECIAL REMARK: The value of order_index should always be divisible by 10. If it isn't, that means the
 * order_index is "shifted". This can happen during swapping of order_indices with another Encounterobject,
 * e.g. when moving an Encounter around the list of Encounters in a session. More precisely, when updating
 * the database with the new order_index values of both encounters, one of the two encounter's doesn't get
 * the order_index of the other, but one "shifted" from that (usually the next possible order_index. So if
 * your order_index is 10, the shifted position would be 11). This is done so you only need to update each
 * Encounter once, as otherwise the unique-together condition that the Db has on the Session+OrderIndex column
 * of the encounters table would block you. If you didn't do this, you'd need to first update one encounter 
 * to have an order_index of null, so that the second encounter can have the first encounter's order_index. 
 */


export class EncounterObject implements Encounter {
    orderIndexIncrement: number = 10;

    name?: string;
    pk?: number;
    description: string;
    encounterConnections?: EncounterConnection[];
    location: number;
    location_details?: {name: string, pk: number, name_full: string, parent_location_name: string};
    title: string;
    diaryentry: number;
    order_index: number;


    constructor(object?: Encounter){
        if (object) Object.assign(this, object);
    }


    hasShiftedOrderIndex(): boolean{
        return this.order_index % this.orderIndexIncrement > 0;
    }

    getShiftedOrderIndex(): number{
        return (this.hasShiftedOrderIndex()) ? this.order_index : this.order_index + 1;
    }

    getUnshiftedOrderIndex(): number{
        return Math.floor(this.order_index / this.orderIndexIncrement) * this.orderIndexIncrement;
    }

    unshiftOrderIndex(): void{
        this.order_index = this.getUnshiftedOrderIndex();
    }

    swapOrderIndexState(): void{
        this.hasShiftedOrderIndex() ? this.unshiftOrderIndex() : this.shiftOrderIndex();
    }

    shiftOrderIndex(): void{
        this.order_index++;
    }

    nextOrderIndex(){
        return this.getUnshiftedOrderIndex() + this.orderIndexIncrement;
    }

    priorOrderIndex(){
        return this.getUnshiftedOrderIndex() - this.orderIndexIncrement;
    }

    //TODO: Get rid of hard-coded URL patterns in objects
    getAbsoluteRouterUrl(): string{
        if (!this.pk) throw "Can't generate URL for Encounter object without pk";
        return `${Constants.wikiUrlFrontendPrefix}/encounter/${this.pk}`;
    }

    getAbsoluteLocationRouterUrl(): string{
        if (!this.location_details) throw "Can't generate URL for Location of Encounter object without locatoin_details !";
        return `${Constants.wikiUrlFrontendPrefix}/location/${this.location_details.parent_location_name}/${this.location_details.name}`;
    }
}