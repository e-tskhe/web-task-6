function updatePrice() {


    let n = document.getElementById("quantity").value;
    let pattern = n.match(/^(0|([1-9]\d*))$/);
    if (pattern === null) {
        alert("Неверный формат ввода! Введите натуральное число");
    }
    else {
        let good = document.getElementById("goods");
        let price = 0;
        let prices = getPrices();
        
        price += prices.goodsPrices[good.selectedIndex];
        price *= parseInt(n);

        let colorDiv = document.getElementById("color");
        colorDiv.style.display = ((good.selectedIndex == "0" || good.selectedIndex == "2") ? "none" : "block");

        let colorOpt = document.getElementById("colorSelect");
        let colorIndex = colorOpt.options[colorOpt.selectedIndex].value;
        price += prices.colorSelect[colorIndex];

        let dopsDiv = document.getElementById("dops");
        dopsDiv.style.display = ((good.selectedIndex == "0" || good.selectedIndex == "1") ? "none" : "block");

        let dops = document.querySelectorAll("#dops input");
        dops.forEach(function(checkbox) {
            if (checkbox.checked) {
                let dopsPrice = prices.dops[checkbox.name];
                if (dopsPrice !== undefined) {
                    price += dopsPrice;
                }
            }
        });

        let radios = document.querySelectorAll("#deliveryType input");
        radios.forEach(function(radio) {
            if (radio.checked) {
                let delPrice = prices.delivery[radio.value];
                if (delPrice !== undefined) {
                    price += delPrice;
                }
            }
        })

        document.getElementById("result").innerHTML = price + " рублей";
    }
}

function getPrices() {
    return {
        goodsPrices: [13000, 27000, 5000, 20000, 12000, 3500, 33000, 7000],
        colorSelect: {
            black: 100,
            white: 50,
            violet: 500,
            green: 300,
        },
        dops: {
            earPads: 500,
            warranty: 1000,
            charger: 1000,
            case: 400,
        },
        delivery: {
            pickup: 0,
            courier: 300,
            mail: 150,
            sdek: 200,
        }
    };
}

window.addEventListener('DOMContentLoaded', function(event) {
    let good = document.getElementById("goods");
    let n = this.document.getElementById("quantity");

    let colorDiv = document.getElementById("color");
    colorDiv.style.display = ((good.selectedIndex == "0" || good.selectedIndex == "2") ? "none" : "block");

    let dopsDiv = document.getElementById("dops");
    dopsDiv.style.display = ((good.selectedIndex == "0" || good.selectedIndex == "1") ? "none" : "block");
    
    

    n.addEventListener("change", function(event) {
        updatePrice();
    })

    good.addEventListener("change", function(event) {
        updatePrice();
    });

    colorSelect.addEventListener("change", function(event) {
        updatePrice();
    });

    let dops = document.querySelectorAll("#dops input");
    dops.forEach(function(checkbox) {
        checkbox.addEventListener("change", function(event) {
            updatePrice();
        });
    });

    let radios = this.document.querySelectorAll("#deliveryType input");
    radios.forEach(function(radio) {
        radio.addEventListener("change", function(event) {
            updatePrice();
        });
    });

    updatePrice();
});