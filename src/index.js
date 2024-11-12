// index.js


const form = document.querySelector('#new-ramen')


function renderRamens(ramens) {
  const main = document.querySelector('#ramen-menu');
  main.innerHTML = '';
  
  ramens.forEach(ramen => {
    const theRamen = document.createElement('div');
    theRamen.className = 'card';

    //const ramenName = document.createElement('h2');
    //ramenName.textContent = ramen.name;

    const ramenImg = document.createElement('img');
    ramenImg.src = ramen.image;
    ramenImg.style.width = `200px`;

    theRamen.addEventListener('click', () => handleClick(ramen));

    theRamen.append(ramenImg);
    main.appendChild(theRamen);
  });
}

// Callbacks
const handleClick = (ramen) => {
    fetch(`http://localhost:3000/ramens/${ramen.id}`)
      .then(resp => resp.json())
      .then(ramenDetails => {
        const image = document.querySelector('.detail-image');
        const detailName = document.querySelector('.name');
        const restaurant = document.querySelector('.restaurant');
        const rating = document.querySelector('#rating-display'); 
        const comment = document.querySelector('#comment-display');

        image.src = ramenDetails.image;
        detailName.textContent = ramenDetails.name;
        restaurant.textContent = ramenDetails.restaurant;
        rating.textContent = ramenDetails.rating;
        comment.textContent = ramenDetails.comment;
        
        console.log(detailName.textContent)
        return Promise.resolve()
      })
      .catch(error => console.error('Error fetching ramen details:', error));
            
      
  
    };
  


const addSubmitListener = (event) => {
event.preventDefault();
console.log("Form good");
const nameInput = document.querySelector('#new-name').value;
const restaurantInput = document.querySelector('#new-restaurant').value;
const imgInput = document.querySelector('#new-image').value;
const ratingInput = document.querySelector('#new-rating').value;
const commentInput = document.querySelector('#new-comment').value;

fetch('http://localhost:3000/ramens', {
  
  method: "POST",
  headers: {
     'content-type': 'application/json',
      'accept': 'application/json',
   },
 body:JSON.stringify({
  name: nameInput,
  restaurant: restaurantInput,
  image: imgInput,
  rating: ratingInput,
  comment: commentInput,
})
  })
.then(response => response.json())
.then(newRamen => {
  displayRamens(); 
  form.reset();
})
.catch(error => {
  console.error('Error adding ramen:', error);
})
  
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
  .then((resp) => resp.json())
  .then((data) => {
    renderRamens(data);
  })
  .catch((error) => {
    console.error('Error fetching Raman:', error);
  })

  //form.reset();
};

const main = () => {
  displayRamens();
  if (form) {
    form.addEventListener('submit', addSubmitListener);
  } else {
    console.error("Form element not found");
  }
}

main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
