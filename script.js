// ===== GLOBAL STATE =====
let currentUser = null;
let currentCountry = null;
let currentPage = 'home';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
	checkAuth();
	setupEventListeners();
	loadCountries();
});

// ===== AUTHENTICATION =====
function checkAuth() {
	const savedUser = localStorage.getItem('currentUser');
	if (savedUser) {
		currentUser = JSON.parse(savedUser);
		currentCountry = currentUser.homeCountry || 'Sudan';
		showMainDashboard();
	} else {
		showAuthPage();
	}
}

function showAuthPage() {
	document.getElementById('auth-page').classList.remove('hidden');
	document.getElementById('main-dashboard').classList.add('hidden');
}

function showMainDashboard() {
	document.getElementById('auth-page').classList.add('hidden');
	document.getElementById('main-dashboard').classList.remove('hidden');
	updateCountryDisplay();
	loadPage('home');
}

// ===== AUTH EVENT LISTENERS =====
document.getElementById('show-signup')?.addEventListener('click', (e) => {
	e.preventDefault();
	document.getElementById('login-form').classList.remove('active');
	document.getElementById('signup-form').classList.add('active');
});

document.getElementById('show-login')?.addEventListener('click', (e) => {
	e.preventDefault();
	document.getElementById('signup-form').classList.remove('active');
	document.getElementById('login-form').classList.add('active');
});

document.getElementById('loginForm')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById('login-email').value;
	const password = document.getElementById('login-password').value;
	
	const savedUser = localStorage.getItem('users');
	const users = savedUser ? JSON.parse(savedUser) : {};
	
	if (users[email] && users[email].password === password) {
		currentUser = users[email];
		currentCountry = currentUser.homeCountry || 'Sudan';
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
		showWelcomeFlow();
	} else {
		alert('Invalid email or password');
	}
});

document.getElementById('signupForm')?.addEventListener('submit', (e) => {
	e.preventDefault();
	const email = document.getElementById('signup-email').value;
	const password = document.getElementById('signup-password').value;
	const homeCountry = document.getElementById('home-country').value;
	const language = document.getElementById('language').value;
	const welcomeStyle = document.getElementById('welcome-style').value;
	
	const savedUser = localStorage.getItem('users');
	const users = savedUser ? JSON.parse(savedUser) : {};
	
	if (users[email]) {
		alert('Email already exists. Please login.');
		return;
	}
	
	const newUser = {
		email,
		password,
		homeCountry,
		language,
		welcomeStyle,
		createdAt: new Date().toISOString()
	};
	
	users[email] = newUser;
	localStorage.setItem('users', JSON.stringify(users));
	
	currentUser = newUser;
	currentCountry = homeCountry;
	localStorage.setItem('currentUser', JSON.stringify(currentUser));
	showWelcomeFlow();
});

// ===== WELCOME FLOW =====
function showWelcomeFlow() {
	document.getElementById('auth-page').classList.add('hidden');
	
	// Show welcome video
	const countryData = countriesData[currentCountry] || getDefaultCountryData(currentCountry);
	showWelcomeVideo(countryData);
}

function showWelcomeVideo(countryData) {
	const videoPage = document.getElementById('welcome-video-page');
	const video = document.getElementById('welcome-video');
	
	videoPage.classList.remove('hidden');
	
	// Set video source (placeholder - replace with actual video URLs)
	video.src = countryData.videoUrl || '';
	
	// Auto-advance after video ends or skip
	video.addEventListener('ended', () => {
		showWelcomeGreeting();
	});
	
	document.getElementById('skip-video').addEventListener('click', () => {
		showWelcomeGreeting();
	});
}

