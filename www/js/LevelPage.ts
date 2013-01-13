/// <reference path="LIB/hashparams.ts" />
/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/storage/storage.ts" />
/// <reference path="Page.ts" />
/// <reference path="app.ts" />
/// <reference path="level.ts" />

module PG {
    export class LevelPage extends Page {
        _render = function (): JQueryDeferred {

            return $.getScript('js/level.js').done(function () {
			    window['level'] = new PG.Level(parseInt(PG.Utils.getHashParams()['level']));
			});
        }
    }
}

