var  SourceCodeViewer = function (sourceId, holderId, opts) {
  if (!opts) { opts = {}; }

  opts.parentNode = document.getElementById(holderId);

  function copySourceCode (source, destination) {

    if (source && source.innerHTML && destination) {
      destination.value = source.innerHTML;
    }
  }

  function createTextarea (opts) {
    if (!opts) { opts = {}; }
    if (!opts.className) { className = "sourceCode"; }
    if (!opts.parentNode) { opts.parentNode = document.body; }

    var textarea = document.createElement("textarea");
    textarea.setAttribute("class", className);
    if (opts.width) {
      textarea.style.width = opts.width;
    }
    if (opts.height) {
      textarea.style.height = opts.height;
    }

    opts.parentNode.appendChild(textarea);
    return textarea;
  }

  copySourceCode(document.getElementById(sourceId), createTextarea(opts));
};
