module.exports = LinkedList;

function LinkedList() {
    this.first = this.last = null;
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
    item.prev = item.next = null;
};

LinkedList.prototype.each = function(iterator, method) {
    iterator = normalizeIterator(iterator, method);
    var item = this.first;
    while (item) {
        iterator(item.value);
        item = item.next;
    }
};

function LinkedListItem(value) {
    this.prev = this.next = null;
    this.value = value;
}

function normalizeIterator(iterator, method) {
    if (typeof iterator === 'function') {
        if (typeof method === 'object') {
            return function(member) {
                return iterator.call(method, member);
            };
        }
    } else {
        return function(member) {
            return iterator[method](member);
        };
    }
    return iterator;
}
