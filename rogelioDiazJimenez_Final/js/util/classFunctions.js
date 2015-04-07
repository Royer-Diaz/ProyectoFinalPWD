var hasClass = function(target, theClass) {
  var pattern = new RegExp("(^| )" + theClass + "( |$)")
  return pattern.test( target.className )
}

var addClass = function(target, theClass) {
  if (!hasClass(target, theClass)){
    if (target.className === ""){
      target.className = theClass;
    } else {
      target.className += " " + theClass;
    }
  }
}

var removeClass = function(target, theClass) {
  var pattern = new RegExp("(^| )" + theClass + "( |$)");
  if (target.className) {
    target.className = target.className.replace(pattern, "");
    target.className = target.className.replace(/ $/, "");
  }
}