// START Cập nhật số lượng sản phẩm
const inputsQuantity = document.querySelectorAll("input[name='quantity']")

if (inputsQuantity.length > 0){
    inputsQuantity.forEach((input) => {
        input.addEventListener("change", (event) => {
            const newQuantity = event.target.value; // * const newQuantity = input.value
            const productId = input.getAttribute("item-id");

            window.location.href = `/cart/update/${productId}/${newQuantity}`;
        })
    })
}
// END Cập nhật số lượng sản phẩm