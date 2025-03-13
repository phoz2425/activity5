let slideIndex = 0;

async function loadXML() {
    try {
        const response = await fetch('carousel.xml');
        const text = await response.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(text, "text/xml");

        const slides = xml.getElementsByTagName("slide");
        let output = "";
        let dots = "";
        for (let i = 0; i < slides.length; i++) {
            let imgSrc = slides[i].getElementsByTagName("image")[0].getAttribute("src");
            let caption = slides[i].getElementsByTagName("caption")[0].textContent;
            output += `<div class="mySlides"><img src="${imgSrc}" alt=""><div>${caption}</div></div>`;
            dots += `<span class="dot" onclick="currentSlide(${i + 1})"></span>`;
        }
        document.getElementById("carousel").innerHTML = output;
        document.getElementById("dots").innerHTML = dots;
        showSlides(slideIndex);
    } catch (error) {
        console.error("Error loading XML:", error);
    }
}

function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }
    for (let slide of slides) { slide.style.display = "none"; }
    for (let dot of dots) { dot.className = dot.className.replace(" active", ""); }
    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
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
