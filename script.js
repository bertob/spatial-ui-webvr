
var list_items = 58;
var visible_items = 12;
var scroll_position = 14; // 0...(10-4)
var x_offset = 0;
var y_offset = 1.4; // 1m from the floor
var z_offset = -0.6; // 40cm before viewer
var z_gap = 0.002;
var y_gap = 0.003;
var el_h = 0.04;
var el_w = 0.1;
var el_d = 0.002;

for (var i=0; i<list_items; i++) {
  var x, y, z;
  x = x_offset;
  var real_position = i - scroll_position;

  if (real_position < 0) {
    // stacked on bottom
    offset = Math.abs(real_position);
    y = y_offset - Math.log(offset + 1)*0.03;
    z = z_offset - (offset * (el_d + z_gap));
  }
  else if (real_position > (visible_items - 1)) {
    // stacked on top
    offset = real_position - visible_items + 1;
    y = y_offset + (visible_items - 1) * (el_h + y_gap) + Math.log(offset + 1)*0.03;
    z = z_offset - (offset * (el_d + z_gap));
  }
  else {
    // visible in list
    y = y_offset + real_position * (el_h + y_gap);
    z = z_offset;
  }

  var el = document.createElement('a-box');
  el.setAttribute('position', x + " " + y + " " + z);
  el.setAttribute('scale', el_w + " " + el_h + " " + el_d);
  el.setAttribute('color', '#fff');
  document.getElementById("scene").appendChild(el);
}
