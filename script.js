window.onload = function setTemplate() {
  document.getElementById("allComments").innerHTML = localStorage.getItem(
    "template"
  );
};

const commentContainer = document.getElementById("allComments");

document.getElementById("addComments").addEventListener("click", function (ev) {
  addComment(ev);
});

function addComment(ev) {
  let commentText, wrapDiv;
  const textBox = document.createElement("div");
  const replyButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const likeButton = document.createElement("button");

  replyButton.className = "reply";
  replyButton.innerHTML = "Reply";

  textBox.className = "text-content";

  likeButton.className = "likeComment";
  likeButton.innerHTML = "Like";

  deleteButton.className = "deleteComment";
  deleteButton.innerHTML = "Delete";

  if (hasClass(ev.target.parentElement, "container")) {
    const wrapDiv = document.createElement("div");
    wrapDiv.className = "wrapper";
    wrapDiv.style.marginLeft = 0;
    commentText = document.getElementById("comment").value;
    document.getElementById("comment").value = "";
    textBox.innerHTML = commentText;
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
    commentContainer.appendChild(wrapDiv);
  } else {
    wrapDiv = ev.target.parentElement;
    commentText = ev.target.parentElement.firstElementChild.value;
    textBox.innerHTML = commentText;
    wrapDiv.innerHTML = "";
    wrapDiv.append(textBox, replyButton, likeButton, deleteButton);
  }

  setOnLocalStorage();
}

function setOnLocalStorage() {
  localStorage.setItem(
    "template",
    document.getElementById("allComments").innerHTML
  );
}

function hasClass(elem, className) {
  return elem.className.split(" ").indexOf(className) > -1;
}

document.getElementById("allComments").addEventListener("click", function (e) {
  if (hasClass(e.target, "reply")) {
    const parentDiv = e.target.parentElement;
    const wrapDiv = document.createElement("div");
    wrapDiv.style.marginLeft =
      (Number.parseInt(parentDiv.style.marginLeft, 100) + 15).toString() + "px";
    wrapDiv.className = "wrapper-child";
    wrapDiv.id = "replyid";

    const inputs = document.createElement("textarea");
    inputs.style.marginRight = "20px";

    const addButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    addButton.className = "addReply";
    addButton.innerHTML = "Add";

    /*likeButton.className = 'likeComment';
		likeButton.innerHTML = 'Like';*/

    cancelButton.className = "cancelReply";
    cancelButton.innerHTML = "Cancel";

    wrapDiv.append(inputs, addButton, cancelButton);
    parentDiv.appendChild(wrapDiv);
  } else if (hasClass(e.target, "addReply")) {
    addComment(e);
  } else if (hasClass(e.target, "likeComment")) {
    const likeBtnValue = e.target.innerHTML;
    e.target.innerHTML =
      likeBtnValue !== "Like" ? Number.parseInt(likeBtnValue) + 1 : 1;
    setOnLocalStorage();
  } else if (hasClass(e.target, "cancelReply")) {
    e.target.parentElement.innerHTML = "";
    setOnLocalStorage();
  } else if (hasClass(e.target, "deleteComment")) {
    e.target.parentElement.remove();
    setOnLocalStorage();
  }
});
