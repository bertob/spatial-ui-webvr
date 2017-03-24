document.getElementById("right-hand").addEventListener("triggerdown", function() {
  console.log("TRIGGER DOWN");
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log("TRIGGER UP");
  triggerdown = false;
});
// document.getElementById("left-hand").addEventListener("triggerdown", function() {
//   console.log("TRIGGER DOWN");
//   triggerdownLeft = true;
// });
// document.getElementById("left-hand").addEventListener("triggerup", function() {
//   console.log("TRIGGER UP");
//   triggerdownLeft = false;
// });


// for (var i=0; i<list_length; i++) {
//   var card = document.createElement("a-entity");
//   card.setAttribute("card", "list_position: " + i);
//   document.getElementById("scene").appendChild(card);
// }

// RING OF ITEMS
var ring = {};
ring.x = 0;
ring.y = 1;
ring.z = 0;
ring.radius = 1.4;

ring.row_gap = 0.04;
// ring.column_gap = 0.03;
ring.angular_gap = 7.5; // degrees rotation

ring.card_w = 0.15;
ring.card_h = ring.card_w * 3/4;
ring.card_d = 0.003;
ring.title_h = 0.2;

ring.rows = 58;

var ring_container = document.createElement("a-entity");
var extra_y_space = 0;

for (var i=0; i<ring.rows; i++) {

  if (i%6 === 0) {
    var month_title = document.createElement("a-entity");
    extra_y_space += ring.title_h;
    month_title.setAttribute("position", {x: ring.x  + Math.cos(-90*Math.PI/180) * ring.radius - 0.13,
                                          y: ring.y - (ring.row_gap + ring.card_h) * i - extra_y_space + 0.1,
                                          z: ring.z + Math.sin(-90*Math.PI/180) * ring.radius});
    month_title.setAttribute("text-geometry", "value: " + (2000+i/6) + "; size: 0.08; height: 0.001;");
    month_title.setAttribute("rotation", {y: 0});
    month_title.setAttribute("material", "color: #fff");

    ring_container.appendChild(month_title);
  }

  // item every n degrees along the circle
  for (var a=0; a<360; a+=ring.angular_gap) {
    var id = Math.floor(Math.random()*6) + 1;
    var item = document.createElement("a-entity");
    item.setAttribute("geometry", "primitive: box; width:" + ring.card_w +
                         "; height:" + ring.card_h + "; depth: " + ring.card_d + ";");
    // item.setAttribute("geometry", "primitive: sphere; radius:" + ring.card_w);
    item.setAttribute("rotation", {y: 90 - a});
    item.setAttribute("material", "color: white; src: #img" + id);
    item.setAttribute("position", {x: ring.x + Math.cos(a*Math.PI/180) * ring.radius,
                                   y: ring.y - (ring.row_gap + ring.card_h) * i - extra_y_space,
                                   z: ring.z + Math.sin(a*Math.PI/180) * ring.radius});
    ring_container.appendChild(item);

  }
  document.getElementById("elevatable").appendChild(ring_container);
}

// DETAIL VIEW
// var detail = document.createElement("a-entity");
// detail.setAttribute("geometry", "primitive: box; width:" + yrs.card_w*12 +
// "; height:" + yrs.card_h*12 + "; depth: " + yrs.card_d + ";");
// detail.setAttribute("material", "color: white; src: #img" + id);
// detail.setAttribute("rotation", {y: -40});
// detail.setAttribute("position", {x: 0.8, y: 1.6, z: -0.2});
// document.getElementById("scene").appendChild(detail);
