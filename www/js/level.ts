/// <reference path="lib/jquery-1.8.d.ts" />
/// <reference path="lib/touchwipe.ts" />
/// <reference path="app.ts" />
/// <reference path="Bookmarks.ts" />

module PG {
    export class Level {
        private currentStep: number;

        public bookmarks: PG.Bookmarks;

        constructor(public levelNumber: number) {
            var self = this;
            touchwipe({
                wipeLeft: () => self.next(),
                wipeRight: () => self.back()
            }, window);

            $.when($.get("js/bookmarks.js"), $.get("data/" + levelNumber + ".js", null, null, 'text'))
            .done((defBookmars,defLevelStr) => {
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
                    
                    var audio = new Audio('http://m.babelbay.com/services/tts.ashx?lang=' + app.targetLang + '&level=' + levelNumber + '&id=' + word.id );
                    audio.preload = 'auto';
                    li[0]['audio'] = audio;
                    
                    ul.append(li);
                });

                self.goto(0);
            }).fail(function () {
                console.log("error", arguments);
            });
        }

        private showElStep(el: JQuery) {
            el.addClass("current");
            var stepId = parseInt(el.attr("data-stepid"));
            (<any>$("body")[this.bookmarks.isBookmarked(this.levelNumber,stepId) ? 'addClass' : 'removeClass'])("bookmarked");
        }

        public goto(index: number) {
            $("#steps .current").removeClass(".current");
            var el = $($("#steps").find("li")[index]);
            this.showElStep(el);
        }

        private lastNextOrBackTime:Date = null;
        private canMove () :bool {
            var now = new Date();
            if (!this.lastNextOrBackTime || ((now.valueOf() - this.lastNextOrBackTime.valueOf()) > 700)) {
                this.lastNextOrBackTime = now;
                return true;
            }
            return false;
        }

        public next() { 
            if(!this.canMove()) return;
            var el = $("#steps").find("li.current");
            var nextEl = el.next();
            if (nextEl.length > 0) {
                this.showElStep(nextEl);
                el.removeClass("current");
            }
        }

        public back() { 
            if(!this.canMove()) return;
            var el = $("#steps").find("li.current");
            var prevEl = el.prev();
            if (prevEl.length > 0) {
                this.showElStep(prevEl);
                el.removeClass("current");
            }
        }

        public playCurrentAudio() {
            (<HTMLAudioElement> $("#steps li.current")[0]['audio']).play();
        }

        public toggleBookmark() {
            var stepId = parseInt($("#steps li.current").attr("data-stepid"));
            var added = this.bookmarks.toggleBookmark(this.levelNumber, stepId);
            (<any>$("body")[added ? 'addClass' : 'removeClass'])("bookmarked");
        }
    }
}