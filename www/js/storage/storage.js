var PG;
(function (PG) {
    var CacheItem = (function () {
        function CacheItem(value) {
            this.value = value;
            this.date = new Date();
        }
        CacheItem.prototype.toJson = function () {
            return JSON.stringify(this);
        };
        CacheItem.fromJson = function fromJson(jsonString) {
            return JSON.parse(jsonString);
        }
        return CacheItem;
    })();    
    var Storage = (function () {
        function Storage(name) {
            this.name = name;
        }
        Storage.prototype.set = function (value) {
            var cache = new CacheItem(value);
            localStorage.setItem(this.name, cache.toJson());
        };
        Storage.prototype.get = function () {
            var cache = CacheItem.fromJson(localStorage.getItem(this.name));
            if(!cache) {
                return null;
            }
            return cache.value;
        };
        return Storage;
    })();
    PG.Storage = Storage;    
})(PG || (PG = {}));
