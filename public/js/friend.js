const refuseFriend = (button) => {
    button.addEventListener("click", () => {
        const clickedUserId = button.getAttribute("btn-refuse");
        const boxUser = button.closest(".box-user");
        
        boxUser.classList.toggle("refuse");
        socket.emit("CLIEND_REFUSE_FRIEND", clickedUserId);
    })
}

const acceptFriend = (button) => {
    button.addEventListener("click", () => {
        const clickedUserId = button.getAttribute("btn-accept");
        const boxUser = button.closest(".box-user");
    
        boxUser.classList.toggle("accepted");
        socket.emit("CLIEND_ACCEPT_FRIEND", clickedUserId);
    })
}

//* YÊU CẦU KẾT BẠN
const btnAddFriend = document.querySelectorAll("[btn-add-friend]");

if (btnAddFriend.length > 0) {
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

if (btnCancelFriend.length > 0) {
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

if (btnRefuse.length > 0) {
    btnRefuse.forEach(btn => {
        refuseFriend(btn);
    });
}
//! END TỪ CHỐI KẾT BẠN


//* ĐỒNG Ý KẾT BẠN
const btnAccept = document.querySelectorAll("[btn-accept]");

if (btnAccept.length > 0) {
    btnAccept.forEach(btn => {
        acceptFriend(btn);
    });
}
//! END ĐỒNG Ý KẾT BẠN

//* SERVER_RETURN_RESPOND_LENGTH
const badgeUserRespond = document.querySelector("[badge-user-respond]");

if (badgeUserRespond) {
    socket.on("SERVER_RETURN_RESPOND_LENGTH", (userRespond) => {
        const userId = badgeUserRespond.getAttribute("badge-user-respond");

        if (userId == userRespond.clickedUserId)
            badgeUserRespond.innerHTML = userRespond.respondLength;
    })
}

//! SERVER_RETURN_RESPOND_LENGTH

//* SERVER_RETURN_CLICKED_INFO_USER
const respondUserId = document.querySelector("[respond-user-id]");

if (respondUserId) {
    socket.on("SERVER_RETURN_CLICKED_INFO_USER", (data) => {
        const userId = badgeUserRespond.getAttribute("respond-user-id");

        if (userId == data.clickedInfoUser.clickedUserId){
            const div = document.createElement("div");
            //! In ra lời mời
            div.classList.add("col-12");
            div.innerHTML = `
                <div class="box-user" id="${data.infoUser._id}">
                    <div class="inner-avatar">
                        <img src="${data.infoUser.avatar || '/uploads/image.png'}" alt="B">
                    </div>
                    <div class="inner-info">
                        <div class="inner-name">${data.infoUser.fullName}</div>
                        <div class="inner-buttons"> 
                            <button class="btn btn-sm btn-primary mr-1" btn-accept="${data.infoUser._id}">Đồng ý</button>
                            <button class="btn btn-sm btn-danger mr-1" btn-refuse="${data.infoUser._id}">Từ chối</button>
                            <button class="btn btn-sm btn-danger mr-1" btn-deleted="btn-deleted" disable="disable">Đã xóa</button>
                            <button class="btn btn-sm btn-success mr-1" btn-accepted="btn-accepted" disable="disable">Đã đồng ý</button>
                        </div>
                    </div>
                </div>
            `;

            respondUserId.appendChild(div);

            //! Bắt sự kiện cho nút hủy và đồng ý
            const btnAccept = div.querySelector("[btn-accept]");
            acceptFriend(btnAccept);

            const btnRefuse = div.querySelector("[btn-refuse]");
            refuseFriend(btnRefuse);


            //! 1.5. Khi A gửi kết bạn cho B, danh sách người dùng của B xóa đi A

        }
    })
}
//! SERVER_RETURN_CLICKED_INFO_USER

//* SERVER_RETURN_CANCEL_FRIEND
const respond = document.querySelector("[respond-user-id]");

if (respond){
    socket.on("SERVER_RETURN_CANCEL_FRIEND", (data) => {
        const userId = respond.getAttribute("respond-user-id");

        if (userId === data.clickedInfoUser._id){
            const canceledUser = document.getElementById(data.userId);

            if (canceledUser){
                canceledUser.remove();
            }
        }
    })
}
//! SERVER_RETURN_CANCEL_FRIEND

//* SERVER_RETURN_USER_ID
const notFriend = document.querySelector("[not-friend-user-id]");

if (notFriend){
    socket.on("SERVER_RETURN_USER_ID", (data) => {
        const userId = notFriend.getAttribute("not-friend-user-id");

        if (userId === data.clickedInfoUser._id){
            const canceledUser = document.getElementById(data.userId);

            if (canceledUser){
                canceledUser.remove();
            }
        }
    })
}
//! SERVER_RETURN_USER_ID