// Change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    buttonChangeStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const currentStatus = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            let statusAfterChange =
                currentStatus === "active" ? "inactive" : "active";

            const action = `${path}/${statusAfterChange}/${id}?_method=PATCH`;
            console.log(`Form action: ${action}`); // Kiểm tra URL và phương thức gửi đi
            formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}
// End Change status

// Delete Item
const buttonsDelete = document.querySelectorAll("[button-delete]");

if (buttonsDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-delete-item");
    let path = formDeleteItem.getAttribute("data-path");

    buttonsDelete.forEach((button) => {
        button.addEventListener("click", () => {
            isConfirm = confirm("Xóa ?");
            if (isConfirm) {
                const id = button.getAttribute("data-id");
                const action = `${path}/${id}?_method=DELETE`;

                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
        });
    });
}
// End Delete Item

// Preview Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");

    uploadImageInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        uploadImagePreview.src = URL.createObjectURL(file);
    });

    const buttonDeleteImage = document.querySelector("[button-delete-image]");
    if (buttonDeleteImage) {
        buttonDeleteImage.addEventListener("click", () => {
            uploadImageInput.value = "";
            uploadImagePreview.src = "";
        });
    }
}
// End Preview Image
