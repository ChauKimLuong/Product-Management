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
