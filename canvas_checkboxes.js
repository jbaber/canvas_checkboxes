// ==UserScript==
// @name        canvas_checkboxes
// @namespace   Violentmonkey Scripts
// @match       https://*.instructure.com/*/*/modules
// @match       https://*.instructure.com/*/*/assignments
// @grant       none
// @version     1.1
// @author      -
// @description Add checkboxes to some items in canvas to keep track of what's been read/done.
// ==/UserScript==

var actual_links = document.getElementsByClassName("item_link");
var assignments = document.getElementsByClassName("assignment");
var off_color = "#ffc4c4";
var on_color = "rgb(227, 251, 184)";

function color_on(elt) {
  elt.parentElement.parentElement.parentElement.parentElement.style.background = on_color;
}

function color_off(elt) {
  elt.parentElement.parentElement.parentElement.parentElement.style.background = off_color;
}

function toggle(elt) {
  if (toggled_on(elt)) {
    toggle_off(elt);
  }
  else {
    toggle_on(elt);
  }
}


function toggle_on(elt) {
  localStorage["ccb_" + elt.href] = "clicked";
  color_on(elt);
}

function toggled_on(elt) {
  if (localStorage["ccb_" + elt.href] === undefined) {
    return false;
  }
  return true;
}

function toggle_off(elt) {
  delete localStorage["ccb_" + elt.href];
  color_off(elt);
}


function add_checkbox_module(elt) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  elt.parentElement.parentElement.appendChild(checkbox);
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      toggle_on(this.parentElement.children[0].children[0]);
    }
    else {
      toggle_off(this.parentElement.children[0].children[0]);
    }    
  });

  if (toggled_on(elt)) {
    color_on(elt);
    checkbox.checked = true;
  }
  else {
    color_off(elt);
    checkbox.checked = false;
  }
}


function main() {
  for (var i = 0; i < actual_links.length; i++) {
    var actual_link = actual_links[i];  
    add_checkbox_module(actual_link);
  }
}

main();
