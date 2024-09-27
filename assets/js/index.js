

// Initialize products and feeds from localStorage
let products = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [
    {
        "id": 1,
        "image": "images/1.jpg",
        "name": "Orient Vita",
        "price": "2445",
        "inventory": 4,
        "productCode": "k233"
    }
];

let feeds = localStorage.getItem('feeds') ? JSON.parse(localStorage.getItem('feeds')) : [];

// Function to render the products vertically
function displayProducts(productsToDisplay) {
    let placeholder = document.querySelector("#data-output");
    let out = "";
    productsToDisplay.forEach(product => {
        out += `
       
        `;
    });
    placeholder.innerHTML = out;
}

// Function to render the feed
function displayFeed(product) {
    let feedOutput = document.querySelector("#feed-output"); // Ensure this is the correct output area for feeds
    let feedHTML = `
    <div class="feed">
        <div class="head">
            <div class="user">
                <div class="profile-photo">
                    <img src="${product.image}" alt="Profile Photo">
                </div>
                <div class="info">
                    <h3>${product.name}</h3>
                    <small>${product.productCode}</small>
                </div>
            </div>
            <span class="edit">
                <i class="uil uil-ellipsis-h"></i>
            </span>
        </div>
        <div class="photo">
            <img src="${product.image}" alt="${product.name}">
        </div>
      
        <div class="caption">
            <p><b>${product.name}</b> -
            <span class="harsh-tag">#${product.productCode}</span></p>
        </div>
        <div class="comments text-muted">
            Description: ${product.inventory}
        </div>
    </div>
    `;
    feedOutput.innerHTML += feedHTML; // Append the new feed to the output
}

// Load initial products and feeds
function loadInitialData() {
    displayProducts(products);
    feeds.forEach(displayFeed);
}

// Search box functionality
document.querySelector("#searchBox").addEventListener("input", function() {
    let searchQuery = this.value.toLowerCase();
    
    // Filter products by name based on the search query
    let filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery)
    );

    // Display the filtered products
    displayProducts(filteredProducts);
});

// Preview the image when a file is selected
document.querySelector("#image").addEventListener("change", function (event) {
    let reader = new FileReader();
    let imagePreview = document.querySelector("#imagePreview");

    reader.onload = function () {
        // Display the image preview
        imagePreview.src = reader.result;
        imagePreview.style.display = "block";
    };

    // Read the selected image file
    reader.readAsDataURL(event.target.files[0]);
});

// Function to add a new product
document.querySelector("#addProductForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect new product data from the form
    let newProduct = {
        id: products.length + 1,  // Auto-increment the id
        name: document.querySelector("#name").value,
        image: document.querySelector("#imagePreview").src,  // Use the base64 encoded image
        price: document.querySelector("#price").value,
        inventory: document.querySelector("#inventory").value,
        productCode: document.querySelector("#productCode").value
    };

    // Add the new product to the products array
    products.push(newProduct);
    feeds.push(newProduct); // Also add the new product to feeds

    // Save the updated products and feeds array to localStorage
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('feeds', JSON.stringify(feeds));

    // Update the page to display the new product in feed format
    displayFeed(newProduct); // Only display in the feed format

    // Optionally, reset the form and hide the image preview
    this.reset();
    document.querySelector("#imagePreview").style.display = "none";
});

// Load the initial data when the page is loaded
loadInitialData();


// Sidebar
const menuItems = document.querySelectorAll('.menu-item');

// Messages 
const messageNotification = document.querySelector('#messages-notifications');
const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

//Theme
const theme = document.querySelector('#theme');
const themeModal = document.querySelector('.customize-theme');
const fontSize = document.querySelectorAll('.choose-size span');
var root = document.querySelector(':root');
const colorPalette = document.querySelectorAll('.choose-color span');
const Bg1 = document.querySelector('.bg-1');
const Bg2 = document.querySelector('.bg-2');
const Bg3 = document.querySelector('.bg-3');


// ============== SIDEBAR ============== 

// Remove active class from all menu items
const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        changeActiveItem();
        item.classList.add('active');
        if(item.id != 'notifications') {
            document.querySelector('.notifications-popup').
            style.display = 'none';
        } else {
            document.querySelector('.notifications-popup').
            style.display = 'block';
            document.querySelector('#notifications .notification-count').
            style.display = 'none';
        }
    })
})

