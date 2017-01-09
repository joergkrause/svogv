import { Meaning } from '../../../utils/enum-colors';

export class AcInfoBoxOptions {

    hasProgress: boolean;
    color: Meaning;

    constructor() {
        this.hasProgress = false;
        this.color = Meaning.Danger;
    }

}