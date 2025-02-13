import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';
//! cdn: content delivery network: chứa mã nguồn js

//* CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
      socket.emit("CLIENT_SEND_TYPING", false); //! Xử lý lỗi gửi xong vẫn còn typing
    }
  });
}
//! END CLIENT_SEND_MESSAGE

//* SERVER_RETURN_MESSAGE" 
socket.on("SERVER_RETURN_MESSAGE", (message) => {
  const myID = document.querySelector("[my-id]").getAttribute("my-id");
  const chatInnerBody = document.querySelector(".chat .inner-body");
  const listTyping = document.querySelector(".chat .inner-list-typing");
  const msgDiv = document.createElement("div");

  if (message.userID !== myID) {
    msgDiv.classList.add("inner-incoming");
    msgDiv.innerHTML = `
      <div class="inner-name">${message.fullName}</div>
      <div class="inner-content">${message.content}</div>
    `;
  } else {
    msgDiv.classList.add("inner-outgoing");
    msgDiv.innerHTML = `
      <div class="inner-content">${message.content}</div>
    `;
  }

  chatInnerBody.insertBefore(msgDiv, listTyping); //! Xử lý lỗi typing trên message
  chatInnerBody.scrollTop = chatInnerBody.scrollHeight;
});
//! END SERVER_RETURN_MESSAGE

//* SCROLL CHAT TO BOTTOM
const chatInnerBody_ = document.querySelector(".chat .inner-body");
if (chatInnerBody_) {
  chatInnerBody_.scrollTop = chatInnerBody_.scrollHeight;
}
// ! END SCROLL CHAT TO BOTTOM

//* SHOW ICON CHAT
//? POPUP FOR TOOLTIP 
const buttonEmojiIcon = document.querySelector(".button-emoji-icon");

if (buttonEmojiIcon) {
  const tooltip = document.querySelector(".tooltip");

  Popper.createPopper(buttonEmojiIcon, tooltip);
  buttonEmojiIcon.addEventListener("click", () => {
    tooltip.classList.toggle("show");
  })
}

//? INSERT ICON TO INPUT
const emojiPicker = document.querySelector('emoji-picker');

if (emojiPicker) {
  const inputChat = document.querySelector(".chat .inner-form input");

  emojiPicker.addEventListener('emoji-click', e => {
    const icon = e.detail.unicode;
    inputChat.value += icon;

    const length = inputChat.value.length;

    inputChat.setSelectionRange(length, length);  
    inputChat.focus();
    
    showTyping(2000);
  });
}
//! END SHOW ICON CHAT

//? SHOW TYPING FUNCTION
function showTyping(time = 3000) {
  socket.emit("CLIENT_SEND_TYPING", true);
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", false);
  }, time);
}

//* TYPING DOTS
const chatInnerBody = document.querySelector(".chat .inner-body");
const inputChat = document.querySelector(".chat .inner-form input");
const myID = document.querySelector("[my-id]").getAttribute("my-id");
var timeout;

if (inputChat) {
  inputChat.addEventListener("input", () => {
    if (inputChat.value.trim() !== "") {
      showTyping();
    } else {
      socket.emit("CLIENT_SEND_TYPING", false);
    }
  })

  socket.on("SERVER_RETURN_TYPING", (data) => {
    if (myID == data.userID) return;

    console.log(data);

    if (data.isTyping == true) {
      const listTyping = document.querySelector(".chat .inner-list-typing");
      const boxTyping = document.createElement("div");
      const existTyping = listTyping.querySelector(`[data-user-id="${data.userID}"]`);
      if (existTyping) {
        return;
      }

      boxTyping.setAttribute("data-user-id", data.userID);
      boxTyping.classList.add("box-typing");
      boxTyping.innerHTML = `
        <div class="inner-name"> ${data.fullName} </div>
        <div class="inner-dots"> 
          <span> </span>
          <span></span>
          <span></span>
        </div>
      `;
      listTyping.appendChild(boxTyping);
      chatInnerBody.scrollTop = chatInnerBody.scrollHeight;

    } else if (data.isTyping == false) {
      const existTyping = document.querySelector(`.chat .inner-list-typing .box-typing[data-user-id="${data.userID}"]`);

      console.log(existTyping);
      if (existTyping) {
        existTyping.remove();
      }
    }
  })
}
//! END TYPING DOTS

