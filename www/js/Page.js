var PG;
(function (PG) {
    var Page = (function () {
        function Page() {
        }
        Page.prototype.getScripts = function () {
            return null;
        };
        Page.prototype.render = function () {
            return this._render().done(function () {
                return $("body").addClass("loaded");
            });
        };
        Page.prototype._render = function () {
            throw 'has to be implemented';
        };
        return Page;
    })();
    PG.Page = Page;    
})(PG || (PG = {}));
