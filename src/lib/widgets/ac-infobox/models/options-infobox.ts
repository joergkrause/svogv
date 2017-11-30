/**
 * Additional options for the control.
 * If not provided the control assumes the values from other settings.
 */
export class AcInfoBoxOptions {

    hasProgress: boolean;
    hasFooter: boolean;

    constructor() {
        this.hasProgress = false;
        this.hasFooter = false;
    }

}