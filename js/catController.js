class Cat {
    constructor(id, name, origin, temperament, colors, description, image) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.temperament = temperament;
        this.colors = colors;
        this.description = description;
        this.image = image;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchDataAndDisplayCats(); 

   
    document.getElementById('searchInput').addEventListener('input', searchCats);
});

async function fetchDataAndDisplayCats() {
    try {
        const response = await fetch('/cats');
        const data = await response.json(); 

        const catContainer = document.getElementById('pet-container'); 
        catContainer.innerHTML = ''; 


        data.forEach(catData => {
            const cat = new Cat(
                catData.id,
                catData.name,
                catData.origin,
                catData.temperament,
                catData.colors,
                catData.description,
                catData.image
            );
            const card = createCatCard(cat);
            catContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching cat data:', error);
    }
}

function createCatCard(cat) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = cat.image;
    image.alt = cat.name;
    image.addEventListener('click', () => showCatDetails(cat));

    const name = document.createElement('h2');
    name.textContent = cat.name;

    const origin = document.createElement('p');
    origin.textContent = `Origin: ${cat.origin}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(origin);

    return card;
}

function showCatDetails(cat) {
    alert(`Name: ${cat.name}\nOrigin: ${cat.origin}\nTemperament: ${cat.temperament}\nColors: ${cat.colors}\nDescription: ${cat.description}`);
}

function searchCats() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const catCards = document.querySelectorAll('#pet-container .card');
  
    catCards.forEach(card => {
        const catName = card.querySelector('h2').textContent.toLowerCase();
        if (catName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}
