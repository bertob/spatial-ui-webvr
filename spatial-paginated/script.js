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


// GRID OF PAGES
var grid = {};
grid.x = -0.5;
grid.y = 1.8;
grid.z = -0.6;

var c = {};
c.width = 0.06;
c.height = c.width * 3/4;
c.depth = 0.003;
c.x_gap = 0.05;
c.y_gap = 0.005;

var no_of_cards = 80;
var cards_per_page = 4;
var pages_per_row = 4;

var grid_container = document.createElement("a-entity");
// overview_container.setAttribute("rotation", {y: 40});

var current_row = 0;
var current_page = 0;
var current_card = 0;
var page = document.createElement("a-entity");
page.setAttribute("position", {
  x: grid.x,
  y: grid.y,
  z: grid.z
});
addAnimation(page);

// every card
for (var i=0; i<no_of_cards; i++) {

  // new page
  if ((i > 0) && (i % cards_per_page) === 0) {
    document.getElementById("scene").appendChild(page);

    current_page = (current_page + 1) % pages_per_row;
    if (current_page % pages_per_row === 0) current_row++;
    current_card = 0;

    page = document.createElement("a-entity");
    page.setAttribute("position", {
      x: grid.x + current_page * (c.width + c.x_gap),
      y: grid.y - current_row * (c.height + c.y_gap + 0.02) * cards_per_page,
      z: grid.z
    });
    page.setAttribute("data-x", grid.x + current_page * (c.width + c.x_gap));
    page.setAttribute("data-y", grid.y - current_row * (c.height + c.y_gap + 0.02) * cards_per_page);
    page.setAttribute("data-z", grid.z);
    addAnimation(page);

  }

  var id = Math.floor(Math.random()*6) + 1;
  var card = document.createElement("a-entity");
  card.setAttribute("geometry", "primitive: box; width:" + c.width +
  "; height:" + c.height + "; depth: " + c.depth + ";");
  card.setAttribute("material", "color: white; src: #img" + id);
  card.setAttribute("position", {
    x: 0,
    y: (c.height + c.y_gap) * current_card,
    z: 0
  });

  page.appendChild(card);

  current_card++;

}

function addAnimation(page) {

  page.setAttribute("data-open", "false");
  // console.log("OPENNESS", page.dataset.open);

  page.addEventListener("mouseenter", function(e) {
    this.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 200,
      "easing": "easeOutQuad",
      "loop": true,
      "to": "1.1 1.1 1",
    });
  });

  page.addEventListener("mouseleave", function(e) {
    this.setAttribute("animation__hover", {
      "property": "scale",
      "dir": "alternate",
      "dur": 200,
      "easing": "easeOutQuad",
      "loop": true,
      "to": "1 1 1",
    });
  });


  page.addEventListener("click", function(e) {
    console.log("PAGE CLICKED");
    if (this.dataset.open === "true") {
      // close the open page
      console.log("OPEN, CLOSING");
      this.setAttribute("animation__scale", {
        "property": "scale",
        "dir": "alternate",
        "dur": 400,
        "easing": "easeOutQuad",
        "loop": true,
        "to": "1 1 1",
      });
      this.setAttribute("animation__move", {
        "property": "position",
        "dir": "alternate",
        "dur": 400,
        "easing": "easeOutQuad",
        "loop": true,
        "to": this.dataset.x + " " + this.dataset.y + " " + this.dataset.z,
      });
      page.setAttribute("data-open", "false");
    }
    else {
      // open the closed page
      console.log("NOT OPEN, OPENING");
      this.setAttribute("animation__scale", {
        "property": "scale",
        "dir": "alternate",
        "dur": 400,
        "easing": "easeOutQuad",
        "loop": true,
        "to": "7 7 1",
      });
      this.setAttribute("animation__move", {
        "property": "position",
        "dir": "alternate",
        "dur": 400,
        "easing": "easeOutQuad",
        "loop": true,
        "to": "0.2 0.8 " + grid.z,
      });
      page.setAttribute("data-open", "true");
    }
  })

}
