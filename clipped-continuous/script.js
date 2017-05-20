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
