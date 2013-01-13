/// <reference path="lib/jquery-1.8.d.ts" />
module PG {
    export class Page {
        public getScripts(): string[] { return null; }

        constructor() {
        }

        public render() :JQueryDeferred { 
            return this._render().done(() => $("body").addClass("loaded"));
        };

        public _render(): JQueryDeferred { throw 'has to be implemented' };
    }
}