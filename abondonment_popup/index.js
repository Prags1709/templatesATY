let scrollContainer = document.querySelector(".attryb-cart-002-product-data");
let dataModelElement = document.querySelector(".attryb-cart-002-data-box-1");
let leftCarouselButton = document.querySelector(".attryb-cart-002-left-btn");
let rightCarouselButton = document.querySelector(".attryb-cart-002-right-btn");
let attrybCarouselWrapper = document.querySelector("#attryb-cart-002-popup-wrap");
let attrybProductData = attrybCarouselWrapper.getAttribute("data-template-display");
attrybProductData = JSON.parse(attrybProductData)

if (attrybProductData.length <= 1) {
    document.querySelector(".attryb-cart-002-left-btn").remove();
    document.querySelector(".attryb-cart-002-right-btn").remove();
}

function convertDomToString(domObject) {
    if (domObject) {
        const serializer = new XMLSerializer();
        const htmlString = serializer.serializeToString(domObject);
        return htmlString;
    }
}

function replacePlaceholders(targetProductArray, template) {
    const regex = /\${{(.*?)}}/g;
    const replacedStrings = targetProductArray.map((item) => {
        return template.replace(regex, (match, key) => {
            if (item.hasOwnProperty(key)) {
                return item[key];
            }
            return match;
        });
    });
    return replacedStrings;
}

scrollContainer.innerHTML = replacePlaceholders(attrybProductData, convertDomToString(dataModelElement)).join("")

//pop down function
let popDownBtn = document.querySelector(".close")
popDownBtn.addEventListener("click", () => {
    document.querySelector("#attryb-cart-002-popup-wrap").remove();
});

//copy coupon code function
let copyCode = document.querySelector(".copyBotton")
copyCode.addEventListener("click", () => {
    let textToCopy = document.querySelector(".coupon-code").innerText;
    navigator.clipboard.writeText(textToCopy);
    copyCode.innerText = "Copied"
});

//carousel function
function scroller(scrollValue) {
    leftCarouselButton.addEventListener("click", () => {
        let scroll_for_left = scrollContainer.scrollLeft - scrollValue;
        scrollContainer.scrollLeft = scroll_for_left >= 0 ? scroll_for_left : 0;
    })

    rightCarouselButton.addEventListener("click", () => {
        let scroll_for_left = scrollContainer.scrollLeft + scrollValue;
        scrollContainer.scrollLeft = scroll_for_left;
    })
}

function handel_media_query_for_tablet(event) {
    const isWithinRange = event.matches;
    if (isWithinRange) {
        scroller(220)
    } else {
        scroller(260)
    }
}

let tablet_media = window.matchMedia("(max-width: 1024px)");
tablet_media.addListener(handel_media_query_for_tablet);
handel_media_query_for_tablet(tablet_media);