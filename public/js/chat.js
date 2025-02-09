// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
    formSendData.addEventListener("submit", e => {
        e.preventDefault();
        const content = e.target.elements.content.value;

        if (content) {
            socket.emit("CLIENT_SEND_MESSAGE", content);
            e.target.elements.content.value = "";
        }
    })
}
//! END CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE"
socket.on("SERVER_RETURN_MESSAGE", (message) => {
    const myID = document.querySelector("[my-id]").getAttribute("my-id");
    const chatInnerBody = document.querySelector(".chat .inner-body");
    const msgDiv = document.createElement("div");

    if (message.userID !== myID){
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

    chatInnerBody.appendChild(msgDiv);
    chatInnerBody.scrollTop = chatInnerBody.scrollHeight;
});
//! END SERVER_RETURN_MESSAGE
