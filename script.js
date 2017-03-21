document.getElementById("right-hand").addEventListener("triggerdown", function() {
  console.log('TRIGGER DOWN');
  triggerdown = true;
});
document.getElementById("right-hand").addEventListener("triggerup", function() {
  console.log('TRIGGER UP');
  triggerdown = false;
});
