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
			<h3 id='distancetext'>7 km</h3>
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

<div class="beegbox">
					<div class="head">
						<h3>Path</h3>
					</div>

					<div id='pathinstruction'>
					</div>
					
</div>
`
var map = L.map('mymap').setView([9.9816, 76.2999], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 25,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([9.9816, 76.2999]).addTo(map);
marker.bindPopup("Pearl Station").openPopup();


navigator.geolocation.getCurrentPosition(function(position){
	lat = position.coords.latitude
	long = position.coords.longitude
	console.log(lat,long)

	var UserLocaiton = L.marker([lat,long]).addTo(map);
	UserLocaiton.bindPopup("Your Location").openPopup();

	L.Routing.control({
		waypoints:   [
		L.latLng(lat,long),
		L.latLng(9.9816, 76.2999)
		]
	 }).on('routeselected', function(e) {
        var route = e.route;
		console.log(route)
		showpathinbox(route)
		document.getElementById("distancetext").textContent = Math.floor(route.summary.totalDistance / 1000).toString() + " KM"
	}).addTo(map);

});

}

async function showpathinbox(route){
	listbox = document.getElementById("pathinstruction")
	const pathlist = document.createElement('ol');
	pathlist.setAttribute('id','pathinstructionlist')
	count = 1
	route.instructions.forEach(direction => {
		var li = document.createElement("li")
		li.setAttribute('class','directionli')
		li.textContent = count + ". " + direction.text
		pathlist.appendChild(li)
		count += 1
	});
	listbox.appendChild(pathlist)
}
function showchat(){
			var content = document.getElementById("main");
			sidebar.classList.toggle('hide');
			content.innerHTML = `<div class="head-title">
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
				<div class="chatbot-container">
					<div class="chatbot-header">
						<h2>EV Charging Assistant</h2>
					</div>
					<div class="chatbot-body">
						<ul id="chat-list"></ul>
					</div>
					<div class="chatbot-footer">
						<input type="text" id="chat-input" placeholder="Type your message...">
						<button id="chat-send">Send</button>
					</div>
				</div>

				<style>
				</style>
	
			
			`

			const chatList = document.getElementById("chat-list");
			const chatInput = document.getElementById("chat-input");
			const chatSend = document.getElementById("chat-send");
			
			const openaiApiKey = "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";
			const engine = "davinci";
			
			chatSend.addEventListener("click", function() {
			  const userInput = chatInput.value;
			  addMessageToChat("user", userInput);
			  getChatbotResponse(userInput);
			  chatInput.value = "";
			});

						
			async function getChatbotResponse(userInput) {
				const prompt = `Conversation with an EV Charging Assistant, reply only as an electric vehicle charging assistant chatbot, for questions other than electric vehicle 'note : please reply as ask about electric vehicle' :\nUser: ${userInput}\nBot:`;
				const maxTokens = 50;
				const temperature = 0.7;
				const topP = 1;
				const n = 1;
				const stop = "\n";
				
				const response = await fetch(`https://api.openai.com/v1/engines/${engine}/completions`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${openaiApiKey}`
				},
				body: JSON.stringify({
					prompt: prompt,
					max_tokens: maxTokens,
					temperature: temperature,
					top_p: topP,
					n: n,
					stop: stop
				})
				});
				
				const data = await response.json();
				const chatbotResponse = data.choices[0].text.trim();
				addMessageToChat("bot", chatbotResponse);
			}
			
			function addMessageToChat(sender, message) {
				const bubbleClass = (sender === "user") ? "chat-user-bubble" : "chat-bot-bubble";
				const bubbleHTML = `<li class="${bubbleClass}">${message}</li>`;
				chatList.innerHTML += bubbleHTML;
				chatList.scrollTop = chatList.scrollHeight;
			}
			
	
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