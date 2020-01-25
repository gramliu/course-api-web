const fs = require("fs");

module.exports = {
    updateCache: updateCache,
    readCache: readCache,
};

function updateCache(cache) {
    var now = new Date();
    if ((cache !== undefined &&
       (now.getFullYear() != cache.getFullYear() ||
        now.getMonth() != cache.getMonth())) ||
        cache === undefined) {
        var date = {
            date: now.toDateString()
        };
        fs.writeFile("data/cache.json", JSON.stringify(date), err => {
            if (err) throw err;
            console.log("Updated cache on: " + now.toDateString());
        });
    }
}

function readCache() {
    try {
        var content = fs.readFileSync("data/cache.json", "utf8");
        var jsonObj = JSON.parse(content);
        var cache = jsonObj.date;
        console.log("Loaded cache. Last pulled on: " + cache);
        return cache;
    } catch {
        console.log("Missing or corrupted cache. Pulling from server.");
        updateCache(undefined);
        return new Date();
    }
}
