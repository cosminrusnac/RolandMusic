const topFunction = () => document.documentElement.scrollTop = 0;

const imageSources = ['/img/about-us.jpg', 
'/img/about-us2.jpg', 
'/img/about-us3.jpg',
'/img/about-us4.jpg',
'/img/about-us5.jpg'
];

let randomNumber = (min, max) => {
	return Math.round(Math.random() * (max - min) + min);
}

console.log(randomNumber(0, 4));

document.getElementById('aboutUs').src = imageSources[randomNumber(0,4)];

