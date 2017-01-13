import { Meaning } from '../../../utils/enum-colors';

export class AcInfoBoxOptions {

    hasProgress: boolean;
    hasFooter: boolean;
    color: Meaning;

    constructor() {
        this.hasProgress = false;
        this.hasFooter = false;
        this.color = Meaning.Danger;
    }

}