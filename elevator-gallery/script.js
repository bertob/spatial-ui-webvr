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


for (var i=0; i<list_length; i++) {
  var card = document.createElement("a-entity");
  card.setAttribute("card", "list_position: " + i);
  document.getElementById("scene").appendChild(card);
}

// YEAR OVERVIEW GRID
var yrs = {};
yrs.x = -0.9;
yrs.y = 1.8;
yrs.z = -1.7;
yrs.row_gap = 0.04;
yrs.column_gap = 0.03;
yrs.stack_gap = 0.005;
yrs.card_w = 0.1;
yrs.card_h = yrs.card_w * 3/4;
yrs.card_d = 0.003;

var decades = [1910, 1920, 1930, 1940, 1950, 1960];

for (var i=0; i<decades.length; i++) {

  var overview_container = document.createElement("a-entity");
  overview_container.setAttribute("rotation", {y: 80});

  var decade_title = document.createElement("a-entity");
  decade_title.setAttribute("position", {x: yrs.x - (yrs.card_w/2) - 0.08,
                                         y: yrs.y - (yrs.row_gap + yrs.card_h) * i + 0.01,
                                         z: yrs.z});
  decade_title.setAttribute("text-geometry", "value: " + decades[i] + "; size: 0.02; height: 0.001;");
  decade_title.setAttribute("material", "color: #fff");

  overview_container.appendChild(decade_title);

  // years in the decade
  for (var j=0; j<10; j++) {

    // stack of elements for one year
    var no_items = Math.floor(Math.random()*15) + 2;
    if (i===0 && j<3) no_items = 0;
    if (i===(decades.length-1) && j>6) no_items = 0;
    for (var k=0; k<no_items; k++) {

      var id = Math.floor(Math.random()*6) + 1;
      var item = document.createElement("a-entity");
      item.setAttribute("geometry", "primitive: box; width:" + yrs.card_w +
                           "; height:" + yrs.card_h + "; depth: " + yrs.card_d + ";");
      item.setAttribute("material", "color: white; src: #img" + id);
      item.setAttribute("position", {x: yrs.x + (yrs.column_gap + yrs.card_w) * j,
                                     y: yrs.y - (yrs.row_gap + yrs.card_h) * i,
                                     z: yrs.z - (yrs.stack_gap + yrs.card_d) * k});
      overview_container.appendChild(item);
    }

  }
  document.getElementById("elevatable").appendChild(overview_container);
}

// DETAIL VIEW
var detail = document.createElement("a-entity");
detail.setAttribute("geometry", "primitive: box; width:" + yrs.card_w*12 +
"; height:" + yrs.card_h*12 + "; depth: " + yrs.card_d + ";");
detail.setAttribute("material", "color: white; src: #img" + id);
detail.setAttribute("rotation", {y: -40});
detail.setAttribute("position", {x: 0.8, y: 1.6, z: -0.2});
// document.getElementById("scene").appendChild(detail);
