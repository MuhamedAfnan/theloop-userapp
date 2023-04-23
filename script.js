const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})



const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})

function showstation(){
	var content = document.getElementById("main");
	sidebar.classList.toggle('hide');
	content.innerHTML = `	<div class="head-title">
	<div class="left">
		<h1>Stations</h1>
		<ul class="breadcrumb">
			<li>
				<a href="#">Loop</a>
			</li>
			<li><i class='bx bx-chevron-right' ></i></li>
			<li>
				<a class="active" href="#">Stations</a>
			</li>
		</ul>
	</div>
	
</div>
<div   id ="stat">
<ul class="box-info">
	<li>
		<i class='bx bxs-calendar-check' ></i>
		<span class="text">
			<h3>Pearl Station</h3>
			<p>Nearest</p>
		</span>
	</li>
	<li>
		<i class='bx bxs-group' ></i>
		<span class="text">
			<h3>7 km</h3>
			<p>Distance</p>
		</span>
	</li>
	<li>
		<i class='bx bxs-dollar-circle' ></i>
		<span class="text">
			<h3>₹8</h3>
			<p>per Unit</p>
		</span>
	</li>
</ul>
</div>

<div class="mapbox">
		<div class="head">
			<h3 style='margin:5px'>Map</h3>
		</div>
		<div  id = "mymap"></div>
		
</div>
`
var map = L.map('mymap').setView([9.9816, 76.2999], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([9.9816, 76.2999]).addTo(map);
marker.bindPopup("Pearl Station").openPopup();

}


function showchat(){
	var content = document.getElementById("main");
	sidebar.classList.toggle('hide');
	content.innerHTML = ` <div class="head-title">
	<div class="left">
		<h1>Loop Assistant</h1>
		<ul class="breadcrumb">
			<li>
				<a href="#">Loop</a>
			</li>
			<li><i class='bx bx-chevron-right' ></i></li>
			<li>
				<a class="active" href="#">chatbot</a>
			</li>
		</ul>
	</div>
	
</div>
	<div id="chat-window">
	<div class="main-title">Hii , I am Loopy </div>
	<div id="chat-messages"></div>
	<form id="chat-form">
	  <input
		type="text"
		id="chat-input"
		autocomplete="off"
		placeholder="Type your message here"
		required
	  />
	  <button type="submit">Send</button>
	</form>
  </div>
	`
	const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const apiKey = "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";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = input.value;
  input.value = "";

  messages.innerHTML += `<div class="message user-message">
  <img src="./user.png" alt="user icon"> <span>${message}</span>
  </div>`;

  // Use axios library to make a POST request to the OpenAI APIn
  const response = await axios.post(
    "https://api.openai.com/v1/completions",
    {
      prompt: message,
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );
  const chatbotResponse = response.data.choices[0].text;

  messages.innerHTML += `<div class="message bot-message">
  <img src="/chatbot.png" > <span>${chatbotResponse}</span>
  </div>`;
});
}
/* add customised ev bot */


function showbooking() {
	var content = document.getElementById("main");
	sidebar.classList.toggle('hide');
	content.innerHTML = ` <div class="head-title">
	<div class="left">
		<h1>Bookings</h1>
		<ul class="breadcrumb">
			<li>
				<a href="#">Loop</a>
			</li>
			<li><i class='bx bx-chevron-right' ></i></li>
			<li>
				<a class="active" href="#">slot booking</a>
			</li>
		</ul>
	</div>
	
</div>
	<div >
	<form id="booking-form">
  <label for="booking-date">Book your slots </label>
  <input type="datetime-local" id="booking-date" name="booking-date">
  <button type="submit">Book</button>
</form>
<div id ="bookingformbox"></div>
</div>
	`
	const bookingForm = document.querySelector('#booking-form');
const bookingDate = document.querySelector('#booking-date');	
const mainform = document.getElementById("bookingformbox")

const bookedSlots = ['2023-05-01T09:00', '2023-05-01T10:00', '2023-05-01T11:00'];

bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const selectedDate = bookingDate.value;

  if (bookedSlots.includes(selectedDate)) {
    alert('Sorry, that time slot is already booked. Please select another time.');
  } else {
    alert('Your booking has been confirmed!');
    bookedSlots.push(selectedDate);
	booklist = document.getElementById('bookedlist')
	item = document.createElement('li')
	item.setAttribute('id','bookedlistitems')

	item.textContent = selectedDate.split("T")[0] 
	booklist.appendChild(item)

  }
});
const availableSlots = [];

for (let hour = 9; hour < 17; hour++) {
  for (let minute of ['00', '30']) {
    const slot = `2023-05-01T${hour}:${minute}`;
    if (!bookedSlots.includes(slot)) {
      availableSlots.push(slot);
    }
  }
}

const slotsList = document.createElement('ul');

slotsList.setAttribute('id','bookedlist')
for (let slot of bookedSlots) {
  const slotItem = document.createElement('li');
  slotItem.setAttribute('id','bookedlistitems')
  slotItem.textContent = slot.split("T")[0];
  slotsList.appendChild(slotItem);
}

mainform.appendChild(slotsList);


}




/*quit code*/

function quit() {
	var content = document.getElementById("main");
	content.innerHTML = ` <div class="head-title">
	<div class="left">
		<h1>Logged Out</h1>
		
	</div>
	</div>`
}

window.onload = function() {
	document.getElementById("stat").click();
}