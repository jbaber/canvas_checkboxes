// ==UserScript==
// @name        canvas_checkboxes
// @namespace   Violentmonkey Scripts
// @match       https://*.instructure.com/*/*/modules
// @match       https://*.instructure.com/*/*/assignments
// @grant       none
// @version     1.2.1
// @author      -
// @description Add checkboxes to some items in canvas to keep track of what's been read/done.
// ==/UserScript==

var off_color = "#ffc4c4";
var on_color = "rgb(227, 251, 184)";

/* For assignments, depth is 3, for modules, depth is 4 */
function encolor(elt, color, depth) {
  if (depth === undefined) {
    var pieces = window.location.pathname.split("/");
    var final_slug = pieces[pieces.length - 1];
    if (final_slug == "assignments") {
      depth = 3;
    }
    else if (final_slug == "modules") {
      depth = 4;
    }
    else {
      depth = 0;
    }
  }
  var to_be_styled = elt;
  for (var i = 0; i < depth; i++) {
    to_be_styled = to_be_styled.parentElement;
  }
  to_be_styled.style.background = color;
}

function color_on(elt, depth) {
  encolor(elt, on_color, depth);
}

function color_off(elt, depth) {
  encolor(elt, off_color, depth);
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


function add_checkbox_assignment(elt) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  elt.children[0].children[0].children[1].insertBefore(checkbox, temp1.children[0].children[0].children[1].children[0].nextElementSibling)
  console.log(checkbox);
  console.log(elt);
}


function add_checkbox(elt) {
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  elt.parentElement.insertBefore(checkbox, elt.nextElementSibling);
  checkbox.addEventListener('change', function() {
    if (this.checked) {
      toggle_on(this.previousElementSibling);
    }
    else {
      toggle_off(this.previousElementSibling);
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
  var actual_links = document.getElementsByClassName("ig-title");
  for (var i = 0; i < actual_links.length; i++) {
    var actual_link = actual_links[i];  
    add_checkbox(actual_link);
  }
}

main();
