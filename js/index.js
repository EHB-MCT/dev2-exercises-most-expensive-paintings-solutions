import {
    paintings
} from './data.js';

let selectedPaintings = paintings;
const userInput = {
    selectedSort: 'price',
    selectedArtist: 'all'
}

function applyAll() {
    selectedPaintings = paintings;
    filterPaintings();
    sortPaintings();
    calculateTotalPrice();
    renderPaintings();
}

function filterPaintings() {
    selectedPaintings = selectedPaintings.filter((item) => {
        if (userInput.selectedArtist == "all") {
            return true;
        }
        return item.artist == userInput.selectedArtist;
    });
}

function sortPaintings() {
    selectedPaintings.sort((a, b) => {
        return a[userInput.selectedSort] - b[userInput.selectedSort];
    });
}

function initEvents() {
    const sortRadios = document.getElementsByName('sortBy');
    sortRadios.forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            userInput.selectedSort = this.value;
            applyAll();
        });
    });
    const filterRadios = document.getElementsByName('artist');
    filterRadios.forEach(function (radio) {
        radio.addEventListener('change', function (event) {
            userInput.selectedArtist = this.value;
            applyAll();
        });
    });
}

function renderPaintings() {
    const section = document.getElementById('content_section');
    section.innerHTML = "";
    selectedPaintings.forEach(function (item) {
        const html = `<article>
          <img src="${item.imageURL}" alt="" />
          <div class="article_content_wrapper">
            <div>
              <h3>${item.title}</h3>
              <h4>${item.artist}</h4>
            </div>
            <div>
              <div class="price">$ ${item.price}M</div>
              <div class="date">${item.auctionDate}</div> 
            </div>
          </div>
        </article>`;
        section.insertAdjacentHTML('beforeend', html);
    });
}

function calculateTotalPrice() {
    // map
    const mappedPaintings = selectedPaintings.map((item) => {
        return item.price;
    });

    const totalPrice = mappedPaintings.reduce((acc, cur) => {
        return acc + cur;
    });

    const roundedPrice = Math.round(totalPrice * 100) / 100;

    const box = document.getElementById('total');
    box.innerText = roundedPrice;
    // reduce
}

initEvents();
applyAll();