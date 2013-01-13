var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="LIB/hashparams.ts" />
/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/storage/storage.ts" />
/// <reference path="Page.ts" />
/// <reference path="app.ts" />
/// <reference path="level.ts" />
var PG;
(function (PG) {
    var LevelPage = (function (_super) {
        __extends(LevelPage, _super);
        function LevelPage() {
            _super.apply(this, arguments);

            this._render = function () {
                return $.getScript('js/level.js').done(function () {
                    window['level'] = new PG.Level(parseInt(PG.Utils.getHashParams()['level']));
                });
            };
        }
        return LevelPage;
    })(PG.Page);
    PG.LevelPage = LevelPage;    
})(PG || (PG = {}));