function showWelcomeGreeting() {
	document.getElementById('welcome-video-page').classList.add('hidden');
	
	const greetingPage = document.getElementById('welcome-greeting-page');
	const greetingContent = document.getElementById('greeting-content');
	
	greetingPage.classList.remove('hidden');
	
	const countryData = countriesData[currentCountry] || getDefaultCountryData(currentCountry);
	const welcomeStyle = currentUser.welcomeStyle || 'text';
	
	let content = '';
	
	if (welcomeStyle === 'text') {
		content = `
			<h1>${countryData.welcomeText[currentUser.language] || countryData.welcomeText.en}</h1>
			<p>${currentUser.language === 'ar' ? 'استمتع برحلتك!' : 'Enjoy your journey!'}</p>
		`;
	} else if (welcomeStyle === 'image') {
		content = `
			<h1>${countryData.welcomeText[currentUser.language] || countryData.welcomeText.en}</h1>
			<img src="${countryData.welcomeImage}" alt="Welcome" />
			<p>${currentUser.language === 'ar' ? 'استمتع برحلتك!' : 'Enjoy your journey!'}</p>
		`;
	} else if (welcomeStyle === 'video') {
		content = `
			<h1>${countryData.welcomeText[currentUser.language] || countryData.welcomeText.en}</h1>
			<iframe width="100%" height="400" src="${countryData.videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			<p>${currentUser.language === 'ar' ? 'استمتع برحلتك!' : 'Enjoy your journey!'}</p>
		`;
	}
	
	greetingContent.innerHTML = content;
	
	document.getElementById('continue-to-home').addEventListener('click', () => {
		greetingPage.classList.add('hidden');
		showMainDashboard();
	}, { once: true });
}

function getDefaultCountryData(country) {
	return {
		name: country,
		videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		welcomeText: {
			en: `Welcome to ${country}!`,
			ar: `مرحباً بك في ${country}!`
		},
		welcomeImage: `https://via.placeholder.com/800x400/d4af37/ffffff?text=Welcome+to+${country}`
	};
}

// ===== COUNTRY SELECTION =====
function loadCountries() {
	const grid = document.getElementById('countries-grid');
	if (!grid) return;
	
	allCountries.forEach(country => {
		const card = document.createElement('div');
		card.className = 'country-card';
		card.textContent = country;
		card.addEventListener('click', () => selectCountry(country));
		grid.appendChild(card);
	});
}

function selectCountry(country) {
	currentCountry = country;
	updateCountryDisplay();
	loadPage(currentPage);
	closeCountrySelector();
}

function updateCountryDisplay() {
	const countryNameEl = document.getElementById('current-country-name');
	const homeCountryEl = document.getElementById('home-country-display');
	
	if (countryNameEl) countryNameEl.textContent = currentCountry;
	if (homeCountryEl) homeCountryEl.textContent = currentCountry;
}

// ===== COUNTRY SELECTOR MODAL =====
document.getElementById('country-selector-btn')?.addEventListener('click', () => {
	document.getElementById('country-selector-modal').classList.remove('hidden');
});

document.querySelector('.modal-close')?.addEventListener('click', () => {
	closeCountrySelector();
});

document.getElementById('country-search')?.addEventListener('input', (e) => {
	const search = e.target.value.toLowerCase();
	const cards = document.querySelectorAll('.country-card');
	cards.forEach(card => {
		const text = card.textContent.toLowerCase();
		card.style.display = text.includes(search) ? 'block' : 'none';
	});
});

function closeCountrySelector() {
	document.getElementById('country-selector-modal').classList.add('hidden');
}

