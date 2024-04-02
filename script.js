// Function to initialize Swiper when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
   
    // Swiper Initialization
    var swiper = new Swiper(".home-slider", {
        // Set the space between slides
        spaceBetween: 30,
        // Center the active slide
        centeredSlides: true,
        // Set autoplay settings
        autoplay: {
            delay: 7500, // Delay between slides in milliseconds
            disableOnInteraction: false, // Autoplay continues even on user interaction
        },
        // Enable pagination dots
        pagination: {
            el: ".swiper-pagination", // Pagination container element
            clickable: true, // Make pagination dots clickable
        },
        // Navigation buttons
        navigation: {
            nextEl: ".swiper-button-next", // Next slide button
            prevEl: ".swiper-button-prev", // Previous slide button
        },
        // Enable loop for continuous sliding
        loop: true,
    });

    // Toggle menu table from mobile view
    let menu = document.querySelector('#menu'); // Get the menu icon element
    let navbar = document.querySelector('.navbar'); // Get the navbar element

    // Event listener for menu icon click
    menu.onclick = () => {
        menu.classList.toggle('fa-times'); // Toggle the menu icon class for close icon appearance
        navbar.classList.toggle('active'); // Toggle the active class for navbar to show/hide it
    };
});

//------------------------------------------------//
// OBA - Change colours

var myModels = ["/models/Oba-green.glb", "/models/Oba-orange.glb", "/models/Oba.glb"];
var counter = 0; // Start with the first model in the array

// Ensure DOM content is fully loaded before accessing elements
document.addEventListener("DOMContentLoaded", function() {
    // Attach click event listener to the change-color button
    document.getElementById("change-color").addEventListener("click", function() {
        counter = (counter + 1) % myModels.length; // Increment and loop the counter
        // Update the model-viewer src attribute to the next model
        document.getElementById("ObaModel").setAttribute('src', myModels[counter]);
    });
});
//------------------------------------------------//
// OBA - Show dimensions
const viewDimension = document.querySelector('#chair');

const checkbox = viewDimension.querySelector('#show-dimensions');

const dimElements = [...viewDimension.querySelectorAll('button'), viewDimension.querySelector('#dimLines')];

function setVisibility(visible) {
  dimElements.forEach((element) => {
    if (visible) {
      element.classList.remove('hide');
    } else {
      element.classList.add('hide');
    }
  });
}

checkbox.addEventListener('change', () => {
 setVisibility(checkbox.checked);
 });

 viewDimension.addEventListener('ar-status', (event) => {
   setVisibility(event.detail.status !== 'session-started');
 });

function drawLine(svgLine, dotHotspot1, dotHotspot2, dimensionHotspot) {
  if (dotHotspot1 && dotHotspot2) {
    svgLine.setAttribute('x1', dotHotspot1.canvasPosition.x);
    svgLine.setAttribute('y1', dotHotspot1.canvasPosition.y);
    svgLine.setAttribute('x2', dotHotspot2.canvasPosition.x);
    svgLine.setAttribute('y2', dotHotspot2.canvasPosition.y);

    if (dimensionHotspot && !dimensionHotspot.facingCamera) {
      svgLine.classList.add('hide');
    } else {
      svgLine.classList.remove('hide');
    }
  }
}

const dimLines = viewDimension.querySelectorAll('line');

