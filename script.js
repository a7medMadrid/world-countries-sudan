// ===== GLOBAL STATE =====
let currentUser = null;
let currentCountry = null;
let currentPage = 'home';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
	populateCountrySelect();
	checkAuth();
	setupEventListeners();
	loadCountries();
});

// Populate country select in signup form
function populateCountrySelect() {
	const select = document.getElementById('home-country');
	if (!select) return;
	
	allCountries.forEach(country => {
		const option = document.createElement('option');
		option.value = country;
		const flag = countryFlags[country] || "🌍";
		option.textContent = `${flag} ${country}`;
		select.appendChild(option);
	});
}

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
	const videoContainer = document.getElementById('welcome-video');
	
	videoPage.classList.remove('hidden');
	
	// Create iframe for YouTube video
	if (countryData.videoUrl) {
		videoContainer.innerHTML = `<iframe width="100%" height="100%" src="${countryData.videoUrl}?autoplay=1&mute=1" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen style="position: absolute; top: 0; left: 0;"></iframe>`;
	}
	
	// Skip button functionality
	const skipBtn = document.getElementById('skip-video');
	if (skipBtn) {
		skipBtn.addEventListener('click', () => {
			showWelcomeGreeting();
		}, { once: true });
	}
	
	// Auto-advance after 30 seconds (for iframe, we can't detect end)
	setTimeout(() => {
		// User can still skip manually
	}, 30000);
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
	const data = getCountryData(country);
	return {
		name: data.name,
		videoUrl: data.videoUrl,
		welcomeText: data.welcomeText,
		welcomeImage: data.welcomeImage
	};
}

// ===== COUNTRY SELECTION =====
function loadCountries() {
	const grid = document.getElementById('countries-grid');
	if (!grid) return;
	
	grid.innerHTML = ''; // Clear existing
	
	allCountries.forEach(country => {
		const card = document.createElement('div');
		card.className = 'country-card';
		const flag = countryFlags[country] || "🌍";
		card.innerHTML = `<span class="country-flag">${flag}</span> <span class="country-name">${country}</span>`;
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
	const flag = countryFlags[currentCountry] || "🌍";
	
	if (countryNameEl) countryNameEl.innerHTML = `<span class="country-flag">${flag}</span> ${currentCountry}`;
	if (homeCountryEl) homeCountryEl.innerHTML = `<span class="country-flag">${flag}</span> ${currentCountry}`;
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
	
	setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.history || data.history.length === 0) {
			content.innerHTML = `<div class="loading-state">No history data available for ${currentCountry}</div>`;
			return;
		}
		
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
	}, 500);
}

function loadNewsPage() {
	// Populate country selectors
	const newsSelect = document.getElementById('news-country-select');
	const tvSelect = document.getElementById('tv-country-select');
	
	if (newsSelect && tvSelect) {
		// Clear existing options (except first one)
		newsSelect.innerHTML = '<option value="">Select Country</option>';
		tvSelect.innerHTML = '<option value="">Select Country</option>';
		
		allCountries.forEach(country => {
			const flag = countryFlags[country] || "🌍";
			const option1 = document.createElement('option');
			option1.value = country;
			option1.textContent = `${flag} ${country}`;
			newsSelect.appendChild(option1.cloneNode(true));
			tvSelect.appendChild(option1);
		});
	}
}

function loadNews(country) {
	const content = document.getElementById('written-news');
	content.innerHTML = '<div class="loading-state">Loading news...</div>';
	
	setTimeout(() => {
		const data = getCountryData(country);
		if (!data.news || data.news.length === 0) {
			content.innerHTML = `<div class="loading-state">No news available for ${country}</div>`;
			return;
		}
		
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
		content.innerHTML = html;
	}, 500);
}

function loadTVChannels(country) {
	const container = document.getElementById('tv-channels');
	container.innerHTML = '<div class="loading-state">Loading TV channels...</div>';
	
	setTimeout(() => {
		const channels = tvChannels[country] || [];
		if (channels.length === 0) {
			container.innerHTML = `<div class="loading-state">No TV channels available for ${country}. Check back later for updates.</div>`;
			return;
		}
		
		let html = '';
		channels.forEach(channel => {
			html += `
				<div class="tv-channel-card">
					<h3>${channel.name}</h3>
					<div class="tv-iframe-wrapper">
						<iframe src="${channel.url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
					</div>
				</div>
			`;
		});
		container.innerHTML = html;
	}, 500);
}

function loadFoodPage() {
	const content = document.getElementById('food-content');
	content.innerHTML = `
		<div class="loading-state">Loading food information for ${currentCountry}...</div>
	`;
	
		setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.food || data.food.length === 0) {
			content.innerHTML = `<div class="loading-state">No food data available for ${currentCountry}</div>`;
			return;
		}
		
		let html = '<div class="food-grid">';
		data.food.forEach((dish, index) => {
			const safeRecipe = dish.recipe.replace(/'/g, "\\'").replace(/\n/g, "\\n");
			html += `
				<div class="food-card">
					<h3>${dish.name}</h3>
					<p>${dish.description}</p>
					<button class="recipe-btn" onclick="showRecipe('${dish.name.replace(/'/g, "\\'")}', '${safeRecipe}')">View Recipe</button>
					<button class="video-btn" onclick="showVideo('${dish.videoUrl}')">Watch Video</button>
				</div>
			`;
		});
		html += '</div>';
		content.innerHTML = html;
	}, 500);
}

