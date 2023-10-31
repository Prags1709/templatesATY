let checkbox = document.querySelectorAll(".cu-checkbox");
let totalPriceElement = document.querySelector(".price-tag");

let total_amo = 0;
for (let i = 0; i < 3; i++) {
    let priceValue = document.querySelectorAll(".attryb-fbt-03-card-product-price")[i].textContent;
    var price = parseFloat(priceValue.replace('$', ''));
    total_amo += price;
    totalPriceElement.innerText = `Total Price: $${total_amo.toFixed(2)}`
}

checkbox.forEach((box) => {
    box.addEventListener("change", () => {

        if (current_checked_checkbox() == false) {
            totalPriceElement.innerText = `Total Price: $00.00`
        } else {
            let total = 0;
            checkbox.forEach((c_box, index) => {
                if (c_box.checked) {
                    let priceValue = document.querySelectorAll(".attryb-fbt-03-card-product-price")[index].textContent;
                    var price = parseFloat(priceValue.replace('$', ''));
                    total += price;
                    totalPriceElement.innerText = `Total Price: $${total.toFixed(2)}`
                }
            })
        }
    })
})

function current_checked_checkbox() {
    return Array.from(document.querySelectorAll('.cu-checkbox')).filter(el => el.checked)
}