// ============== MESSAGES ============== 

//Searches messages
const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1) {
            user.style.display = 'flex'; 
        } else {
            user.style.display = 'none';
        }
    })
}

//Search for messages
messageSearch.addEventListener('keyup', searchMessage);

//Highlight messages card when messages menu item is clicked
messageNotification.addEventListener('click', () => {
    messages.style.boxShadow = '0 0 1rem var(--color-primary)';
    messageNotification.querySelector('.notification-count').style.display = 'none';
    setTimeout(() => {
        messages.style.boxShadow = 'none';
    }, 2000);
})

// ============== THEME / DISPLAY CUSTOMIZATION ============== 

// Opens Modal
const openThemeModal = () => {
    themeModal.style.display = 'grid';
}

// Closes Modal
const closeThemeModal = (e) => {
    if(e.target.classList.contains('customize-theme')) {
        themeModal.style.display = 'none';
    }
}

themeModal.addEventListener('click', closeThemeModal);
theme.addEventListener('click', openThemeModal);


// ============== FONT SIZE ============== 

// remove active class from spans or font size selectors
const removeSizeSelectors = () => {
    fontSize.forEach(size => {
        size.classList.remove('active');
    })
}

fontSize.forEach(size => { 
   size.addEventListener('click', () => {
        removeSizeSelectors();
        let fontSize;
        size.classList.toggle('active');

        if(size.classList.contains('font-size-1')) { 
            fontSize = '10px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '5.4rem');
        } else if(size.classList.contains('font-size-2')) { 
            fontSize = '13px';
            root.style.setProperty('----sticky-top-left', '5.4rem');
            root.style.setProperty('----sticky-top-right', '-7rem');
        } else if(size.classList.contains('font-size-3')) {
            fontSize = '16px';
            root.style.setProperty('----sticky-top-left', '-2rem');
            root.style.setProperty('----sticky-top-right', '-17rem');
        } else if(size.classList.contains('font-size-4')) {
            fontSize = '19px';
            root.style.setProperty('----sticky-top-left', '-5rem');
            root.style.setProperty('----sticky-top-right', '-25rem');
        } else if(size.classList.contains('font-size-5')) {
            fontSize = '22px';
            root.style.setProperty('----sticky-top-left', '-12rem');
            root.style.setProperty('----sticky-top-right', '-35rem');
        }

        // change font size of the root html element
        document.querySelector('html').style.fontSize = fontSize;
   })
})

// Remove active class from colors
const changeActiveColorClass = () => {
    colorPalette.forEach(colorPicker => {
        colorPicker.classList.remove('active');
    })
}

// Change color primary
colorPalette.forEach(color => {
    color.addEventListener('click', () => {
        let primary;
        changeActiveColorClass(); 

        if(color.classList.contains('color-1')) {
            primaryHue = 252;
        } else if(color.classList.contains('color-2')) {
            primaryHue = 52;
        } else if(color.classList.contains('color-3')) {
            primaryHue = 352;
        } else if(color.classList.contains('color-4')) {
            primaryHue = 152;
        } else if(color.classList.contains('color-5')) {
            primaryHue = 202;
        }

        color.classList.add('active');
        root.style.setProperty('--primary-color-hue', primaryHue);
    })
})

//Theme Background Values
let lightColorLightness;
let whiteColorLightness;
let darkColorLightness;

// Changes background color
const changeBG = () => {
    root.style.setProperty('--light-color-lightness', lightColorLightness);
    root.style.setProperty('--white-color-lightness', whiteColorLightness);
    root.style.setProperty('--dark-color-lightness', darkColorLightness);
}

Bg1.addEventListener('click', () => {
    // add active class
    Bg1.classList.add('active');
    // remove active class from the others
    Bg2.classList.remove('active');
    Bg3.classList.remove('active');
    //remove customized changes from local storage
    window.location.reload();
});

Bg2.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '20%';
    lightColorLightness = '15%';

    // add active class
    Bg2.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg3.classList.remove('active');
    changeBG();
});

Bg3.addEventListener('click', () => {
    darkColorLightness = '95%';
    whiteColorLightness = '10%';
    lightColorLightness = '0%';

    // add active class
    Bg3.classList.add('active');
    // remove active class from the others
    Bg1.classList.remove('active');
    Bg2.classList.remove('active');
    changeBG();
});
