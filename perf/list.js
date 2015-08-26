var Benchmark = require('benchmark');

var LinkedList = require('../LinkedList');

function Contained() {
    this.number = Math.random();
}

Contained.prototype.method = function() {
    return this.number;
};

var items = spawnItems(100000, function(i) {
    return {
        number: Math.random() * i
    };
});

new Benchmark.Suite()
    .add('LinkedList#push()', function() {
        fillList(new LinkedList());
    })
    .add('Array#push()', function() {
        fillList(new Array());
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('error', function(event) {
        console.log(event);
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();

prepareList();
prepareArray();

new Benchmark.Suite().add('LinkedList#each()', function() {
        var sum = 0;
        list.each(function(item) {
            sum += item.number;
        });
    })
    .add('Array#forEach()', function() {
        var sum = 0;
        array.forEach(function(item) {
            sum += item.number;
        });
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('error', function(event) {
        console.log(event);
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();

global.removeCount = items.length / 2;

prepareList();
prepareArray();

new Benchmark.Suite()
    .add('LinkedList#remove()', function() {
        for (var i = 0; i < global.removeList.length; i++) {
            global.list.remove(global.removeList[i]);
        }
    }, {
        onCycle: prepareList
    })
    .add('Array#splice()', function() {
        for (var i = 0; i < global.removeArray.length; i++) {
            array.splice(global.removeArray[i], 1);
        }
    }, {
        onCycle: prepareArray
    })
    .on('cycle', function(event) {
        console.log(String(event.target));
    })
    .on('error', function(event) {
        console.log(event);
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').pluck('name'));
    })
    .run();



function spawnItems(count, factory) {
    var items = [];
    for (var i = 0; i < count; i++) {
        items.push(factory(i));
    }
    return items;
}

function fillList(list) {
    return items.map(function(item) {
        return list.push(item)
    });
}

function prepareList() {
    global.list = new LinkedList();
    var links = fillList(global.list);
    global.removeList = [];
    var size = items.length;
    for (var i = 0; i < global.removeCount; i++) {
        var index = Math.random() * size-- | 0;
        global.removeList.push(links[index]);
    }
}

function prepareArray() {
    global.array = new Array();
    fillList(global.array);
    global.removeArray = [];
    var size = items.length;
    for (var i = 0; i < global.removeCount; i++) {
        var index = Math.random() * size-- | 0;
        global.removeArray.push(index);
    }
}
