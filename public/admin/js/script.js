// Button Status
    const buttonsStatus = document.querySelectorAll("[button-status]")

    if (buttonsStatus.length > 0) {
        let url = new URL(window.location.href)
        // console.log(url)

        buttonsStatus.forEach(button => {
            button.addEventListener("click", () => {
                const status = button.getAttribute("button-status")

                if (status) {
                    url.searchParams.set("status", status)
                } else {
                    url.searchParams.delete("status")
                }

                window.location.href = url.href
                // window.history.replaceState({}, "", url.href) // Thay đổi href mà không cần load lại trang
            })
        });
    }
// End Button Status


// Form Search
    const formSearch = document.querySelector("#form-search")

    if (formSearch){
        let url = new URL(window.location.href)
        formSearch.addEventListener("submit", (event) => {
            event.preventDefault()
            // const formData = new FormData(formSearch);
            // const keyword = formData.get('keyword');
            
            const keyword = event.target.elements.keyword.value
            if (keyword){
                url.searchParams.set("keyword", keyword)
            } else {
                url.searchParams.delete("keyword")
            }
            // window.location.href = url.href
        })
    }

// End Form Search