const renderSVG = () => {
  drawLine(dimLines[0], viewDimension.queryHotspot('hotspot-dot+X-Y+Z'), viewDimension.queryHotspot('hotspot-dot+X-Y-Z'), viewDimension.queryHotspot('hotspot-dim+X-Y'));
  drawLine(dimLines[1], viewDimension.queryHotspot('hotspot-dot+X-Y-Z'), viewDimension.queryHotspot('hotspot-dot+X+Y-Z'), viewDimension.queryHotspot('hotspot-dim+X-Z'));
  drawLine(dimLines[2], viewDimension.queryHotspot('hotspot-dot+X+Y-Z'), viewDimension.queryHotspot('hotspot-dot-X+Y-Z')); // always visible
  drawLine(dimLines[3], viewDimension.queryHotspot('hotspot-dot-X+Y-Z'), viewDimension.queryHotspot('hotspot-dot-X-Y-Z'), viewDimension.queryHotspot('hotspot-dim-X-Z'));
  drawLine(dimLines[4], viewDimension.queryHotspot('hotspot-dot-X-Y-Z'), viewDimension.queryHotspot('hotspot-dot-X-Y+Z'), viewDimension.queryHotspot('hotspot-dim-X-Y'));
};

 viewDimension.addEventListener('load', () => {
  const center = viewDimension.getBoundingBoxCenter();
   const size = viewDimension.getDimensions();
   const x2 = size.x / 2;
   const y2 = size.y / 2;
   const z2 = size.z / 2;

   viewDimension.updateHotspot({
     name: 'hotspot-dot+X-Y+Z',
     position: `${center.x + x2} ${center.y - y2} ${center.z + z2}`
   });

   viewDimension.updateHotspot({
     name: 'hotspot-dim+X-Y',
     position: `${center.x + x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
   });
   viewDimension.querySelector('button[slot="hotspot-dim+X-Y"]').textContent =
     `${(size.z * 100).toFixed(0)} cm`;

   viewDimension.updateHotspot({
     name: 'hotspot-dot+X-Y-Z',
     position: `${center.x + x2} ${center.y - y2} ${center.z - z2}`
   });

   viewDimension.updateHotspot({
     name: 'hotspot-dim+X-Z',
     position: `${center.x + x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
   });
   viewDimension.querySelector('button[slot="hotspot-dim+X-Z"]').textContent =
     `${(size.y * 100).toFixed(0)} cm`;

   viewDimension.updateHotspot({
     name: 'hotspot-dot+X+Y-Z',
     position: `${center.x + x2} ${center.y + y2} ${center.z - z2}`
   });

   viewDimension.updateHotspot({
     name: 'hotspot-dim+Y-Z',
     position: `${center.x} ${center.y + y2 * 1.1} ${center.z - z2 * 1.1}`
   });
   viewDimension.querySelector('button[slot="hotspot-dim+Y-Z"]').textContent =
     `${(size.x * 100).toFixed(0)} cm`;

   viewDimension.updateHotspot({
     name: 'hotspot-dot-X+Y-Z',
     position: `${center.x - x2} ${center.y + y2} ${center.z - z2}`
   });

   viewDimension.updateHotspot({
     name: 'hotspot-dim-X-Z',
     position: `${center.x - x2 * 1.2} ${center.y} ${center.z - z2 * 1.2}`
   });
   viewDimension.querySelector('button[slot="hotspot-dim-X-Z"]').textContent =
     `${(size.y * 100).toFixed(0)} cm`;

   viewDimension.updateHotspot({
     name: 'hotspot-dot-X-Y-Z',
     position: `${center.x - x2} ${center.y - y2} ${center.z - z2}`
   });

   viewDimension.updateHotspot({
     name: 'hotspot-dim-X-Y',
     position: `${center.x - x2 * 1.2} ${center.y - y2 * 1.1} ${center.z}`
   });
   viewDimension.querySelector('button[slot="hotspot-dim-X-Y"]').textContent =
     `${(size.z * 100).toFixed(0)} cm`;

   viewDimension.updateHotspot({
     name: 'hotspot-dot-X-Y+Z',
     position: `${center.x - x2} ${center.y - y2} ${center.z + z2}`
   });

   renderSVG();

   viewDimension.addEventListener('camera-change', renderSVG);
 });

 //OBA Interpolation Camera
 
 document.addEventListener('DOMContentLoaded', () => {
    // Select the model viewer by its ID
    const modelViewer = document.getElementById('oba-orange');

    // Ensure the model viewer is found before proceeding
    if (modelViewer) {
        // Query all buttons with the class 'view-btn' within the model viewer
        const hotspotButtons = modelViewer.querySelectorAll('.view-btn');

        // Iterate over each button and attach a click event listener
        hotspotButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Retrieve the 'data-orbit' attribute value of the clicked button
                const orbit = button.getAttribute('data-orbit');

                // Update the model viewer's camera orbit to the new value
                modelViewer.cameraOrbit = orbit;


            });
        });
    } else {
        // Log an error if the model viewer could not be found
        console.error('Model viewer with ID #oba-orange not found.');
    }
});


  // Inspiration - change environmental light using own image
(() => {
    const modelViewer = document.querySelector('#room');
    const checkbox = document.querySelector('#neutral');
    
    checkbox.addEventListener('change', () => {
      modelViewer.environmentImage = checkbox.checked ? '' : './img/light-1.jpg';
    });
  })();
  
