document.getElementById("right-hand").addEventListener("triggerdown", function() {
  console.log("TRIGGER DOWN");
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log("TRIGGER UP");
  triggerdown = false;
  nextPage();
});
document.getElementById("right-hand").addEventListener("trackpadup", function() {
  console.log("TRIGGER UP");
  triggerdown = false;
  prevPage();
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
  card.setAttribute("class", "card-element");
  document.getElementById("scene").appendChild(card);
}

// vertical offset between pages
var page_offset = 1.5;

function nextPage () {
  var list = document.getElementsByClassName("card-element");

  for (var i=0; i<list.length; i++) {
    console.log(list[i].getAttribute("position").y);
    currentY = list[i].getAttribute("position").y;
    list[i].setAttribute("position", {"x": x_offset, "y": currentY - page_offset, "z": z_offset});
    // list[i].setAttribute("animation__move", {
    //   "property": "position",
    //   "dir": "alternate",
    //   "dur": 400,
    //   "easing": "easeOutQuad",
    //   "loop": false,
    //   "to": x_offset + " " + (currentY - page_offset) + " " + z_offset,
    // });
  }
}
function prevPage () {
  var list = document.getElementsByClassName("card-element");

  for (var i=0; i<list.length; i++) {
    console.log(list[i].getAttribute("position").y);
    currentY = list[i].getAttribute("position").y;
    list[i].setAttribute("position", {"x": x_offset, "y": currentY + page_offset, "z": z_offset});
    // list[i].setAttribute("animation__move", {
    //   "property": "position",
    //   "dir": "alternate",
    //   "dur": 400,
    //   "easing": "easeOutQuad",
    //   "loop": false,
    //   "to": x_offset + " " + (currentY + page_offset) + " " + z_offset,
    // });
  }
}
