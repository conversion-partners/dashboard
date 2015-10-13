//window.onload = addListeners();

function addListeners() {
  document.getElementById('myModal').addEventListener('mousedown', mouseDown, false);
  window.addEventListener('mouseup', mouseUp, false);

}

function mouseUp() {
  window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
  window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
  var div = document.getElementById('myModal');
  div.style.position = 'absolute';
  div.style.top = e.clientY + 'px';
  div.style.left = e.clientX + 'px';
}

var selected = null, // Object of the element to be moved
  x_pos = 0,
  y_pos = 0, // Stores x & y coordinates of the mouse pointer
  x_elem = 0,
  y_elem = 0; // Stores top, left values (edge) of the element

// Will be called when user starts dragging an element
function _drag_init(elem) {
  // Store the object of the element which needs to be moved
  selected = elem;
  x_elem = x_pos - selected.offsetLeft;
  y_elem = y_pos - selected.offsetTop;
}

// Will be called when user dragging an element
function _move_elem(e) {
  x_pos = document.all ? window.event.clientX : e.pageX;
  y_pos = document.all ? window.event.clientY : e.pageY;
  if (selected !== null) {
    selected.style.left = (x_pos - x_elem) + 'px';
    selected.style.top = (y_pos - y_elem) + 'px';
  }
}

// Destroy the object when we are done
function _destroy() {
  selected = null;
}

// Bind the functions...
document.getElementById('modal-form').onmousedown = function() {
  _drag_init(this);
  return false;
};

document.onmousemove = _move_elem;
document.onmouseup = _destroy;
