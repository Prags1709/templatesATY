async function myFBTFunction() {
  const attrybFBTsectionWrapper = document.querySelector( "#attryb-fbt-section-wrapper" );
  const attrybFBTsection = document.querySelector(".attryb-fbt-section");
  const attrybFBTCardContainer = document.querySelector( ".product-content-container" );
  const attrybFBTCard = document.querySelector(".fbt-product-card");
  const attrybFBTCardDivider = document.querySelector(".fbt-card-divider");
  let attrybFBTDataDisplay = attrybFBTsectionWrapper.getAttribute(window.attryb.data_template_display );
  let targetProductArray = JSON.parse(attrybFBTDataDisplay);
  function redirectToCart() {
    const { protocol, hostname, port } = window.location;
    const baseURL = `${protocol}//${hostname}${port ? `:${port}` : ''}`;
    const cartURL = `${baseURL}/cart`;
    window.location.href = cartURL;
}
  if (attrybFBTDataDisplay.length == 0) {
    attrybFBTsectionWrapper.remove();
  }

  const result = window.attryb.replacePlaceholders(targetProductArray,window.attryb.convertDomToString(attrybFBTCard)).join(`${window.attryb.convertDomToString(attrybFBTCardDivider)}`);
  attrybFBTCardContainer.innerHTML = result;

  const attrybAddProductToCart = async (productId, quantity) => {
    let formData = new FormData();
    formData.append("quantity", quantity);
    formData.append("id", productId);
    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded", // Set the content type
        },
        body: new URLSearchParams(formData).toString(),
      });
    } catch (error) {
      console.error("Error Occured: ", error);
    }
  };

  const checkboxes = document.querySelectorAll(".fbt-checkbox");
  const calculateFBTTotal = () => {
    let totalFBTValueArray = [];
    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        totalFBTValueArray.push(targetProductArray[index].final_price);
      }
    });
    let totalFBTValue = totalFBTValueArray.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue),
      0
    );
    document.querySelector(".total-price-main").innerText = "$" + (totalFBTValue ? totalFBTValue.toFixed(2) : '{product.total-price}');
  };
  calculateFBTTotal();
  attrybFBTCardContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("fbt-checkbox")) {
      calculateFBTTotal();
    }
  });

  const attrybAddToCartBtn = document.querySelector(".fbt-add-to-cart-btn");
  attrybAddToCartBtn.addEventListener("click", async () => {
    const selectedProductArray = [];

    checkboxes.forEach((checkbox, index) => {
      if (checkbox.checked) {
        selectedProductArray.push(targetProductArray[index].id);
      }
    });
    for (const selectedItem of selectedProductArray) {
      await attrybAddProductToCart(selectedItem, 1);
    }
    redirectToCart();
    attrybAddToCartBtn.innerHTML = `
    Added to cart <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
    <path d="M17.1667 5L8.00004 14.1667L3.83337 10" stroke="#F3F4F6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `;
  });
}
myFBTFunction()
// -----------------------------------
