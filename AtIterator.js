module.exports = AtIterator;

function AtIterator(list, targetIndex) {
    this.targetIndex = targetIndex;
    this.middle = list.length / 2 | 0;
    var right = targetIndex > this.middle;
    this.index = right ? list.length - 1 : 0;
    this.direction = right ? -1 : 1;
}

AtIterator.prototype.call = function(context, element, iteration) {
    if (this.index === this.targetIndex) {
        iteration.stop(element);
    } else if (this.index === this.middle) {
        iteration.stop();
    }
    this.index += this.direction;
};
