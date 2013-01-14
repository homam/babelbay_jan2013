var PG;
(function (PG) {
    var Level = (function () {
        function Level(levelNumber) {
            this.levelNumber = levelNumber;
            this.lastNextOrBackTime = null;
            var self = this;
            touchwipe({
                wipeLeft: function () {
                    return self.next();
                },
                wipeRight: function () {
                    return self.back();
                }
            }, window);
            $.when($.get("js/bookmarks.js"), $.get("data/" + levelNumber + ".js", null, null, 'text')).done(function (defBookmars, defLevelStr) {
                self.bookmarks = new PG.Bookmarks();
                var levelStr = defLevelStr[0];
                var level = JSON.parse(levelStr);
                $("h1").text(level.name[app.nativeLang].Native);
                var ul = $("#steps");
                var template = $("#steps li.level-step").remove();
                level.words.forEach(function (word) {
                    var li = template.clone();
                    li.attr("data-stepid", word.id);
                    li.find(".target").text(word.translations[app.targetLang].Target);
                    li.find(".image img").attr("src", "http://m.babelbay.com/LevelsMedia/Set" + levelNumber + "/" + (word.id) + ".jpg");
                    li.find(".native").text(word.translations[app.nativeLang].Native);
                    var audio = new Audio('http://m.babelbay.com/services/tts.ashx?lang=' + app.targetLang + '&level=' + levelNumber + '&id=' + word.id);
                    audio.preload = 'auto';
                    li[0]['audio'] = audio;
                    ul.append(li);
                });
                self.goto(0);
            }).fail(function () {
                console.log("error", arguments);
            });
        }
        Level.prototype.showElStep = function (el) {
            el.addClass("current");
            var stepId = parseInt(el.attr("data-stepid"));
            ($("body")[this.bookmarks.isBookmarked(this.levelNumber, stepId) ? 'addClass' : 'removeClass'])("bookmarked");
        };
        Level.prototype.goto = function (index) {
            $("#steps .current").removeClass(".current");
            var el = $($("#steps").find("li")[index]);
            this.showElStep(el);
        };
        Level.prototype.canMove = function () {
            var now = new Date();
            if(!this.lastNextOrBackTime || ((now.valueOf() - this.lastNextOrBackTime.valueOf()) > 700)) {
                this.lastNextOrBackTime = now;
                return true;
            }
            return false;
        };
        Level.prototype.next = function () {
            if(!this.canMove()) {
                return;
            }
            var el = $("#steps").find("li.current");
            var nextEl = el.next();
            if(nextEl.length > 0) {
                this.showElStep(nextEl);
                el.removeClass("current");
            }
        };
        Level.prototype.back = function () {
            if(!this.canMove()) {
                return;
            }
            var el = $("#steps").find("li.current");
            var prevEl = el.prev();
            if(prevEl.length > 0) {
                this.showElStep(prevEl);
                el.removeClass("current");
            }
        };
        Level.prototype.playCurrentAudio = function () {
            ($("#steps li.current")[0]['audio']).play();
        };
        Level.prototype.toggleBookmark = function () {
            var stepId = parseInt($("#steps li.current").attr("data-stepid"));
            var added = this.bookmarks.toggleBookmark(this.levelNumber, stepId);
            ($("body")[added ? 'addClass' : 'removeClass'])("bookmarked");
        };
        return Level;
    })();
    PG.Level = Level;    
})(PG || (PG = {}));
