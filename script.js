let api_key = 'at_5W7hxv6mRFYjmBuxDtthheyM77AL0';
const bypass_cors = 'https://cors-anywhere.heroku.com/';

const selectElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) return element;
    throw new Error(`Cannot find the element ${selector}`)
}

// form elements
let form = selectElement('form');
let input = selectElement('input');
let button = selectElement('button');

// update elements
let mapElem = document.getElementById('map');
let ipView = document.getElementById('ip')
let place = document.getElementById('location')
let timezone = document.getElementById('timezone')
let isp = document.getElementById('isp')

const map = L.map(mapElem, {
    'center': [0, 0],
    'zoom': 0,
    'layers': [
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        })
    ]
});
button.addEventListener('click', displayIp());
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ipAddress = input.value;
    displayIp(ipAddress);
})

async function displayIp(ipAddress) {
    try {
        const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=${api_key}&ipAddress=${ipAddress}`, {
            method: 'GET',
        });
        const data = await res.json();
        console.log(data);

        const { lat, lng } = data.location;
        map.setView([lat, lng], 13);
        L.marker([lat, lng]).addTo(map);

        ipView.innerHTML = data.ip;
        place.innerHTML = ` ${data.location.region}, ${data.location.country}`;
        timezone.innerHTML = data.location.timezone;
        isp.innerHTML = data.isp;


    } catch (error) {
        console.log(error)
    }
}
