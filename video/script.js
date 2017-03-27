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

var ring = {};
ring.x = 0;
ring.y = 1;
ring.z = 0;
ring.radius = 1.4;

ring.row_gap = 0.04;
ring.angular_gap = 8; // degrees rotation
ring.vertical_gap = 0.02; // vertical shift

ring.card_w = 0.18;
ring.card_h = ring.card_w * 9/16;
ring.card_d = 0.003;

var no_frames = 10*60; // 1 frame per second, 10 min

// var img_counter = 1;
var ring_container = document.createElement("a-entity");
var extra_y_space = 0;


for (var i=0; i < no_frames; i++) {

  var a = i*ring.angular_gap;
  var id = Math.floor(Math.random()*6) + 1;

  var item = document.createElement("a-entity");
  item.setAttribute("geometry", "primitive: box; width:" + ring.card_w +
                       "; height:" + ring.card_w*3/4 + "; depth: " + ring.card_d + ";");
  item.setAttribute("rotation", {y: 90 - a});
  item.setAttribute("material", "color: white; src: #img" + id);
  item.setAttribute("position", {x: ring.x + Math.cos(a*Math.PI/180) * ring.radius,
                                 y: ring.y + i * ring.vertical_gap,
                                 z: ring.z + Math.sin(a*Math.PI/180) * ring.radius});
  ring_container.appendChild(item);

  // if (i%6 === 0) {
  //   var month_title = document.createElement("a-entity");
  //   extra_y_space += ring.title_h;
  //   month_title.setAttribute("position", {x: ring.x + Math.cos(-90*Math.PI/180) * ring.radius - 0.13,
  //                                         y: ring.y - (ring.row_gap + ring.card_h) * i
  //                                            - extra_y_space + 0.13,
  //                                         z: ring.z + Math.sin(-90*Math.PI/180) * ring.radius});
  //   month_title.setAttribute("text-geometry", "value: " + (1902+i/6) + "; size: 0.08; height: 0.001;");
  //   month_title.setAttribute("rotation", {y: 0});
  //   month_title.setAttribute("material", "color: #fff");
  //
  //   ring_container.appendChild(month_title);
  // }

}
document.getElementById("elevatable").appendChild(ring_container);

// function getImgDimensions(img) {
//   var dim = [img.width, img.height];
//   var ratio = img.width / img.height;
//   if (img.width > img.height) {
//     dim = [ring.card_w, ring.card_w / ratio];
//   }
//   else if (img.height > img.width) {
//     dim = [ring.card_h * ratio, ring.card_h];
//   }
//   return dim;
// }

// DETAIL VIEW
// var detail = document.createElement("a-entity");
// detail.setAttribute("geometry", "primitive: box; width:" + yrs.card_w*12 +
// "; height:" + yrs.card_h*12 + "; depth: " + yrs.card_d + ";");
// detail.setAttribute("material", "color: white; src: #img" + id);
// detail.setAttribute("rotation", {y: -40});
// detail.setAttribute("position", {x: 0.8, y: 1.6, z: -0.2});
// document.getElementById("scene").appendChild(detail);
