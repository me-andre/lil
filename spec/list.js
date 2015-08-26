var _ = require('lodash');
var expect = require('chai').expect;
var LinkedList = require('../LinkedList');

describe('LinkedList', function() {
    var items = spawnItems(10000, function(i) {
        return {
            number: Math.random() * i
        };
    });

    function fillList(list) {
        return items.map(function(item) {
            return list.push(item)
        });
    }

    it('can be filled in', function() {
        expect(function() {
            fillList(new LinkedList());
        }).not.to.throw(Error);
    });

    it('will contain all the items', function() {
        var members = [];
        var list = new LinkedList();
        fillList(list);
        list.each(function(member) {
            members.push(member);
        });
        expect(members).to.have.length(items.length);
    });

    it('will hold proper values', function() {
        var members = [];
        var list = new LinkedList();
        fillList(list);
        list.each(function(member) {
            members.push(member);
        });
        expect(members).to.be.eql(items);
    });

    describe('LinkedList#remove()', function() {

        describe('removing a random item from the middle', function() {
            var index = items.length / 4 + Math.random() * items.length / 2 | 0;
            shouldRemoveAt(index);
        });

        describe('removing the 1st item', function() {
            shouldRemoveAt(0);
        });

        describe('removing the 1st item', function() {
            shouldRemoveAt(items.length - 1);
        });

        function shouldRemoveAt(index) {
            var list = new LinkedList();
            var links = fillList(list);
            list.remove(links[index]);
            var members = getMembers(list);

            it('preserves integrity', function() {
                expect(members.length).to.be.eql(items.length - 1);
            });

            it('removes the given item', function() {
                expect(_.difference(items, members)).to.be.eql([links[index].value]);
            });
        }

    });

});

function spawnItems(count, factory) {
    var items = [];
    for (var i = 0; i < count; i++) {
        items.push(factory(i));
    }
    return items;
}

function getMembers(list) {
    var members = [];
    list.each(function(member) {
        members.push(member);
    });
    return members;
}
