// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusAfterChange = (currentStatus === "active" ? "inactive" : "active");

            const action = `${path}/${statusAfterChange}/${id}?_method=PATCH`;
            console.log(`Form action: ${action}`); // Kiểm tra URL và phương thức gửi đi
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}
// End Change status
