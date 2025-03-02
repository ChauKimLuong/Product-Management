//* YÊU CẦU KẾT BẠN
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");

if (btnAddFriend.length > 0){
    btnAddFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedUserId = btn.getAttribute("btn-add-friend");

            const boxUser = btn.closest(".box-user");
            boxUser.classList.toggle("add");


            socket.emit("CLIEND_ADD_FRIEND", clickedUserId);
        })
    });
}
//! END YÊU CẦU KẾT BẠN


//* HỦY YÊU CẦU KẾT BẠN
const btnCancelFriend = document.querySelectorAll("[btn-cancel-friend]");

if (btnCancelFriend.length > 0){
    btnCancelFriend.forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedUserId = btn.getAttribute("btn-cancel-friend");

            const boxUser = btn.closest(".box-user");
            boxUser.classList.toggle("add");


            socket.emit("CLIEND_CANCEL_FRIEND", clickedUserId);
        })
    });
}
//! END HỦY YÊU CẦU KẾT BẠN


//* TỪ CHỐI KẾT BẠN
const btnRefuse = document.querySelectorAll("[btn-refuse]");

if (btnRefuse.length > 0){
    btnRefuse.forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedUserId = btn.getAttribute("btn-refuse");

            const boxUser = btn.closest(".box-user");
            boxUser.classList.toggle("refuse");


            socket.emit("CLIEND_REFUSE_FRIEND", clickedUserId);
        })
    });
}
//! END TỪ CHỐI KẾT BẠN


//* ĐỒNG Ý KẾT BẠN
const btnAccept = document.querySelectorAll("[btn-accept]");

if (btnAccept.length > 0){
    btnAccept.forEach(btn => {
        btn.addEventListener("click", () => {
            const clickedUserId = btn.getAttribute("btn-accept");

            const boxUser = btn.closest(".box-user");
            boxUser.classList.toggle("accepted");


            socket.emit("CLIEND_ACCEPT_FRIEND", clickedUserId);
        })
    });
}
//! END ĐỒNG Ý KẾT BẠN

//* SERVER_RETURN_RESPOND_LENGTH
const badgeUserRespond = document.querySelector("[badge-user-respond]");

if (badgeUserRespond){
    socket.on("SERVER_RETURN_RESPOND_LENGTH", (userRespond) => {
        const userId = badgeUserRespond.getAttribute("badge-user-respond");
        
        if (userId == userRespond.clickedUserId)
            badgeUserRespond.innerHTML = userRespond.respondLength;
    })
}

//! SERVER_RETURN_RESPOND_LENGTH