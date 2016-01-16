var fs = require('fs');

var cv = fs.readFileSync('metro/cleared/moscow-metro-map-ru-2.1.2__1_res.txt', 'utf-8');

var stations = [];

var getKeyValue = function(all, name, coords) {
	var matches = coords.match(/X: (\d+)\s*Y: (\d+)\s*Width: (\d+)\s*Height: (\d+)\s*/);
	stations.push({
		name: name.toLowerCase(),
		x: matches[1],
		y: matches[2],
		w: matches[3],
		h: matches[4]
	});
};

cv.replace(/Recognition: "(.*?)"[\s\S]*?Bbox {([\s\S]*?)}/g, getKeyValue);

fs.writeFileSync('stations.json', JSON.stringify(stations, null, 4), 'utf-8');

console.log(stations.length);
