// Button Status
const buttonsStatus = document.querySelectorAll("[button-status]");

if (buttonsStatus.length > 0) {
    let url = new URL(window.location.href);
    // console.log(url)

    buttonsStatus.forEach((button) => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status);
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
            // window.history.replaceState({}, "", url.href) // Thay đổi href mà không cần load lại trang
        });
    });
}
// End Button Status

// Form Search
const formSearch = document.querySelector("#form-search");

if (formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        // const formData = new FormData(formSearch);
        // const keyword = formData.get('keyword');

        const keyword = event.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword);
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
}
// End Form Search


// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");

if (buttonsPagination) {
    let url = new URL(window.location.href)
    
    buttonsPagination.forEach((button) => {
        button.addEventListener("click", () => {
            const page = button.getAttribute("button-pagination")

            url.searchParams.set("page", page)
            window.location.href = url.href
        })
    })
}
// End Pagination


// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]")
if (checkboxMulti){
    const checkAll = checkboxMulti.querySelector("[name='checkall']")
    const ids = checkboxMulti.querySelectorAll("[name='id']")

    checkAll.addEventListener("click", () => {
        if (checkAll.checked) {
            ids.forEach(id => {
                id.checked = true
            })
        } else {
            ids.forEach(id => {
                id.checked = false
            })
        }
    })
    const countIds = ids.length
    ids.forEach(id => {
        id.addEventListener("click", () => {
            const countIdsChecked = checkboxMulti.querySelectorAll("[name='id']:checked").length

            if (countIds === countIdsChecked) {
                checkAll.checked = true
            } else {
                checkAll.checked = false
            }
        })
    })
}
// End Checkbox Multi


// Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]")
var value = ""
if (formChangeMulti) {
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault()

        const typeChange = event.target.elements.type.value
        if (typeChange == "delete"){
            const isConfirm = confirm("Xóa ?")

            if (!isConfirm){
                return;
            }
        }

        const checkboxMulti = document.querySelector("[checkbox-multi]")
        const idsChecked = checkboxMulti.querySelectorAll("[name='id']:checked")
        const inputIds = formChangeMulti.querySelector("[name='ids']")

        if (idsChecked.length) {
            idsChecked.forEach(id => {
                value += `${id.value}, `
            })
            value = value.slice(0, -2);
            inputIds.value = value

            formChangeMulti.submit()
        } else {
            alert("Vui lòng chọn ít nhất 1 bản ghi!")
        }
    })
}
// idsChecked.forEach(id => {
//     value += `${id.value} ,`
// })
// formChangeMulti.value = value
// End Form Change Multi