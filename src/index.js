// index.js


const form = document.querySelector('#new-ramen')

let selectedRamenId = null;

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
  selectedRamenId = ramen.id;  
  
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
  fetch(`http://localhost:3000/ramens`)
  .then((resp) => resp.json())
  .then((data) => {
    renderRamens(data);
  
 if (data.length > 0) {
        handleClick(data[0]); // Selects the first ramen in the list as default
      }
    })  
    .catch((error) => {
      console.error('Error fetching ramen:', error);
    });

  //form.reset();
};

const addPatchListener = (event) => {
  event.preventDefault();
  const ratingChange = document.querySelector('#edit-rating').value;
  const commentChange = document.querySelector('#edit-comment').value;
  
  if (!selectedRamenId) return;

  fetch(`http://localhost:3000/ramens/${selectedRamenId}`, {
  
    method: "PATCH",
    headers: {
       'content-type': 'application/json',
        'accept': 'application/json',
     },
   body:JSON.stringify({
    rating: ratingChange,
    comment: commentChange,
  })
    })
  .then(response => response.json())
  .then(updateRamen => {
    displayRamens(); 
    //document.querySelector('#edit-ramen').addEventListener('submit', addPatchListener);
  })
  .catch(error => {
    console.error('Error adding ramen:', error);
  })
    
  }
  const addDeleteListener = (event) => {
    event.preventDefault();
    
    if (!selectedRamenId) return;
  
    fetch(`http://localhost:3000/ramens/${selectedRamenId}`, {
    
      method: "DELETE",
      headers: {
         'content-type': 'application/json',
          'accept': 'application/json',
       },
      })
    .then(response => response.json())
    .then(deleteRamen => {
      displayRamens(); 
      //document.querySelector('#edit-ramen').addEventListener('submit', addPatchListener);
    })
    .catch(error => {
      console.error('Error adding ramen:', error);
    })
      
    }


  const main = () => {
  displayRamens();
  if (form) {
    form.addEventListener('submit', addSubmitListener);
  } else {
    console.error("Form element not found");
  }
  document.querySelector('#edit-ramen').addEventListener('submit', addPatchListener);
  
  document.querySelector('#delete-ramen').addEventListener('click', addDeleteListener);
  }
main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
