var list_length = 12;
var visible_items = 6;
var scroll_position = 0; // 0...(list_length - visible_items)

var x_offset = 0;
var y_offset = 1.4; // 1.4m from the floor
var z_offset = -0.6; // 60cm before viewer

var card_w = 0.3;
var card_h = 0.1;
var card_d = 0.002;

var z_gap = 0.002;
var y_gap = 0.003;

var top_baseline = y_offset + (visible_items - 1) * (card_h + y_gap);
var bottom_baseline = y_offset;

var cursor_y = 3;
var abs_delta_y = 0; // change in height since the trigger has been pressed
var triggerdown = false;

AFRAME.registerComponent("card", {
  schema: {
    list_position: {type: "int"},
  },
  init: function () {
    console.log("INIT");
    this.start = {};
    this.prev = {};
    this.moving = false;
    var x, y, z;
    x = x_offset;

    var real_position = this.data.list_position - scroll_position;

    y = y_offset + real_position * (card_h + y_gap);
    z = z_offset;

    //
    // if (real_position < 0) {
    //   // stacked on bottom
    //   offset = Math.abs(real_position);
    //   y = bottom_baseline - Math.log(offset + 1)*0.03;
    //   z = z_offset - (offset * (card_d + z_gap));
    // }
    // else if (real_position > (visible_items - 1)) {
    //   // stacked on top
    //   offset = real_position - visible_items + 1;
    //   y = top_baseline + Math.log(offset + 1)*0.03;
    //   z = z_offset - (offset * (card_d + z_gap));
    // }
    // else {
    //   // visible in list
    //   y = y_offset + real_position * (card_h + y_gap);
    //   z = z_offset;
    // }

    this.el.setAttribute("geometry", "primitive: box; width:" + card_w +
                         "; height:" + card_h + "; depth: " + card_d + ";");
    this.el.setAttribute("material", "color: white; src: url(assets/card.png);");
    this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    this.prev.position = [x, y, z];
  },
  update: function () {},
  tick: function (time) {
    var now = {};
    var start = this.start;
    var prev = this.prev;

    if (triggerdown) {
      console.log("TICK + TRIGGERDOWN");
      now.cursorPosition = document.getElementById("right-hand").components.position.attrValue;
      now.cursorY = now.cursorPosition.y;

      if (!this.moving) {
        console.log("start");
        start.cursorY = now.cursorY;
        start.cardY = prev.position[1];
        start.position = prev.position;
        prev.cursorY = now.cursorY;
        prev.absDeltaY = 0;

        this.start = start;
        this.prev = prev;
        this.moving = true;
      }
      else {
        console.log("moving");
        now.relDeltaY = now.cursorY - prev.cursorY;
        now.absDeltaY = prev.absDeltaY + now.relDeltaY * 3;
        now.cardY = start.cardY + now.absDeltaY;

        if (now.relDeltaY !== 0) {
          var x, y, z;
          x = x_offset;
          var new_y = now.cardY; // theoretical new y value

          if (new_y < bottom_baseline) {
            // stacked on bottom
            var y_below = bottom_baseline - new_y; // how far below the baseline y
            y = bottom_baseline - getCardDepth(y_below);
            z = z_offset - y_below/5;
            console.log("stacked below", y_below);
          }
          else if (new_y > top_baseline) {
            // stacked on top
            var y_above = new_y - top_baseline; // how far above the baseline y
            console.log("stacked above", y_above);
            y = top_baseline + getCardDepth(y_above);
            z = z_offset - y_above/5;
          }
          else {
            // visible in list
            console.log("visible");
            y = new_y;
            z = z_offset;
          }

          this.el.setAttribute("position", new THREE.Vector3( x, y, z ));

          this.prev.position = [x, new_y, z];
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

// returns z position as a function of how far
// outside the visible area the card is
function getCardDepth(y) {
  return Math.sqrt(y/20);
}
