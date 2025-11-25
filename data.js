// Country Flags Mapping
const countryFlags = {
	"Sudan": "🇸🇩",
	"Egypt": "🇪🇬",
	"USA": "🇺🇸",
	"UK": "🇬🇧",
	"France": "🇫🇷",
	"Germany": "🇩🇪",
	"Japan": "🇯🇵",
	"Brazil": "🇧🇷",
	"India": "🇮🇳",
	"China": "🇨🇳",
	"Saudi Arabia": "🇸🇦",
	"UAE": "🇦🇪",
	"Turkey": "🇹🇷",
	"Morocco": "🇲🇦",
	"Tunisia": "🇹🇳",
	"Algeria": "🇩🇿",
	"Libya": "🇱🇾",
	"Iraq": "🇮🇶",
	"Syria": "🇸🇾",
	"Lebanon": "🇱🇧",
	"Jordan": "🇯🇴",
	"Palestine": "🇵🇸",
	"Yemen": "🇾🇪",
	"Oman": "🇴🇲",
	"Kuwait": "🇰🇼",
	"Qatar": "🇶🇦",
	"Bahrain": "🇧🇭",
	"Italy": "🇮🇹",
	"Spain": "🇪🇸",
	"Greece": "🇬🇷",
	"Russia": "🇷🇺",
	"Canada": "🇨🇦",
	"Australia": "🇦🇺",
	"South Africa": "🇿🇦",
	"Nigeria": "🇳🇬",
	"Kenya": "🇰🇪"
};

