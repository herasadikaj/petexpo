class Dog {
    constructor(id, name, breed_group, size, lifespan, origin, temperament, colors, description, image) {
        this.id = id;
        this.name = name;
        this.origin = origin;
        this.breed_group = breed_group;
        this.size = size;
        this.lifespan = lifespan;
        this.temperament = temperament;
        this.colors = colors;
        this.description = description;
        this.image = image;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    await fetchDataAndDisplayDogs(); 

   
    document.getElementById('searchInput').addEventListener('input', searchDogs);
});

async function fetchDataAndDisplayDogs() {
    try {
        const response = await fetch('/dogs'); 
        const data = await response.json(); 

        const dogContainer = document.getElementById('dog-container'); 
        dogContainer.innerHTML = ''; 

        data.forEach(dogData => {
            const dog = new Dog(
                dogData.id,
                dogData.name,
                dogData.breed_group,
                dogData.size,
                dogData.lifespan,
                dogData.origin,
                dogData.temperament,
                dogData.colors,
                dogData.description,
                dogData.image
            );
            const card = createDogCard(dog);
            dogContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching dog data:', error);
    }
}

function createDogCard(dog) {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = dog.image;
    image.alt = dog.name;
    image.addEventListener('click', () => showDogDetails(dog));

    const name = document.createElement('h2');
    name.textContent = dog.name;

    const origin = document.createElement('p');
    origin.textContent = `Origin: ${dog.origin}`;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(origin);

    return card;
}

function showDogDetails(dog) {
    alert(`Name: ${dog.name}\nBreed Group: ${dog.breed_group}\nSize: ${dog.size}\nLifespan: ${dog.lifespan}\nTemperament: ${dog.temperament}\nColors: ${dog.colors}\nDescription: ${dog.description}`);
}

function searchDogs() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const dogCards = document.querySelectorAll('#dog-container .card');
  
    dogCards.forEach(card => {
        const dogName = card.querySelector('h2').textContent.toLowerCase();
        if (dogName.includes(searchInput)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}