// ===== PAGE NAVIGATION =====
function setupEventListeners() {
	// Navigation links
	document.querySelectorAll('.nav-link[data-page]').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const page = link.getAttribute('data-page');
			loadPage(page);
		});
	});
	
	// Feature cards
	document.querySelectorAll('.feature-card[data-page]').forEach(card => {
		card.addEventListener('click', () => {
			const page = card.getAttribute('data-page');
			loadPage(page);
		});
	});
	
	// Logout
	document.getElementById('logout-btn')?.addEventListener('click', () => {
		localStorage.removeItem('currentUser');
		currentUser = null;
		currentCountry = null;
		showAuthPage();
	});
	
	// News tabs
	document.getElementById('news-written-btn')?.addEventListener('click', () => {
		document.getElementById('written-news').classList.add('active');
		document.getElementById('video-news').classList.add('hidden');
		document.getElementById('news-written-btn').classList.add('active');
		document.getElementById('news-video-btn').classList.remove('active');
	});
	
	document.getElementById('news-video-btn')?.addEventListener('click', () => {
		document.getElementById('written-news').classList.remove('active');
		document.getElementById('video-news').classList.remove('hidden');
		document.getElementById('news-written-btn').classList.remove('active');
		document.getElementById('news-video-btn').classList.add('active');
	});
	
	// News country selector
	document.getElementById('news-country-select')?.addEventListener('change', (e) => {
		loadNews(e.target.value);
	});
	
	// TV country selector
	document.getElementById('tv-country-select')?.addEventListener('change', (e) => {
		loadTVChannels(e.target.value);
	});
	
	// Song genre buttons
	document.querySelectorAll('.genre-btn').forEach(btn => {
		btn.addEventListener('click', () => {
			document.querySelectorAll('.genre-btn').forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			const genre = btn.getAttribute('data-genre');
			loadSongs(genre);
		});
	});
}

function loadPage(page) {
	currentPage = page;
	
	// Update nav links
	document.querySelectorAll('.nav-link').forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('data-page') === page) {
			link.classList.add('active');
		}
	});
	
	// Hide all pages
	document.querySelectorAll('.page').forEach(p => {
		p.classList.remove('active');
	});
	
	// Show selected page
	const pageEl = document.getElementById(`page-${page}`);
	if (pageEl) {
		pageEl.classList.add('active');
	}
	
	// Load page content
	switch(page) {
		case 'home':
			loadHomePage();
			break;
		case 'history':
			loadHistoryPage();
			break;
		case 'news':
			loadNewsPage();
			break;
		case 'food':
			loadFoodPage();
			break;
		case 'sport':
			loadSportPage();
			break;
		case 'government':
			loadGovernmentPage();
			break;
		case 'songs':
			loadSongsPage();
			break;
		case 'characters':
			loadCharactersPage();
			break;
		case 'famous-for':
			loadFamousForPage();
			break;
	}
}

// ===== PAGE LOADERS =====
function loadHomePage() {
	updateCountryDisplay();
}

function loadHistoryPage() {
	const content = document.getElementById('history-content');
	content.innerHTML = `
		<div class="loading-state">Loading history for ${currentCountry}...</div>
	`;
	
	// Simulate loading
	setTimeout(() => {
		const data = getSampleData(currentCountry);
		let html = '<div class="history-timeline">';
		data.history.forEach(item => {
			html += `
				<div class="history-item">
					<div class="history-year">${item.year}</div>
					<div class="history-content">
						<h3>${item.event}</h3>
						<p>${item.description}</p>
					</div>
				</div>
			`;
		});
		html += '</div>';
		content.innerHTML = html;
	}, 1000);
}

function loadNewsPage() {
	// Populate country selectors
	const newsSelect = document.getElementById('news-country-select');
	const tvSelect = document.getElementById('tv-country-select');
	
	if (newsSelect && tvSelect) {
		allCountries.forEach(country => {
			const option1 = document.createElement('option');
			option1.value = country;
			option1.textContent = country;
			newsSelect.appendChild(option1.cloneNode(true));
			tvSelect.appendChild(option1);
		});
	}
}

function loadNews(country) {
	const content = document.getElementById('written-news');
	content.innerHTML = '<div class="loading-state">Loading news...</div>';
	
	setTimeout(() => {
		const data = getSampleData(country);
		let html = '';
		data.news.forEach(article => {
			html += `
				<article class="news-article">
					<div class="news-date">${article.date} - ${article.category}</div>
					<h3>${article.title}</h3>
					<p>${article.content}</p>
				</article>
			`;
		});
		content.innerHTML = html || '<div class="loading-state">No news available</div>';
	}, 1000);
}

