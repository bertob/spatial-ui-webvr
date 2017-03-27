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

// RING OF ITEMS
var ring = {};
ring.x = 0;
ring.y = 1;
ring.z = 0;
ring.radius = 1.4;

ring.row_gap = 0.04;
ring.angular_gap = 8; // degrees rotation

ring.card_w = 0.18;
ring.card_h = ring.card_w;
ring.card_d = 0.003;
ring.title_h = 0.2;

ring.rows = 58;

var img_counter = 1;

var ring_container = document.createElement("a-entity");
var extra_y_space = 0;

for (var i=0; i<ring.rows; i++) {

  if (i%6 === 0) {
    var month_title = document.createElement("a-entity");
    extra_y_space += ring.title_h;
    month_title.setAttribute("position", {x: ring.x + Math.cos(-90*Math.PI/180) * ring.radius - 0.13,
                                          y: ring.y - (ring.row_gap + ring.card_h) * i
                                             - extra_y_space + 0.13,
                                          z: ring.z + Math.sin(-90*Math.PI/180) * ring.radius});
    month_title.setAttribute("text-geometry", "value: " + (1902+i/6) + "; size: 0.08; height: 0.001;");
    month_title.setAttribute("rotation", {y: 0});
    month_title.setAttribute("material", "color: #fff");

    ring_container.appendChild(month_title);
  }

  // item every n degrees along the circle
  for (var a=0; a<360; a+=ring.angular_gap) {
    // var id = Math.floor(Math.random()*1127) + 1;
    // var img = document.getElementById("img" + id);
    var img = document.getElementById("img" + img_counter);
    // console.log(i, a, img_counter, img);
    var dimensions = getImgDimensions(img);

    var item = document.createElement("a-entity");
    item.setAttribute("geometry", "primitive: box; width:" + dimensions[0] +
                         "; height:" + dimensions[1] + "; depth: " + ring.card_d + ";");
    item.setAttribute("rotation", {y: 90 - a});
    item.setAttribute("material", "color: white; src: #img" + img_counter);
    item.setAttribute("position", {x: ring.x + Math.cos(a*Math.PI/180) * ring.radius,
                                   y: ring.y - (ring.row_gap + ring.card_h) * i
                                      - (ring.card_h - dimensions[1])/2 - extra_y_space,
                                   z: ring.z + Math.sin(a*Math.PI/180) * ring.radius});
    ring_container.appendChild(item);

    img_counter++;

  }
  document.getElementById("elevatable").appendChild(ring_container);
}

function getImgDimensions(img) {
  var dim = [img.width, img.height];
  var ratio = img.width / img.height;
  if (img.width > img.height) {
    dim = [ring.card_w, ring.card_w / ratio];
  }
  else if (img.height > img.width) {
    dim = [ring.card_h * ratio, ring.card_h];
  }
  return dim;
}

// DETAIL VIEW
// var detail = document.createElement("a-entity");
// detail.setAttribute("geometry", "primitive: box; width:" + yrs.card_w*12 +
// "; height:" + yrs.card_h*12 + "; depth: " + yrs.card_d + ";");
// detail.setAttribute("material", "color: white; src: #img" + id);
// detail.setAttribute("rotation", {y: -40});
// detail.setAttribute("position", {x: 0.8, y: 1.6, z: -0.2});
// document.getElementById("scene").appendChild(detail);
