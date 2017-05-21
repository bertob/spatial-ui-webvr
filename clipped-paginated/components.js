var list_length = 40;
var visible_items = 7;
var scroll_position = 0; // 0...(list_length - visible_items)

var x_offset = 0;
var y_offset = 1.3; // 1.3m from the floor
var z_offset = -0.6; // 60cm before viewer

var card_w = 0.26;
var card_h = card_w * 3/4;
var card_d = 0.002;

var y_gap = 0.007;

var top_baseline = y_offset + (visible_items - 1) * (card_h + y_gap);
var bottom_baseline = y_offset;

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
    x = 0;

    var real_position = this.data.list_position - scroll_position;

    y = real_position * (card_h + y_gap);
    z = 0;

    var id = Math.floor(Math.random()*6) + 1;
    this.el.setAttribute("geometry", "primitive: box; width:" + card_w +
                         "; height:" + card_h + "; depth: " + card_d + ";");
    this.el.setAttribute("material", "color: white; src: #img" + id);
    this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    this.prev.position = [x, y, z];
  },
  update: function () {},
  tick: function (time) {
    abs_y = this.el.getAttribute("position").y +
            container.getAttribute("position").y;
    // console.log(abs_y);
    if (abs_y > 2 || abs_y < 1)
      this.el.setAttribute("material", "opacity: 0.05; transparent: true");
    else
      this.el.setAttribute("material", "opacity: 1; transparent: false");
    // var now = {};
    // var start = this.start;
    // var prev = this.prev;
    //
    // if (triggerdown) {
    //   console.log("TICK + TRIGGERDOWN");
    //   now.cursorPosition = document.getElementById("right-hand").components.position.attrValue;
    //   now.cursorY = now.cursorPosition.y;
    //
    //   if (!this.moving) {
    //     console.log("start");
    //     start.cursorY = now.cursorY;
    //     start.cardY = prev.position[1];
    //     start.position = prev.position;
    //     prev.cursorY = now.cursorY;
    //     prev.absDeltaY = 0;
    //
    //     this.start = start;
    //     this.prev = prev;
    //     this.moving = true;
    //   }
    //   else {
    //     console.log("moving");
    //     now.relDeltaY = now.cursorY - prev.cursorY;
    //     now.absDeltaY = prev.absDeltaY + now.relDeltaY * 3;
    //     // now.absDeltaY = prev.absDeltaY + 1;
    //     if (Math.abs(now.absDeltaY) > 0.5) {
    //       now.cardY = start.cardY + now.absDeltaY;
    //       setTimeout(function() {
    //         triggerdown = false;
    //       }, 300)
    //     }
    //     else
    //       now.cardY = start.cardY
    //
    //     if (now.relDeltaY !== 0) {
    //       var x, y, z;
    //       x = x_offset;
    //       var new_y = now.cardY; // theoretical new y value
    //       var visible = false;
    //
    //       if (new_y < bottom_baseline) {
    //         // stacked on bottom
    //         var y_below = bottom_baseline - new_y; // how far below bottom baseline
    //         y = bottom_baseline - getStackedY(y_below);
    //         z = z_offset - getCardDepth(y_below);
    //       }
    //       else if (new_y > top_baseline) {
    //         // stacked on top
    //         var y_above = new_y - top_baseline; // how far above top baseline
    //         y = top_baseline + getStackedY(y_above);
    //         z = z_offset - getCardDepth(y_above);
    //       }
    //       else {
    //         // visible in list
    //         y = new_y;
    //         z = z_offset;
    //         visible = true;
    //       }
    //       if (visible === false) {
    //         this.el.setAttribute("material", "opacity: 0; transparent: true");
    //       }
    //       else {
    //         this.el.setAttribute("material", "opacity: 1; transparent: false");
    //       }
    //       this.el.setAttribute("position", new THREE.Vector3( x, y, z ));
    //
    //       this.prev.position = [x, new_y, z];
    //       this.prev.absDeltaY = now.absDeltaY;
    //       this.prev.cursorY = now.cursorY;
    //     }
    //   }
    // }
    // else {
    //   this.start = {};
    //   this.moving = false;
    // }

  },
  remove: function () {},
  pause: function () {},
  play: function () {}
});

// returns z position as a function of how far
// outside the visible area the card is
function getCardDepth(y) {
  var z_distance = 0.05;
  return y * z_distance;
}

// returns y position of stacked card
function getStackedY(y) {
  var steepness = 0.01; // the higher, the steeper the curve
  return Math.sqrt(y * steepness);
}
