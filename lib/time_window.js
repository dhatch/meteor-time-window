TimeWindow = (function () {
    var intervalHandle;

    // @param length the amount of time (in ms) between the start and end
    //   of this window.
    // @param frequency the frequency of updates to the window (in ms)

    // @constructor
    function TimeWindow (length, frequency) {
        this.dep = new Deps.Dependency();
        this.length = length;
        this.frequency = frequency;
        this.now = null;

        this.update();

        var that = this;

        intervalHandle = Meteor.setInterval(function () {
            if (that.dep.hasDependents()) {
                that.update();
            }
        }, this.frequency);
    }

    TimeWindow.prototype.update = function () {
        this.now = new Date().getTime();
        this.dep.changed();
    };

    TimeWindow.prototype.start = function () {
        this.dep.depend();
        return this.now - this.length;
    };

    TimeWindow.prototype.end = function () {
        this.dep.depend();
        return this.now;
    };

    return TimeWindow;
})();