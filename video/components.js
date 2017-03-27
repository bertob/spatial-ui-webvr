var triggerdown = false;

AFRAME.registerComponent("elevatable", {
  schema: {},
  init: function () {
    // console.log("INIT");
    this.start = {};
    this.prev = {};
    this.moving = false;
    this.prev.position = [0, 0, 0];
  },
  update: function () {},
  tick: function (time) {
    var now = {};
    var start = this.start;
    var prev = this.prev;

    if (triggerdown) {
      // console.log("TICK + TRIGGERDOWN");
      now.cursorPosition = document.getElementById("right-hand").components.position.attrValue;
      now.cursorY = now.cursorPosition.y;

      if (!this.moving) {
        // console.log("start");
        start.cursorY = now.cursorY;
        start.elementY = prev.position[1];
        start.position = prev.position;
        prev.cursorY = now.cursorY;
        prev.absDeltaY = 0;

        this.start = start;
        this.prev = prev;
        this.moving = true;
      }
      else {
        // console.log("moving");
        now.relDeltaY = now.cursorY - prev.cursorY;
        now.absDeltaY = prev.absDeltaY + now.relDeltaY * 5;
        now.elementY = start.elementY - now.absDeltaY;

        if (now.relDeltaY !== 0) {

          document.getElementById("elevatable").setAttribute("position", {x: 0, y: now.elementY, z: 0})

          this.prev.position = [0, now.elementY, 0];
          this.prev.absDeltaY = now.absDeltaY;
          this.prev.cursorY = now.cursorY;
        }
      }
    }
    else {
      this.start = {};
      this.moving = false;
    }

  },
  remove: function () {},
  pause: function () {},
  play: function () {}
});
