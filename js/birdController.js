class Bird {
  constructor(id, name, species, family, habitat, place_of_found, diet, description, weight_kg, height_cm, image) {
      this.id = id;
      this.name = name;
      this.species = species;
      this.family = family;
      this.habitat = habitat;
      this.place_of_found = place_of_found;
      this.diet = diet;
      this.description = description;
      this.weight_kg = weight_kg;
      this.height_cm = height_cm;
      this.image = image;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  await fetchDataAndDisplayBirds(); 

 
  document.getElementById('searchInput').addEventListener('input', searchBirds);
});

async function fetchDataAndDisplayBirds() {
  try {
      const response = await fetch('/birds'); 
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json(); 

      const birdContainer = document.getElementById('pet-container'); 
      birdContainer.innerHTML = ''; 


      data.forEach(birdData => {
          const bird = new Bird(
              birdData.id,
              birdData.name,
              birdData.species,
              birdData.family,
              birdData.habitat,
              birdData.place_of_found,
              birdData.diet,
              birdData.description,
              birdData.weight_kg,
              birdData.height_cm,
              birdData.image
          );
          const card = createBirdCard(bird);
          birdContainer.appendChild(card);
      });
  } catch (error) {
      console.error('Error fetching bird data:', error);
  }
}

function createBirdCard(bird) {
  const card = document.createElement('div');
  card.classList.add('card');

  const image = document.createElement('img');
  image.src = bird.image;
  image.alt = bird.name;
  image.addEventListener('click', () => showBirdDetails(bird));

  const name = document.createElement('h2');
  name.textContent = bird.name;

  const species = document.createElement('p');
  species.textContent = `Species: ${bird.species}`;

  card.appendChild(image);
  card.appendChild(name);
  card.appendChild(species);

  return card;
}

function showBirdDetails(bird) {
  alert(`Name: ${bird.name}\nSpecies: ${bird.species}\nFamily: ${bird.family}\nHabitat: ${bird.habitat}\nPlace of Found: ${bird.place_of_found}\nDiet: ${bird.diet}\nDescription: ${bird.description}`);
}

function searchBirds() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const birdCards = document.querySelectorAll('#pet-container .card');

  birdCards.forEach(card => {
      const birdName = card.querySelector('h2').textContent.toLowerCase();
      if (birdName.includes(searchInput)) {
          card.style.display = 'block';
      } else {
          card.style.display = 'none';
      }
  });
}
