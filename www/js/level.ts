/// <reference path="jquery-1.8.d.ts" />
/// <reference path="touchwipe.ts" />

module PG {
    export class Level {
        private currentStep: number;

        constructor(public levelNumber: number) {
            var self = this;
            touchwipe({
                wipeLeft: () => self.next(),
                wipeRight: () => self.back()
            }, window);

            $.get("data/" + levelNumber + ".js", null, null, 'text').done(function (levelStr) {
                var level = JSON.parse(levelStr);
                $("h1").text(level.name.en.Native);
                var ul = $("#steps");
                var template = $("#steps li.level-step").remove();
                level.words.forEach(function (word) {
                    var li = template.clone();
                    li.find(".target").text(word.translations.ar.Target);
                    li.find(".image img").attr("src", "http://m.babelbay.com/LevelsMedia/Set" + levelNumber + "/" + (word.id) + ".jpg");
                    li.find(".native").text(word.translations.en.Native);
                    
                    var audio = new Audio('http://m.babelbay.com/services/tts.ashx?lang=ar&level=' + levelNumber + '&id=' + word.id );
                    audio.preload = 'auto';
                    //li.append(audio);
                    li[0]['audio'] = audio;
                    
                    //li.append($('<audio id="audio-' + word.id + '" src="http://m.babelbay.com/services/tts.ashx?lang=ar&level=' + levelNumber + '&id=' + word.id + '" preload="auto"></audio>'));
                    //li.find("audio")[0].addEventListener('canplay', function () {
                    //    $("h1").text(this['src'].split('?')[1].split('=')[3]);
                    //});
                    
                    ul.append(li);
                });

                self.goto(0);
            }).fail(function () {
                console.log("error", arguments);
            });
        }

        private lastTransitionStarted:Date = new Date();

        public goto(index: number) {
            $("#steps .current").removeClass(".current");
            var el = $($("#steps").find("li")[index]);
            el.addClass("current");
        }

        public next() { 
            var el = $("#steps").find("li.current");
            var nextEl = el.next();
            if (nextEl.length > 0) {
                nextEl.addClass("current");
                el.removeClass("current");
            }
        }
        public back() { 
            var el = $("#steps").find("li.current");
            var prevEl = el.prev();
            if (prevEl.length > 0) {
                prevEl.addClass("current");
                el.removeClass("current");
            }
        }

        public playCurrentAudio() {
            (<HTMLAudioElement> $("#steps li.current")[0]['audio']).play();
        }
    }
}