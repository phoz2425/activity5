let slideIndex = 0;

async function loadXML() {
    const response = await fetch('carousel.xml');
    const text = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(text, "text/xml");

    const slides = xml.getElementsByTagName("slide");
    let output = "";
    for (let i = 0; i < slides.length; i++) {
        let imgSrc = slides[i].getElementsByTagName("image")[0].getAttribute("src");
        let caption = slides[i].getElementsByTagName("caption")[0].textContent;
        output += `<div class="mySlides"><img src="${imgSrc}" alt=""><div>${caption}</div></div>`;
    }
    document.getElementById("carousel").innerHTML = output;
    showSlides(slideIndex);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let slide of slides) { slide.style.display = "none"; }
    slides[slideIndex].style.display = "block";
}

function changeSlide(n) {
    slideIndex += n;
    showSlides(slideIndex);
}

function currentSlide(n) {
    slideIndex = n - 1;
    showSlides(slideIndex);
}

setInterval(() => { changeSlide(1); }, 3000); // Auto-slide every 3 seconds

loadXML();
