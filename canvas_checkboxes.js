// ==UserScript==
// @name        canvas_checkboxes
// @namespace   Violentmonkey Scripts
// @match       https://hcpss.instructure.com/*/*/modules
// @grant       none
// @version     1.0
// @author      -
// @description
// ==/UserScript==

var actual_links = document.getElementsByClassName("item_link");
var off_color = "#ffc4c4";
var on_color = "rgb(227, 251, 184)";

function color_on(actual_link) {
  actual_link.parentElement.parentElement.parentElement.parentElement.style.background = on_color;
}

function color_off(actual_link) {
  actual_link.parentElement.parentElement.parentElement.parentElement.style.background = off_color;
}

function toggle(actual_link) {
  if (toggled_on(actual_link)) {
    toggle_off(actual_link);
  }
  else {
    toggle_on(actual_link);
  }
}


function toggle_on(actual_link) {
  localStorage.ccb[actual_link.href] = "clicked";
  color_on(actual_link);
}

function toggled_on(actual_link) {
  if (localStorage.ccb[actual_link.href] === undefined) {
    return false;
  }
  return true;
}

function toggle_off(actual_link) {
  delete localStorage.ccb[actual_link.href];
  color_off(actual_link);
}


function main() {
  if (localStorage.ccb === undefined) {
    localStorage.ccb = {};
  }
  
  for (var i = 0; i < actual_links.length; i++) {
    var actual_link = actual_links[i];  

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    actual_link.parentElement.parentElement.appendChild(checkbox);
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        toggle_on(this.parentElement.children[0].children[0]);
      }
      else {
        toggle_off(this.parentElement.children[0].children[0]);
      }    
    });
  
    if (toggled_on(actual_link)) {
      color_on(actual_link);
      checkbox.checked = true;
    }
    else {
      color_off(actual_link);
      checkbox.checked = false;
    }
  }
}

main();
