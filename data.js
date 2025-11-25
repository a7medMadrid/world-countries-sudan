// Country Data Structure
const countriesData = {
	Sudan: {
		name: "Sudan",
		nameAr: "السودان",
		flag: "🇸🇩",
		videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder - replace with actual video
		welcomeText: {
			en: "Welcome to Sudan, the land of ancient civilizations and rich culture!",
			ar: "مرحباً بك في السودان، أرض الحضارات القديمة والثقافة الغنية!"
		},
		welcomeImage: "https://via.placeholder.com/800x400/d4af37/ffffff?text=Welcome+to+Sudan",
		history: [],
		news: [],
		food: [],
		sport: {},
		government: {},
		songs: {},
		characters: [],
		famousFor: []
	},
	Egypt: {
		name: "Egypt",
		nameAr: "مصر",
		flag: "🇪🇬",
		videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
		welcomeText: {
			en: "Welcome to Egypt, the cradle of civilization!",
			ar: "مرحباً بك في مصر، مهد الحضارة!"
		},
		welcomeImage: "https://via.placeholder.com/800x400/d4af37/ffffff?text=Welcome+to+Egypt",
		history: [],
		news: [],
		food: [],
		sport: {},
		government: {},
		songs: {},
		characters: [],
		famousFor: []
	}
	// Add more countries as needed
};

// List of all countries
const allCountries = [
	"Sudan", "Egypt", "USA", "UK", "France", "Germany", "Japan", "Brazil", 
	"India", "China", "Saudi Arabia", "UAE", "Turkey", "Morocco", "Tunisia",
	"Algeria", "Libya", "Iraq", "Syria", "Lebanon", "Jordan", "Palestine",
	"Yemen", "Oman", "Kuwait", "Qatar", "Bahrain", "Italy", "Spain", "Greece",
	"Russia", "Canada", "Australia", "South Africa", "Nigeria", "Kenya"
];

// YouTube TV Channels by Country
const tvChannels = {
	Sudan: [
		{ name: "Sudan TV", url: "https://www.youtube.com/embed/live_stream?channel=UC..." },
		{ name: "Al-Sudaniya", url: "https://www.youtube.com/embed/live_stream?channel=UC..." }
	],
	Egypt: [
		{ name: "Al-Masriya", url: "https://www.youtube.com/embed/live_stream?channel=UC..." },
		{ name: "ON TV", url: "https://www.youtube.com/embed/live_stream?channel=UC..." }
	]
	// Add more channels as needed
};

// Sample data for demonstration
function getSampleData(country) {
	return {
		history: [
			{ year: "3000 BC", event: "Foundation of ancient civilization", description: "..." },
			{ year: "1956", event: "Independence", description: "..." }
		],
		news: [
			{ title: "Latest News 1", content: "News content here...", date: "2024-01-15", category: "Politics" },
			{ title: "Latest News 2", content: "News content here...", date: "2024-01-14", category: "Culture" }
		],
		food: [
			{ name: "Traditional Dish 1", description: "Description...", recipe: "Recipe here...", videoUrl: "https://www.youtube.com/embed/..." },
			{ name: "Traditional Dish 2", description: "Description...", recipe: "Recipe here...", videoUrl: "https://www.youtube.com/embed/..." }
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

