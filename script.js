document.getElementById("right-hand").addEventListener("triggerdown", function() {
  console.log("TRIGGER DOWN");
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log("TRIGGER UP");
  triggerdown = false;
});


for (var i=0; i<40; i++) {
  var el = document.createElement("a-entity");
  el.setAttribute("card", "list_position: " + i);

  var avatar = document.createElement("a-circle");
  avatar.setAttribute("radius", 0.03);
  var id = Math.floor(Math.random()*11) + 1;
  avatar.setAttribute("src", "#avatar" + id);
  avatar.setAttribute("color", "#fff");
  avatar.setAttribute("position", {x: -0.105, y: 0, z: 0.0015});
  avatar.setAttribute("material", "side:double");

  el.appendChild(avatar);
  document.getElementById("scene").appendChild(el);
}