// Country Data Structure
const countriesData = {
	Sudan: {
		name: "Sudan",
		nameAr: "السودان",
		flag: "🇸🇩",
		videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0", // Motivational video about Sudan
		welcomeText: {
			en: "Welcome to Sudan, the land of ancient civilizations and rich culture!",
			ar: "مرحباً بك في السودان، أرض الحضارات القديمة والثقافة الغنية!"
		},
		welcomeImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
		history: [
			{ year: "3000 BC", event: "Kingdom of Kush", description: "The Kingdom of Kush was established in Nubia, becoming one of Africa's earliest civilizations." },
			{ year: "750 BC", event: "Kushite Dynasty", description: "Kushite pharaohs ruled Egypt, establishing the 25th Dynasty." },
			{ year: "350 AD", event: "Meroë Period", description: "Meroë became the capital, known for iron production and trade." },
			{ year: "1821", event: "Ottoman-Egyptian Rule", description: "Sudan came under Ottoman-Egyptian administration." },
			{ year: "1881", event: "Mahdist Revolution", description: "Muhammad Ahmad declared himself the Mahdi, leading a successful revolution." },
			{ year: "1899", event: "Anglo-Egyptian Condominium", description: "Sudan was jointly ruled by Britain and Egypt." },
			{ year: "1956", event: "Independence", description: "Sudan gained independence on January 1, 1956." },
			{ year: "2011", event: "South Sudan Independence", description: "South Sudan seceded, becoming an independent nation." }
		],
		news: [
			{ title: "Sudan's Cultural Heritage Preservation", content: "Efforts continue to preserve Sudan's ancient pyramids and archaeological sites, including the Nubian pyramids at Meroë.", date: "2024-01-15", category: "Culture" },
			{ title: "Economic Development Initiatives", content: "New initiatives aim to boost agricultural production and improve infrastructure across Sudan.", date: "2024-01-14", category: "Economy" },
			{ title: "Educational Reforms", content: "The government announces new educational programs to improve literacy rates and access to quality education.", date: "2024-01-13", category: "Education" }
		],
		food: [
			{ 
				name: "Ful Medames", 
				description: "A traditional breakfast dish made from fava beans, typically served with bread, eggs, and vegetables.", 
				recipe: "Ingredients: 2 cups fava beans, 4 cloves garlic, 1 lemon, olive oil, salt, cumin. Method: Soak beans overnight, boil until tender, mash with garlic, add lemon juice and olive oil, season with salt and cumin. Serve hot with bread.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			},
			{ 
				name: "Kisra", 
				description: "Traditional flatbread made from sorghum flour, a staple of Sudanese cuisine.", 
				recipe: "Ingredients: 2 cups sorghum flour, 1 cup water, salt. Method: Mix flour with water to form smooth batter, let rest 30 minutes, cook on hot griddle like crepes until golden brown.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			},
			{ 
				name: "Shaiyah", 
				description: "Spiced meat dish cooked with onions, garlic, and traditional Sudanese spices.", 
				recipe: "Ingredients: 1kg beef, 3 onions, 4 cloves garlic, 2 tomatoes, spices (cumin, coriander, turmeric), salt, pepper. Method: Brown meat, add onions and garlic, add tomatoes and spices, simmer until tender.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			},
			{ 
				name: "Aseeda", 
				description: "Traditional porridge made from wheat or sorghum, often served with meat or vegetable stew.", 
				recipe: "Ingredients: 2 cups wheat flour, 4 cups water, salt. Method: Boil water, gradually add flour while stirring, cook until thick and smooth, serve with stew.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			}
		],
		sport: {
			teams: [
				{ name: "Al-Hilal Omdurman", founded: "1930", league: "Sudan Premier League", trophies: 28, logo: "🏆" },
				{ name: "Al-Merreikh", founded: "1927", league: "Sudan Premier League", trophies: 25, logo: "🏆" }
			],
			goats: [
				{ name: "Haitham Mustafa", sport: "Football", achievements: "Sudan's most capped player, played in multiple African Cup of Nations" },
				{ name: "Nasra Abubaker", sport: "Athletics", achievements: "Multiple African championships in middle-distance running" }
			],
			rankings: [
				{ year: "2024", fifa: "128", africa: "35" },
				{ year: "2023", fifa: "130", africa: "36" }
			],
			trophies: [
				{ name: "CECAFA Cup", year: "1977", description: "Won the regional championship" }
			]
		},
		government: {
			history: [
				{ period: "1956-1958", leader: "Ismail al-Azhari", type: "Prime Minister", description: "First Prime Minister of independent Sudan" },
				{ period: "1958-1964", leader: "Ibrahim Abboud", type: "Military", description: "Military coup established military rule" },
				{ period: "1964-1969", leader: "Various", type: "Civilian", description: "Return to civilian rule" },
				{ period: "1969-1985", leader: "Gaafar Nimeiry", type: "Military", description: "Longest-serving leader, established one-party state" },
				{ period: "1985-1989", leader: "Various", type: "Civilian", description: "Brief return to democracy" },
				{ period: "1989-2019", leader: "Omar al-Bashir", type: "Military", description: "Longest military rule, ended by revolution" },
				{ period: "2019-Present", leader: "Transitional Government", type: "Transitional", description: "Transitional period following revolution" }
			],
			corruption: [
				{ period: "1989-2019", description: "Widespread corruption during al-Bashir era, with billions embezzled" },
				{ period: "2019-Present", description: "Ongoing efforts to recover stolen assets and prosecute corrupt officials" }
			],
			wars: [
				{ name: "First Sudanese Civil War", period: "1955-1972", description: "Conflict between north and south over autonomy" },
				{ name: "Second Sudanese Civil War", period: "1983-2005", description: "Longest civil war in Africa, ended with peace agreement" },
				{ name: "Darfur Conflict", period: "2003-2020", description: "Ethnic conflict in Darfur region" }
			],
			current: {
				leader: "Transitional Government",
				type: "Transitional",
				description: "Working towards democratic elections"
			}
		},
		songs: {
			artists: [
				{ name: "Mohammed Wardi", genre: "Traditional", popularity: "Legendary", description: "Known as the King of Sudanese Music" },
				{ name: "Abdel Karim el-Kabli", genre: "Traditional", popularity: "Very Popular", description: "Famous for patriotic songs" },
				{ name: "Salah Ibn Albadia", genre: "Hip-Hop", popularity: "Popular", description: "Modern Sudanese hip-hop artist" }
			],
			songs: [
				{ title: "Ya Sudan", artist: "Mohammed Wardi", genre: "Traditional", popularity: "Very Popular" },
				{ title: "Al-Sudan Baladna", artist: "Abdel Karim el-Kabli", genre: "Traditional", popularity: "Very Popular" },
				{ title: "Modern Track", artist: "Salah Ibn Albadia", genre: "Hip-Hop", popularity: "Popular" }
			]
		},
		characters: [
			{ name: "Ismail al-Azhari", role: "First Prime Minister", description: "Led Sudan to independence in 1956", achievements: "Independence leader, national unity advocate" },
			{ name: "Mohammed Wardi", role: "Musician", description: "Most beloved Sudanese musician", achievements: "Hundreds of songs, cultural icon" },
			{ name: "Fatima Ahmed Ibrahim", role: "Women's Rights Activist", description: "First woman elected to parliament in Sudan and Arab world", achievements: "Women's rights pioneer, political leader" },
			{ name: "Al-Tayeb Salih", role: "Author", description: "Renowned novelist and writer", achievements: "Author of 'Season of Migration to the North', literary master" }
		],
		famousFor: [
			"Nubian Pyramids - More pyramids than Egypt",
			"Kingdom of Kush - Ancient African civilization",
			"Rich cultural diversity - Over 500 ethnic groups",
			"Traditional music - Haqiba and tambour",
			"Hospitality - Legendary Sudanese generosity",
			"Nile River - Longest river flows through Sudan"
		]
	},
	Egypt: {
		name: "Egypt",
		nameAr: "مصر",
		flag: "🇪🇬",
		videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
		welcomeText: {
			en: "Welcome to Egypt, the cradle of civilization!",
			ar: "مرحباً بك في مصر، مهد الحضارة!"
		},
		welcomeImage: "https://images.unsplash.com/photo-1539650116574-75c0c6d73aa6?w=800",
		history: [
			{ year: "3100 BC", event: "Unification of Egypt", description: "Upper and Lower Egypt united under King Menes, beginning the Pharaonic era." },
			{ year: "2580 BC", event: "Great Pyramid of Giza", description: "Construction of the Great Pyramid, one of the Seven Wonders of the Ancient World." },
			{ year: "332 BC", event: "Alexander the Great", description: "Egypt conquered by Alexander, beginning Hellenistic period." },
			{ year: "30 BC", event: "Roman Rule", description: "Egypt became a province of the Roman Empire." },
			{ year: "641 AD", event: "Islamic Conquest", description: "Arab Muslims conquered Egypt, introducing Islam." },
			{ year: "1517", event: "Ottoman Rule", description: "Egypt became part of the Ottoman Empire." },
			{ year: "1882", event: "British Occupation", description: "Britain occupied Egypt, establishing protectorate." },
			{ year: "1922", event: "Independence", description: "Egypt gained nominal independence from Britain." },
			{ year: "1952", event: "Revolution", description: "Free Officers Movement overthrew the monarchy." },
			{ year: "1953", event: "Republic", description: "Egypt became a republic under Gamal Abdel Nasser." }
		],
		news: [
			{ title: "New Archaeological Discovery", content: "Archaeologists discover new tombs in the Valley of the Kings, revealing more about ancient Egyptian civilization.", date: "2024-01-15", category: "Culture" },
			{ title: "Economic Growth", content: "Egypt's economy shows strong growth in tourism and manufacturing sectors.", date: "2024-01-14", category: "Economy" }
		],
		food: [
			{ 
				name: "Koshari", 
				description: "Egypt's national dish - a mix of rice, lentils, pasta, and chickpeas topped with spicy tomato sauce.", 
				recipe: "Ingredients: Rice, lentils, pasta, chickpeas, onions, tomato sauce, garlic, vinegar, cumin. Method: Cook each component separately, layer in bowl, top with crispy onions and spicy tomato sauce.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			},
			{ 
				name: "Ful Medames", 
				description: "Traditional fava bean dish, Egypt's favorite breakfast.", 
				recipe: "Ingredients: Fava beans, garlic, lemon, olive oil, cumin. Method: Cook beans until soft, mash with garlic, add lemon and olive oil, season with cumin.", 
				videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" 
			}
		],
		sport: {
			teams: [
				{ name: "Al Ahly", founded: "1907", league: "Egyptian Premier League", trophies: 43, logo: "🏆" },
				{ name: "Zamalek", founded: "1911", league: "Egyptian Premier League", trophies: 28, logo: "🏆" }
			],
			goats: [
				{ name: "Mohamed Salah", sport: "Football", achievements: "Premier League top scorer, Champions League winner, African Player of the Year multiple times" }
			],
			rankings: [
				{ year: "2024", fifa: "35", africa: "3" }
			],
			trophies: [
				{ name: "African Cup of Nations", year: "1957, 1959, 1986, 1998, 2006, 2008, 2010", description: "7-time African champions" }
			]
		},
		government: {
			history: [
				{ period: "1952-1970", leader: "Gamal Abdel Nasser", type: "President", description: "Led the revolution, established republic" },
				{ period: "1970-1981", leader: "Anwar Sadat", type: "President", description: "Signed peace treaty with Israel" },
				{ period: "1981-2011", leader: "Hosni Mubarak", type: "President", description: "Long-serving president, ousted in revolution" },
				{ period: "2011-2012", leader: "Mohamed Hussein Tantawi", type: "Military", description: "Interim military rule" },
				{ period: "2012-2013", leader: "Mohamed Morsi", type: "President", description: "First democratically elected president" },
				{ period: "2014-Present", leader: "Abdel Fattah el-Sisi", type: "President", description: "Current president" }
			],
			corruption: [
				{ period: "1981-2011", description: "Widespread corruption during Mubarak era" }
			],
			wars: [
				{ name: "Six-Day War", period: "1967", description: "War with Israel" },
				{ name: "Yom Kippur War", period: "1973", description: "War with Israel" }
			],
			current: {
				leader: "Abdel Fattah el-Sisi",
				type: "President",
				description: "Elected president since 2014"
			}
		},
		songs: {
			artists: [
				{ name: "Umm Kulthum", genre: "Traditional", popularity: "Legendary", description: "The Star of the East, most famous Arab singer" },
				{ name: "Amr Diab", genre: "Pop", popularity: "Very Popular", description: "Modern pop superstar" }
			],
			songs: [
				{ title: "Enta Omri", artist: "Umm Kulthum", genre: "Traditional", popularity: "Very Popular" },
				{ title: "Habibi", artist: "Amr Diab", genre: "Pop", popularity: "Very Popular" }
			]
		},
		characters: [
			{ name: "Gamal Abdel Nasser", role: "President", description: "Revolutionary leader and pan-Arabist", achievements: "Led 1952 revolution, nationalized Suez Canal" }
		],
		famousFor: [
			"Pyramids of Giza - Ancient wonder",
			"Nile River - Longest river in the world",
			"Ancient civilization - Over 5000 years of history",
			"Pharaohs - Ancient Egyptian rulers",
			"Hieroglyphics - Ancient writing system"
		]
	}
};

// List of all countries with flags
const allCountries = Object.keys(countryFlags);

// YouTube TV Channels by Country
const tvChannels = {
	Sudan: [
		{ name: "Sudan TV", url: "https://www.youtube.com/embed/9bZkp7q19f0" },
		{ name: "Al-Sudaniya", url: "https://www.youtube.com/embed/9bZkp7q19f0" }
	],
	Egypt: [
		{ name: "Al-Masriya", url: "https://www.youtube.com/embed/9bZkp7q19f0" },
		{ name: "ON TV", url: "https://www.youtube.com/embed/9bZkp7q19f0" }
	]
};

// Get country-specific data
function getCountryData(country) {
	if (countriesData[country]) {
		return countriesData[country];
	}
	
	// Return default data for countries not in database
	return {
		name: country,
		nameAr: country,
		flag: countryFlags[country] || "🌍",
		videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
		welcomeText: {
			en: `Welcome to ${country}!`,
			ar: `مرحباً بك في ${country}!`
		},
		welcomeImage: `https://via.placeholder.com/800x400/d4af37/ffffff?text=Welcome+to+${country}`,
		history: [
			{ year: "Foundation", event: "Country established", description: "Historical information about " + country }
		],
		news: [
			{ title: "Latest News", content: "News from " + country, date: new Date().toISOString().split('T')[0], category: "General" }
		],
		food: [
			{ name: "Traditional Dish", description: "A traditional dish from " + country, recipe: "Recipe for traditional dish", videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0" }
		],
		sport: {
			teams: [],
			goats: [],
			rankings: [],
			trophies: []
		},
		government: {
			history: [],
			corruption: [],
			wars: [],
			current: {}
		},
		songs: {
			artists: [],
			songs: []
		},
		characters: [],
		famousFor: []
	};
}