function loadTVChannels(country) {
	const container = document.getElementById('tv-channels');
	container.innerHTML = '<div class="loading-state">Loading TV channels...</div>';
	
	setTimeout(() => {
		const channels = tvChannels[country] || [];
		if (channels.length === 0) {
			container.innerHTML = '<div class="loading-state">No TV channels available for this country</div>';
			return;
		}
		
		let html = '';
		channels.forEach(channel => {
			html += `
				<div class="tv-channel-card">
					<h3>${channel.name}</h3>
					<iframe src="${channel.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</div>
			`;
		});
		container.innerHTML = html;
	}, 1000);
}

function loadFoodPage() {
	const content = document.getElementById('food-content');
	content.innerHTML = `
		<div class="loading-state">Loading food information for ${currentCountry}...</div>
	`;
	
	setTimeout(() => {
		const data = getSampleData(currentCountry);
		let html = '<div class="food-grid">';
		data.food.forEach(dish => {
			html += `
				<div class="food-card">
					<h3>${dish.name}</h3>
					<p>${dish.description}</p>
					<button class="recipe-btn" onclick="showRecipe('${dish.name}', '${dish.recipe}')">View Recipe</button>
					<button class="video-btn" onclick="showVideo('${dish.videoUrl}')">Watch Video</button>
				</div>
			`;
		});
		html += '</div>';
		content.innerHTML = html;
	}, 1000);
}

function loadSportPage() {
	const content = document.getElementById('sport-content');
	content.innerHTML = `
		<div class="loading-state">Loading sports information for ${currentCountry}...</div>
	`;
	// Implement sport page loading
}

function loadGovernmentPage() {
	const content = document.getElementById('government-content');
	content.innerHTML = `
		<div class="loading-state">Loading government information for ${currentCountry}...</div>
	`;
	// Implement government page loading
}

function loadSongsPage() {
	loadSongs('all');
}

function loadSongs(genre) {
	const artistsList = document.getElementById('artists-list');
	const songsList = document.getElementById('songs-list');
	
	artistsList.innerHTML = '<div class="loading-state">Loading artists...</div>';
	songsList.innerHTML = '<div class="loading-state">Loading songs...</div>';
	
	setTimeout(() => {
		// Sample data
		artistsList.innerHTML = `
			<div class="artist-card">
				<h4>Artist 1</h4>
				<p>Famous artist from ${currentCountry}</p>
			</div>
		`;
		
		songsList.innerHTML = `
			<div class="song-card">
				<h4>Famous Song 1</h4>
				<p>Genre: ${genre === 'all' ? 'Various' : genre}</p>
			</div>
		`;
	}, 1000);
}

function loadCharactersPage() {
	const content = document.getElementById('characters-content');
	content.innerHTML = `
		<div class="loading-state">Loading famous people from ${currentCountry}...</div>
	`;
	// Implement characters page loading
}

function loadFamousForPage() {
	const content = document.getElementById('famous-for-content');
	content.innerHTML = `
		<div class="loading-state">Loading what ${currentCountry} is famous for...</div>
	`;
	// Implement famous for page loading
}

// ===== HELPER FUNCTIONS =====
function showRecipe(name, recipe) {
	alert(`Recipe for ${name}:\n\n${recipe}`);
}

function showVideo(url) {
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.innerHTML = `
		<div class="modal-content">
			<div class="modal-header">
				<h2>Cooking Video</h2>
				<button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
			</div>
			<div class="modal-body">
				<iframe width="100%" height="500" src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
			</div>
		</div>
	`;
	document.body.appendChild(modal);
	modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
}

// Make functions globally available
window.showRecipe = showRecipe;
window.showVideo = showVideo;
