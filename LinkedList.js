var Iteration = require('./Iteration');
var AtIterator = require('./AtIterator');

module.exports = LinkedList;

function LinkedList() {
    this.first = this.last = null;
    this.length = 0;
}

LinkedList.prototype.push = function(item) {
    item = new LinkedListItem(item);
    if (this.last) {
        this.last.next = item;
        item.prev = this.last;
    } else {
        this.first = item;
        this.last = item;
    }
    this.last = item;
    this.length++;
    return item;
};

LinkedList.prototype.unshift = function(item) {
    item = new LinkedListItem(item);
    if (this.first) {
        this.first.prev = item;
        item.next = this.first;
    } else {
        this.first = item;
        this.last = item;
    }
    this.first = item;
    this.length++;
    return item;
};

LinkedList.prototype.remove = function(item) {
    if (item === this.last) {
        this.last = item.prev;
    }
    if (item === this.first) {
        this.first = item.next;
    }
    if (item.next) {
        item.next.prev = item.prev;
    }
    if (item.prev) {
        item.prev.next = item.next;
    }
    this.length--;
    item.prev = item.next = null;
};

LinkedList.prototype.each = function(iterator, context) {
    var iteration = new Iteration();
    var item = this.first;
    while (item && !iteration.broken) {
        iterator.call(context, item.value, iteration);
        item = item.next;
    }
    return iteration.result;
};

LinkedList.prototype.eachRight = function(iterator, context) {
    var iteration = new Iteration();
    var item = this.last;
    while (item && !iteration.broken) {
        iterator.call(context, item.value, iteration);
        item = item.prev;
    }
    return iteration.result;
};

LinkedList.prototype.at = function(index) {
    if (index < 0 || index > this.length - 1) {
        throw new RangeError('index out of bounds');
    }
    var iterator = new AtIterator(this, index);
    return iterator.direction === 1 ? this.each(iterator) : this.eachRight(iterator);
};

function LinkedListItem(value) {
    this.prev = this.next = null;
    this.value = value;
}
