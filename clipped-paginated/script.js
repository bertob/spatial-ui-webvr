document.getElementById("right-hand").addEventListener("triggerdown", function() {
  // console.log("TRIGGER DOWN");
  // triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log("TRIGGER UP");
  // triggerdown = false;
  nextPage();
});
document.getElementById("right-hand").addEventListener("trackpadup", function() {
  console.log("TRACKPAD UP");
  // triggerdown = false;
  prevPage();
});
document.getElementById("right-hand").addEventListener("gripup", function() {
  console.log("GRIP UP");
  // triggerdown = false;
  resetPages();
});
// document.getElementById("left-hand").addEventListener("triggerdown", function() {
//   console.log("TRIGGER DOWN");
//   triggerdownLeft = true;
// });
// document.getElementById("left-hand").addEventListener("triggerup", function() {
//   console.log("TRIGGER UP");
//   triggerdownLeft = false;
// });

var cards_container = document.createElement("a-entity");
cards_container.setAttribute("id", "container");
cards_container.setAttribute("position", {
  "x": x_offset,
  "y": y_offset,
  "z": z_offset
});

for (var i=0; i<list_length; i++) {
  var card = document.createElement("a-entity");
  card.setAttribute("card", "list_position: " + i);
  card.setAttribute("class", "card-element");
  cards_container.appendChild(card);
}
document.getElementById("scene").appendChild(cards_container);
var container = document.getElementById("container")

// vertical offset between pages
var page_offset = 1;

function nextPage () {
  currentY = container.getAttribute("position").y;
  console.log("NEXT", currentY);

  container.setAttribute("animation__move", {
    "property": "position",
    "dir": "alternate",
    "dur": 400,
    "easing": "easeOutQuad",
    "loop": false,
    "to": x_offset + " " + (currentY - page_offset) + " " + z_offset,
  });

}
function prevPage () {
  currentY = container.getAttribute("position").y;
  console.log("PREV", currentY);

  container.setAttribute("animation__move", {
    "property": "position",
    "dir": "alternate",
    "dur": 400,
    "easing": "easeOutQuad",
    "loop": false,
    "to": x_offset + " " + (currentY + page_offset) + " " + z_offset,
  });
}
function resetPages() {
  container.setAttribute("animation__move", {
    "property": "position",
    "dir": "alternate",
    "dur": 400,
    "easing": "easeOutQuad",
    "loop": false,
    "to": x_offset + " " + y_offset + " " + z_offset,
  });
}
