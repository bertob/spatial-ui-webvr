
var list_items = 58;
var visible_items = 12;
var scroll_position = 14; // 0...(10-4)

var x_offset = 0;
var y_offset = 1.4; // 1m from the floor
var z_offset = -0.6; // 40cm before viewer

var el_h = 0.032*3;
var el_w = 0.1*3;
var el_d = 0.002;

var z_gap = 0.002;
var y_gap = 0.003;

var top_baseline = y_offset + (visible_items - 1) * (el_h + y_gap);
var bottom_baseline = y_offset;

// Render static stack of items

for (var i=0; i<list_items; i++) {
  var x, y, z;
  x = x_offset;
  var real_position = i - scroll_position;

  if (real_position < 0) {
    // stacked on bottom
    offset = Math.abs(real_position);
    y = bottom_baseline - Math.log(offset + 1)*0.03;
    z = z_offset - (offset * (el_d + z_gap));
  }
  else if (real_position > (visible_items - 1)) {
    // stacked on top
    offset = real_position - visible_items + 1;
    y = top_baseline + Math.log(offset + 1)*0.03;
    z = z_offset - (offset * (el_d + z_gap));
  }
  else {
    // visible in list
    y = y_offset + real_position * (el_h + y_gap);
    z = z_offset;
  }

  var el = document.createElement('a-box');
  el.setAttribute('position', x + " " + y + " " + z);
  el.setAttribute('height', el_h);
  el.setAttribute('width', el_w);
  el.setAttribute('depth', el_d);
  el.setAttribute('color', '#fff');
  // el.setAttribute('hoverable', '');
  el.setAttribute('grabbable', '');
  // el.setAttribute('drag-droppable', '');
  el.setAttribute('src', 'assets/card.png');
  document.getElementById("scene").appendChild(el);
}


// Move items along path

var curve_top = [];
var curve_bottom = [];

for (var i=0; i<12; i++) {
  var v = Math.pow(i, 1/6) * 0.3;
  curve_top.push([0, top_baseline + v, z_offset - i*0.02]);
  curve_bottom.unshift([0, bottom_baseline - v, z_offset - i*0.02]);
}

var path = curve_bottom.concat(curve_top);
var path_str = "";
for (var i=0; i<path.length; i++) {
  path_str += " " + path[i].toString();
}

// for (var i=0; i<130; i++) {
//   var el = document.createElement('a-box');
//   el.setAttribute('position', path[0][0] + " " + path[0][1] + " " + path[0][2]);
  // el.setAttribute('height', el_h);
  // el.setAttribute('width', el_w);
  // el.setAttribute('depth', el_d);
//   el.setAttribute('color', '#fff');
//   el.setAttribute('src', 'assets/card.png');
//   el.setAttribute("alongpath", "path:" + path_str + "; closed:true; loop:true; dur:30000; delay:" + i*100 + "; inspect:false;");
//
//   var avatar = document.createElement('a-circle');
//   avatar.setAttribute('radius', 1);
//   var id = Math.floor(Math.random()*12) + 1;
//   avatar.setAttribute('src', 'assets/' + id + '.jpg');
//   avatar.setAttribute('color', '#fff');
//   avatar.setAttribute("scale", {x: 0.01/el_w, y: 0.01/el_h});
//   avatar.setAttribute("position", {x: -0.0345/el_w, y: 0, z: 1.001});
//   avatar.setAttribute("material", "side:double");
//
//   el.appendChild(avatar);
//   document.getElementById("scene").appendChild(el);
// }
