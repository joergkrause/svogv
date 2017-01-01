import { Colors } from './enum-colors';

export class InfoBoxOptions {

    hasProgress: boolean;
    color: Colors;

    constructor() {
        this.hasProgress = false;
        this.color = Colors.Blue;
    }

}