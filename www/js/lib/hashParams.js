var PG;
(function (PG) {
    var Utils = (function () {
        function Utils() { }
        Utils.getHashParams = function getHashParams() {
            var hashParams = {
            };
            var e, a = /\+/g, r = // Regex for replacing addition symbol with a space
            /([^&;=]+)=?([^&;]*)/g, d = function (s) {
return decodeURIComponent(s.replace(a, " "));            }, q = window.location.hash.substring(1);
            while(e = r.exec(q)) {
                hashParams[d(e[1])] = d(e[2]);
            }
            return hashParams;
        }
        return Utils;
    })();
    PG.Utils = Utils;    
})(PG || (PG = {}));
