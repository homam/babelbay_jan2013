var PG;
(function (PG) {
    var Bookmarks = (function () {
        function Bookmarks() {
            this.cache = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        }
        Bookmarks.prototype.getBookmarkedSteps = function (levelId) {
            var filtered = this.cache.filter(function (b) {
                return b.levelId == levelId;
            });
            if(filtered.length > 0) {
                return filtered[0].stepIds;
            } else {
                var stepIds = [];
                this.cache.push({
                    levelId: levelId,
                    stepIds: stepIds
                });
                return stepIds;
            }
        };
        Bookmarks.prototype.isBookmarked = function (levelId, stepId) {
            var level = this.getBookmarkedSteps(levelId);
            return level.indexOf(stepId) > -1;
        };
        Bookmarks.prototype.toggleBookmark = function (levelId, stepId) {
            var level = this.getBookmarkedSteps(levelId);
            var index = level.indexOf(stepId);
            var added = false;
            if(index > -1) {
                level.splice(index, 1);
            } else {
                added = true;
                level.push(stepId);
            }
            localStorage.setItem("bookmarks", JSON.stringify(this.cache));
            return added;
        };
        return Bookmarks;
    })();
    PG.Bookmarks = Bookmarks;    
})(PG || (PG = {}));
