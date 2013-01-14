var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var PG;
(function (PG) {
    var IndexPage = (function (_super) {
        __extends(IndexPage, _super);
        function IndexPage() {
            _super.apply(this, arguments);

            this._render = function () {
                var renderLevels = function (levelsStr) {
                    var levels = JSON.parse(levelsStr);
                    var ul = $("#levels");
                    var template = ul.find("li").remove();
                    levels.forEach(function (level) {
                        var li = template.clone();
                        li.css("background-image", "url('http://m.babelbay.com/LevelsMedia/Set" + level.number + "/" + (level.number * 100 + 1) + ".jpg')");
                        li.find(".name").text(level.name[app.nativeLang].Native);
                        li.find("a").attr("href", 'javascript:switchPage("level.html#level=' + level.number + '")');
                        ul.append(li);
                    });
                    $("body").addClass("loaded");
                    localStorage.setItem('levels', levelsStr);
                };
                return $.get("data/levels.js").done(renderLevels);
            };
        }
        return IndexPage;
    })(PG.Page);
    PG.IndexPage = IndexPage;    
})(PG || (PG = {}));
