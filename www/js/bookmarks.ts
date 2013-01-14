/// <reference path="lib/jquery-1.8.d.ts" />


module PG {
    export interface IBookmarkLevelCache {
        levelId: number;
        stepIds: number[];
    }


    export class Bookmarks {
        private cache: IBookmarkLevelCache[];

        constructor() {
            this.cache = JSON.parse(localStorage.getItem("bookmarks") || "[]");
        }

        public getBookmarkedSteps(levelId: number):number[] {
            var filtered = this.cache.filter(b => b.levelId == levelId);
            if (filtered.length > 0)
                return filtered[0].stepIds;
            else {
                var stepIds = [];
                this.cache.push({ levelId: levelId, stepIds: stepIds});
                return stepIds;
            }
        }

        public isBookmarked(levelId: number, stepId: number): bool {
            var level = this.getBookmarkedSteps(levelId);
            return level.indexOf(stepId) > -1;
        }

        //returns true if bookmark added
        public toggleBookmark(levelId: number, stepId: number): bool {
            var level = this.getBookmarkedSteps(levelId);
            var index = level.indexOf(stepId);
            var added = false;
            if (index > -1) {
                level.splice(index, 1);
            } else {
                added = true;
                level.push(stepId);
            }

            localStorage.setItem("bookmarks", JSON.stringify(this.cache));

            return added;
        }
    }
}