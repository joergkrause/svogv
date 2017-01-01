import { Injectable, EventEmitter } from '@angular/core';

/**
 * Broadcast events through components using a publish/subscribe pattern.
 */
@Injectable()
export class EmitterService {

    private static _emitters: { [ID: string]: EventEmitter<any> } = {};

    public static get(ID: string): EventEmitter<any> {
        console.log(`Emitter for ${ID} called`);
        if (!this._emitters[ID]) {
          console.log(`Emitter for ${ID} added`);
          this._emitters[ID] = new EventEmitter();
        } else {
          console.log(`Emitter for ${ID} exists`);
        }
        return this._emitters[ID];
    }

}