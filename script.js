/* Loader */
window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    if (loader) {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";
        setTimeout(function () {
            loader.style.display = "none";
        }, 500);
    }
});
const dashboardSection = document.querySelector(".project-dashboard-section");
let dashboardAnimated = false;
function animateProjectDashboard() {
    if (!dashboardSection) return;
    if (dashboardAnimated) return;
    const sectionTop = dashboardSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight - 120) {
        dashboardAnimated = true;
        document.querySelectorAll(".dashboard-counter").forEach(counter => {
            const target = +counter.dataset.target;
            let current = 0;
            const speed = target / 70;
            function updateCounter() {
                current += speed;
                if (current < target) {
                    counter.innerHTML = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 100 && target != 260 && target != 700) {
                        counter.innerHTML = target + "K+";
                    }
                    else if (target == 35) {
                        counter.innerHTML = "35+";
                    }
                    else if (target == 260) {
                        counter.innerHTML = "260+";
                    }
                    else if (target == 700) {
                        counter.innerHTML = "700+";
                    }
                    else {
                        counter.innerHTML = target;
                    }
                }
            }
            updateCounter();
        });
        document.querySelectorAll(".ring-progress").forEach(circle => {
            const radius = circle.r.baseVal.value;
            const circumference = 2 * Math.PI * radius;
            circle.style.strokeDasharray = circumference;
            const percent = circle.dataset.progress;
            const offset = circumference - (percent / 100) * circumference;
            setTimeout(() => {
                circle.style.strokeDashoffset = offset;
            }, 250);
        });
    }
}
window.addEventListener("scroll", animateProjectDashboard);
window.addEventListener("load", animateProjectDashboard);
const passwordInput = document.getElementById("loginPassword");
const passwordToggle = document.querySelector(".kwa-password-toggle");
if (passwordInput && passwordToggle) {
    passwordToggle.addEventListener("click", function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            passwordInput.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
}
/*==================================
FEATURED PROJECTS ANIMATION
==================================*/
const featuredSection = document.querySelector(".featured-projects-section");
let featuredPlayed = false;
function featuredAnimation() {
    if (!featuredSection || featuredPlayed) return;
    const trigger = featuredSection.getBoundingClientRect().top;
    if (trigger < window.innerHeight - 120) {
        featuredPlayed = true;
        document.querySelectorAll(".featured-project-card").forEach((card, index) => {
            setTimeout(() => {
                card.classList.add("show");
            }, index * 180);
        });
        document.querySelectorAll(".progress-bar span").forEach(bar => {
            const width = bar.style.width;
            bar.style.width = "0%";
            setTimeout(() => {
                bar.style.width = width;
            }, 400);
        });
        document.querySelectorAll(".timeline-icon").forEach((icon, index) => {
            icon.animate([
                {
                    transform: "translate(-50%,-50%) scale(.4)",
                    opacity: 0
                },
                {
                    transform: "translate(-50%,-50%) scale(1.15)",
                    opacity: 1
                },
                {
                    transform: "translate(-50%,-50%) scale(1)"
                }
            ], {
                duration: 700,
                delay: index * 220,
                fill: "forwards",
                easing: "ease-out"
            });
        });
    }
}
window.addEventListener("scroll", featuredAnimation);
window.addEventListener("load", featuredAnimation);
/*==================================
DONATION PAGE
==================================*/
document.addEventListener("DOMContentLoaded", function () {
    /* Donation Type */
    const donationTypes = document.querySelectorAll(".donation-type-item");
    donationTypes.forEach(function (item) {
        item.addEventListener("click", function () {
            donationTypes.forEach(function (box) {
                box.classList.remove("active");
            });
            this.classList.add("active");
        });
    });
    /* Amount */
    const amountItems = document.querySelectorAll(".donation-amount-item");
    const customAmount = document.querySelector(".donation-custom-input input");
    amountItems.forEach(function (item) {
        item.addEventListener("click", function () {
            amountItems.forEach(function (box) {
                box.classList.remove("active");
            });
            this.classList.add("active");
            if (customAmount) {
                customAmount.value = "";
            }
        });
    });
    /* Custom Amount */
    if (customAmount) {
        customAmount.addEventListener("input", function () {
            if (this.value.trim() !== "") {
                amountItems.forEach(function (box) {
                    box.classList.remove("active");
                });
            }
        });
    }
    /*==================================
    PAYMENT METHOD FORM SWITCH
    ==================================*/
    const paymentItems = document.querySelectorAll(".payment-item");
    const paymentForms = {
        0: document.getElementById("credit-card-box"),
        1: document.getElementById("easypaisa-box"),
        2: document.getElementById("jazzcash-box"),
        3: document.getElementById("bank-box"),
        4: document.getElementById("other-box")
    };
    paymentItems.forEach((item, index) => {
        item.addEventListener("click", function () {
            /* Active Payment Method */
            paymentItems.forEach(box => {
                box.classList.remove("active");
            });
            this.classList.add("active");
            /* Hide All Forms */
            Object.values(paymentForms).forEach(form => {
                if (form) {
                    form.classList.remove("active");
                }
            });
            /* Show Selected Form */
            if (paymentForms[index]) {
                paymentForms[index].classList.add("active");
            }
        });
    });
    /* Submit */
    const donateBtn = document.querySelector(".donation-submit-btn");
    if (donateBtn) {
        donateBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const type = document.querySelector(".donation-type-item.active");
            const amount = document.querySelector(".donation-amount-item.active");
            const payment = document.querySelector(".payment-item.active");
            if (!type) {
                alert("Please select Donation Type.");
                return;
            }
            if (!amount && customAmount && customAmount.value.trim() === "") {
                alert("Please select Donation Amount.");
                return;
            }
            if (!payment) {
                alert("Please select Payment Method.");
                return;
            }
            alert("Donation form submitted successfully.");
        });
    }
});
/*==================================
CARD NUMBER FORMAT
==================================*/
const cardNumber = document.getElementById("cardNumber");
if (cardNumber) {
    cardNumber.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 16);
        value = value.replace(/(.{4})/g, "$1 ").trim();
        e.target.value = value;
    });
}
/*==================================
EXPIRY DATE
==================================*/
const expiryDate = document.getElementById("expiryDate");
if (expiryDate) {
    expiryDate.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 4);
        if (value.length > 2) {
            value = value.substring(0, 2) + "/" + value.substring(2);
        }
        e.target.value = value;
    });
}
/*==================================
CVV
==================================*/
const cvv = document.getElementById("cvv");
if (cvv) {
    cvv.addEventListener("input", function (e) {
        e.target.value = e.target.value.replace(/\D/g, "");
    });
}
/*==================================
PHONE FORMAT
==================================*/
document.querySelectorAll("#easypaisa-box input,#jazzcash-box input").forEach(input => {
    input.addEventListener("input", function (e) {
        let value = e.target.value.replace(/\D/g, "");
        value = value.substring(0, 11);
        if (value.length > 4) {
            value = value.substring(0, 4) + " " + value.substring(4);
        }
        e.target.value = value;
    });
});
/*==================================
DONATE BUTTON VALIDATION
==================================*/
const donateButton = document.querySelector(".donation-submit-btn");
if (donateButton) {
    donateButton.addEventListener("click", function (e) {
        e.preventDefault();
        const activePayment = document.querySelector(".payment-item.active");
        if (!activePayment) {
            alert("Please select a payment method.");
            return;
        }
        if (document.getElementById("credit-card-box").classList.contains("active")) {
            if (cardNumber.value.length < 19) {
                alert("Please enter a valid card number.");
                return;
            }
            if (expiryDate.value.length < 5) {
                alert("Please enter expiry date.");
                return;
            }
            if (cvv.value.length < 3) {
                alert("Please enter CVV.");
                return;
            }
        }
        if (document.getElementById("easypaisa-box").classList.contains("active")) {
            const phone = document.querySelector("#easypaisa-box input");
            if (phone.value.length < 12) {
                alert("Please enter EasyPaisa number.");
                return;
            }
        }
        if (document.getElementById("jazzcash-box").classList.contains("active")) {
            const phone = document.querySelector("#jazzcash-box input");
            if (phone.value.length < 12) {
                alert("Please enter JazzCash number.");
                return;
            }
        }
        alert("Payment information verified successfully.");
    });
}
/*==================================
MOBILE MENU
==================================*/
const menuToggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");
const overlay = document.querySelector(".menu-overlay");
if (menuToggle) {
    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("active");
        overlay.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });
}
overlay.addEventListener("click", function () {
    menu.classList.remove("active");
    overlay.classList.remove("active");
    menuToggle.classList.remove("active");
});
document.querySelectorAll(".menu a").forEach(link => {
    link.addEventListener("click", function () {
        menu.classList.remove("active");
        overlay.classList.remove("active");
        menuToggle.classList.remove("active");
    });
});