function loadSportPage() {
	const content = document.getElementById('sport-content');
	content.innerHTML = `
		<div class="loading-state">Loading sports information for ${currentCountry}...</div>
	`;
	
	setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.sport) {
			content.innerHTML = `<div class="loading-state">No sports data available for ${currentCountry}</div>`;
			return;
		}
		
		let html = '<div class="sport-sections">';
		
		// Teams Section
		if (data.sport.teams && data.sport.teams.length > 0) {
			html += '<div class="sport-section"><h3>Football Teams</h3><div class="teams-grid">';
			data.sport.teams.forEach(team => {
				html += `
					<div class="team-card">
						<div class="team-logo">${team.logo}</div>
						<h4>${team.name}</h4>
						<p>Founded: ${team.founded}</p>
						<p>League: ${team.league}</p>
						<p>Trophies: ${team.trophies}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		// GOATs Section
		if (data.sport.goats && data.sport.goats.length > 0) {
			html += '<div class="sport-section"><h3>Greatest Athletes</h3><div class="goats-grid">';
			data.sport.goats.forEach(goat => {
				html += `
					<div class="goat-card">
						<h4>${goat.name}</h4>
						<p><strong>Sport:</strong> ${goat.sport}</p>
						<p>${goat.achievements}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		// Rankings Section
		if (data.sport.rankings && data.sport.rankings.length > 0) {
			html += '<div class="sport-section"><h3>FIFA Rankings</h3><div class="rankings-table">';
			html += '<table><thead><tr><th>Year</th><th>FIFA Rank</th><th>Africa Rank</th></tr></thead><tbody>';
			data.sport.rankings.forEach(rank => {
				html += `<tr><td>${rank.year}</td><td>${rank.fifa}</td><td>${rank.africa || 'N/A'}</td></tr>`;
			});
			html += '</tbody></table></div></div>';
		}
		
		// Trophies Section
		if (data.sport.trophies && data.sport.trophies.length > 0) {
			html += '<div class="sport-section"><h3>Trophies & Achievements</h3><div class="trophies-grid">';
			data.sport.trophies.forEach(trophy => {
				html += `
					<div class="trophy-card">
						<h4>${trophy.name}</h4>
						<p><strong>Year:</strong> ${trophy.year}</p>
						<p>${trophy.description}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		html += '</div>';
		content.innerHTML = html || `<div class="loading-state">No sports data available for ${currentCountry}</div>`;
	}, 500);
}

function loadGovernmentPage() {
	const content = document.getElementById('government-content');
	content.innerHTML = `
		<div class="loading-state">Loading government information for ${currentCountry}...</div>
	`;
	
	setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.government) {
			content.innerHTML = `<div class="loading-state">No government data available for ${currentCountry}</div>`;
			return;
		}
		
		let html = '<div class="government-sections">';
		
		// Current Government
		if (data.government.current && data.government.current.leader) {
			html += `
				<div class="government-section">
					<h3>Current Government</h3>
					<div class="current-gov-card">
						<h4>${data.government.current.leader}</h4>
						<p><strong>Type:</strong> ${data.government.current.type}</p>
						<p>${data.government.current.description}</p>
					</div>
				</div>
			`;
		}
		
		// Government History
		if (data.government.history && data.government.history.length > 0) {
			html += '<div class="government-section"><h3>Government History</h3><div class="gov-history-timeline">';
			data.government.history.forEach(period => {
				html += `
					<div class="gov-period">
						<div class="gov-period-header">
							<span class="gov-period-years">${period.period}</span>
							<span class="gov-leader">${period.leader}</span>
						</div>
						<p><strong>Type:</strong> ${period.type}</p>
						<p>${period.description}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		// Wars & Conflicts
		if (data.government.wars && data.government.wars.length > 0) {
			html += '<div class="government-section"><h3>Wars & Conflicts</h3><div class="wars-list">';
			data.government.wars.forEach(war => {
				html += `
					<div class="war-card">
						<h4>${war.name}</h4>
						<p><strong>Period:</strong> ${war.period}</p>
						<p>${war.description}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		// Corruption
		if (data.government.corruption && data.government.corruption.length > 0) {
			html += '<div class="government-section"><h3>Corruption History</h3><div class="corruption-list">';
			data.government.corruption.forEach(corr => {
				html += `
					<div class="corruption-card">
						<p><strong>Period:</strong> ${corr.period}</p>
						<p>${corr.description}</p>
					</div>
				`;
			});
			html += '</div></div>';
		}
		
		html += '</div>';
		content.innerHTML = html || `<div class="loading-state">No government data available for ${currentCountry}</div>`;
	}, 500);
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
		const data = getCountryData(currentCountry);
		if (!data.songs) {
			artistsList.innerHTML = `<div class="loading-state">No artist data available</div>`;
			songsList.innerHTML = `<div class="loading-state">No song data available</div>`;
			return;
		}
		
		// Load Artists
		if (data.songs.artists && data.songs.artists.length > 0) {
			let artistsHtml = '';
			data.songs.artists.forEach(artist => {
				artistsHtml += `
					<div class="artist-card">
						<h4>${artist.name}</h4>
						<p><strong>Genre:</strong> ${artist.genre}</p>
						<p><strong>Popularity:</strong> ${artist.popularity}</p>
						<p>${artist.description}</p>
					</div>
				`;
			});
			artistsList.innerHTML = artistsHtml;
		} else {
			artistsList.innerHTML = '<div class="loading-state">No artists available</div>';
		}
		
		// Load Songs (filtered by genre)
		if (data.songs.songs && data.songs.songs.length > 0) {
			let filteredSongs = genre === 'all' 
				? data.songs.songs 
				: data.songs.songs.filter(song => song.genre.toLowerCase() === genre.toLowerCase());
			
			// Sort by popularity (Very Popular first)
			filteredSongs.sort((a, b) => {
				const popularityOrder = { "Very Popular": 1, "Popular": 2, "Legendary": 0 };
				return (popularityOrder[a.popularity] || 3) - (popularityOrder[b.popularity] || 3);
			});
			
			let songsHtml = '';
			filteredSongs.forEach(song => {
				songsHtml += `
					<div class="song-card">
						<h4>${song.title}</h4>
						<p><strong>Artist:</strong> ${song.artist}</p>
						<p><strong>Genre:</strong> ${song.genre}</p>
						<p><strong>Popularity:</strong> ${song.popularity}</p>
					</div>
				`;
			});
			songsList.innerHTML = songsHtml || '<div class="loading-state">No songs in this genre</div>';
		} else {
			songsList.innerHTML = '<div class="loading-state">No songs available</div>';
		}
	}, 500);
}

function loadCharactersPage() {
	const content = document.getElementById('characters-content');
	content.innerHTML = `
		<div class="loading-state">Loading famous people from ${currentCountry}...</div>
	`;
	
	setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.characters || data.characters.length === 0) {
			content.innerHTML = `<div class="loading-state">No famous people data available for ${currentCountry}</div>`;
			return;
		}

		let html = '<div class="characters-grid">';
		data.characters.forEach(character => {
			html += `
				<div class="character-card">
					<h3>${character.name}</h3>
					<p class="character-role"><strong>Role:</strong> ${character.role}</p>
					<p>${character.description}</p>
					<div class="character-achievements">
						<strong>Achievements:</strong> ${character.achievements}
					</div>
				</div>
			`;
		});
		html += '</div>';
		content.innerHTML = html;
	}, 500);
}

function loadFamousForPage() {
	const content = document.getElementById('famous-for-content');
	content.innerHTML = `
		<div class="loading-state">Loading what ${currentCountry} is famous for...</div>
	`;
	
	setTimeout(() => {
		const data = getCountryData(currentCountry);
		if (!data.famousFor || data.famousFor.length === 0) {
			content.innerHTML = `<div class="loading-state">No data available for what ${currentCountry} is famous for</div>`;
			return;
		}
		
		let html = '<div class="famous-for-grid">';
		data.famousFor.forEach((item, index) => {
			html += `
				<div class="famous-item-card">
					<div class="famous-item-number">${index + 1}</div>
					<h3>${item}</h3>
				</div>
			`;
		});
		html += '</div>';
		content.innerHTML = html;
	}, 500);
}

// ===== HELPER FUNCTIONS =====
function showRecipe(name, recipe) {
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.innerHTML = `
		<div class="modal-content">
			<div class="modal-header">
				<h2>Recipe: ${name}</h2>
				<button class="modal-close">&times;</button>
			</div>
			<div class="modal-body">
				<div class="recipe-content">
					${recipe.split('\\n').map(line => `<p>${line}</p>`).join('')}
				</div>
			</div>
		</div>
	`;
	document.body.appendChild(modal);
	modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
	modal.addEventListener('click', (e) => {
		if (e.target === modal) modal.remove();
	});
}

function showVideo(url) {
	const modal = document.createElement('div');
	modal.className = 'modal';
	modal.innerHTML = `
		<div class="modal-content">
			<div class="modal-header">
				<h2>Cooking Video</h2>
				<button class="modal-close">&times;</button>
			</div>
			<div class="modal-body">
				<div class="video-modal-wrapper">
					<iframe width="100%" height="500" src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				</div>
			</div>
		</div>
	`;
	document.body.appendChild(modal);
	modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
	modal.addEventListener('click', (e) => {
		if (e.target === modal) modal.remove();
	});
}

// Make functions globally available
window.showRecipe = showRecipe;
window.showVideo = showVideo;
