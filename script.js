document.getElementById("right-hand").addEventListener("triggerdown", function() {
  console.log("TRIGGER DOWN");
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log("TRIGGER UP");
  triggerdown = false;
});


for (var i=0; i<40; i++) {
  var card = document.createElement("a-entity");
  card.setAttribute("card", "list_position: " + i);

  var avatar = document.createElement("a-circle");
  avatar.setAttribute("radius", 0.03);
  var id = Math.floor(Math.random()*11) + 1;
  avatar.setAttribute("src", "#avatar" + id);
  avatar.setAttribute("color", "#fff");
  avatar.setAttribute("position", {x: -0.105, y: 0, z: 0.0015});
  avatar.setAttribute("material", "side:double");

  card.appendChild(avatar);

  if ( i%8 === 0 ) {
    var h = Math.floor(i/2) + 1;
    // var min = Math.floor(Math.random()*60);
    // var str = h + "h " + min + "min ago";
    var str = h + "h ago";

    var timestamp = document.createElement("a-entity");
    timestamp.setAttribute("position", {x: 0.2, y: -0.04, z: 0.0015});
    timestamp.setAttribute("text-geometry", "value: " + str + "; size: 0.02; height: 0.001;");
    timestamp.setAttribute("material", "color: #333");

    card.appendChild(timestamp);
  }

  document.getElementById("scene").appendChild(card);
}
