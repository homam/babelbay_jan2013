module PG {
    class CacheItem {
        constructor(public value: any) {
            this.date = new Date();
        }

        public date:Date;

        public toJson(): string {
            return JSON.stringify(this);
        }

        public static fromJson(jsonString: string): CacheItem {
            return JSON.parse(jsonString);
        }
    }

    export class Storage {
        constructor(private name: string) {
        }

        public set (value: any) {
            var cache = new CacheItem(value);
            localStorage.setItem(this.name, cache.toJson());
        }

        public get ():any {
            var cache = CacheItem.fromJson(localStorage.getItem(this.name));
            if(!cache)
                return null;
            return cache.value;
        }
    }
}