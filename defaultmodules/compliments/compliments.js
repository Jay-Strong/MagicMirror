/* global Cron */

Module.register("compliments", {
	// Module config defaults.
	defaults: {
		compliments: {
			// NOTE ON THE WEATHER KEYS BELOW — they are not the names you would guess.
			// The weather module broadcasts CURRENTWEATHER_TYPE using the provider's
			// *icon* name, not the WMO condition name. openmeteo.js maps a weather code
			// to a condition ("partly-cloudy") and then immediately converts that to an
			// icon ("day-cloudy"); only the icon leaves the function. weather.js then
			// runs .replace("-", "_"), which converts only the FIRST hyphen.
			// So the broadcast key is "day_rain-mix" — not "day_rain_mix", and not the
			// condition name "snow-showers-slight". A key that doesn't match exactly
			// never fires. Day/night variants are separate keys.
			// See defaultmodules/weather/providers/openmeteo.js #convertWeatherType.
			anytime: [
				"Hey there sexy! 😘",
				"Butts 🍑",
				"Obi and Diesel have been good. Mostly. 🐕",
				"Edgar knocked something off a shelf. He regrets nothing. 😼",
				"Kitten is not a kitten anymore. Kitten does not care. 🐈",
				"Four animals and one Ben. You're outnumbered and winning. 🏆",
				"Nobody has been fed. They are all lying to you. 🍽️",
				"Zombie plan: Obi charges, Diesel hides, the cats defect. 🧟",
				"In the apocalypse, Edgar sells you out for a snack. 🧟",
				"The dogs would not protect you. Sorry. 🐶",
				"Ben keeps the lights on. You keep everyone alive. Nice team. 💡",
				"Jay is awesome 😎",
				"Levi's got opinions today. 👶",
				"Not long now, Ashley. 🤰"
			],
			morning: [
				"Good morning, Ashley! ☀️",
				"Make good choices today! 👍",
				"Obi's been at the door since five. Diesel is still in bed. 🐕",
				"Coffee first. Then the zoo. ☕",
				"Edgar slept on Ben's head again. 😹",
				"Everyone is starving. Allegedly. 🍽️",
				"Long shift ahead. McLaren's lucky to have you. 🩺",
				"Twelve hours on your feet, and you'll still be nice to everyone. 💪"
			],
			afternoon: [
				"Hello, beauty! 😍",
				"Good afternoon, Mrs. Strong! 👋",
				"Edgar found the sunny spot. He's not moving. 🐈",
				"Nap like a cat. You've earned it. 😴",
				"Somewhere in Lapeer, a patient thinks you hung the moon. 🌙",
				"Growing a whole person and still looking like that. 🤰",
				"Whatever Kitten did, it wasn't Kitten. 😼"
			],
			evening: [
				"Wow, you look hot! 🔥",
				"You crushed it today! 💪",
				"Good evening, Mrs. Strong! 🌆",
				"Feet up. Ben's got the dogs. 🐕",
				"Obi's asleep on the good couch again. 🛋️",
				"Edgar and Kitten have claimed the bed. It's over. 🐈",
				"Ben says he'll do it tomorrow. Ben will not. 🙄",
				"Shift's done. The dogs missed you. Loudly. 🐕",
				"Twelve hours on your feet, growing a person. Sit down. 🤰",
				"The nursery's almost done. Almost. 🍼"
			],

			// Single-day entries only. specialDayUnique is true, so a date match clears
			// every other compliment for that whole day — never use a month-wide pattern.
			"....-01-01": ["New year. Same zoo. 🎉", "Here we go again. 🥂"],
			"....-02-10": ["Happy Birthday, Ben! 🎂", "Another year of Ben. Congratulations, everyone. 🎉"],
			"....-09-22": ["Fall's officially here. 🍂", "Sweater weather. Your season. 🍁"],
			"....-10-01": ["It's October. You know what that means. 🎃", "Spooky season, engaged. 👻"],
			"....-10-31": ["Happy Halloween! 🎃", "BOO! 👻", "Happy Anniversary you crazy kids! 💍", "Married on Halloween. Obviously. 🦇", "Another year undead together. 🧟", "Till death. And then a bit longer. 💀"],
			"....-11-01": ["Halloween's over. 364 days to go. 🎃"],
			"....-12-24": ["Santa's Coming! 🎅", "Ben's still wrapping. Don't look. 🎁"],
			"....-12-25": ["Merry Christmas! 🎄"],
			"....-12-27": ["Happy Birthday, Ashley! 🎂"],
			// Placeholder for "end of November" — correct once the real date is known.
			"2026-11-30": ["Today's the day. Maybe. 👶", "Any minute now, Levi. 🍼"],

			day_sunny: ["Perfect day to wear both dogs out. 🐕", "Sun's out. Edgar already called the window. 🐈", "Clear skies. Even Diesel will go outside. ☀️"],
			night_clear: ["Clear night. Worth stepping outside for a minute. ✨", "Stars are out. So is Kitten, probably. 🌙"],
			day_cloudy: ["Mild and grey. Obi's favorite. Diesel says it's fine. ⛅", "Nothing dramatic out there. Enjoy it. 🌤️", "Good day for the good chair. 🛋️"],
			"night_alt-cloudy": ["Quiet cloudy night. Perfect for doing nothing. ☁️", "Everyone's asleep. Even Kitten. 😴"],
			"day_sunny-overcast": ["Grey and cool. Peak fall energy. 🍂", "Overcast and calm. The cats approve. 🐈"],
			"night_alt-partly-cloudy": ["Soft night out there. Sleep in. 🌥️", "Nothing happening outside. Good. 😴"],
			day_fog: ["Foggy out. Tell Ben to take it slow. 🌫️", "Can't see a thing. Leave early. 🌫️", "Perfect zombie weather. Obi's ready. Diesel is not. 🧟"],
			night_fog: ["Fog's rolling in. Careful on the roads tonight. 🌫️", "Zero visibility. This is how every zombie movie starts. 🧟"],
			day_sprinkle: ["Light rain. Diesel will refuse. Obi won't care. 🐕", "Drizzle out. Umbrella's by the door. ☂️", "Not enough rain to get Ben out of work. Sorry, Ben. 🌦️"],
			night_sprinkle: ["Drizzling out. Good sleeping weather. 🌧️", "Rain on the roof. Perfect. 😴"],
			day_showers: ["Proper rain. Towel by the back door. 🧻", "Wet dog day. Obi's joy, your towels. 🐕", "Raining like this, Ben might get sent home. 🌧️"],
			night_showers: ["Rain all night. Sleep hard. 🌧️", "Nothing to do but stay in. Shame. 🛋️"],
			day_thunderstorm: ["Storm's here. Diesel's under the bed. Ben's on the couch. 🐕", "Thunder out. Obi's watching the window like it's a movie. 🍿", "Storm like this, Ben's day is cancelled. ⛈️", "Big storm. Go find Diesel. 🐕"],
			night_thunderstorm: ["Storm tonight. Expect company in the bed. 🐕", "Thunder. Diesel will be between you by midnight. ⛈️", "If this holds till morning, Ben's not going in. ⚡"],
			snowflake_cold: ["Freezing drizzle. Ice on everything. Ben's home. Enjoy him. 🧊", "Ice out there. Even Obi's unsure about this one. 🥶"],
			"day_rain-mix": ["Sloppy mix out. Nobody's working in this. Ben included. 🌨️", "Worst of both. Diesel votes no. 🐕"],
			"night_rain-mix": ["Icy mix tonight. Good odds Ben's home tomorrow. 🧊", "Messy out. Stay off the roads. 🚗"],
			"day_snow-wind": ["Snow's falling. Obi's thrilled. Diesel is not. Ben's hopeful. ❄️", "First tracks in the yard are always Obi's. 🐾", "Snow day. The cats won't even look at it. 🐈"],
			"night_snow-wind": ["Snowing all night. Ben's quietly hoping it keeps up. ❄️", "Quiet snow. Best kind of night. 🌨️"],
			"day_snow-thunderstorm": ["Heavy snow. Nobody's working today. Ben included. ❄️"],
			"night_snow-thunderstorm": ["Serious snow tonight. That's a snow day and everyone knows it. ❄️", "Big snow coming down. Blankets and dogs. 🛋️"],
			day_sleet: ["Sleet. Miserable out. Diesel agrees. 🐕", "Ice pellets. Nobody's climbing anything today. 🧊"],
			night_sleet: ["Sleeting. Ben's odds of a day off are climbing. 🧊", "Nasty out. Glad you're in. 🥶"],
			"day_sleet-storm": ["Hail. Actual hail. Get the cars in. 🚗", "Wild out there. Everyone inside? Count the animals. 🐾"],
			"night_sleet-storm": ["Hailstorm tonight. Check on the cars. 🚗", "This one's a mess. Ben's not going in tomorrow. ⛈️", "Even Obi's staying in. 🐕"]
		},
		updateInterval: 10000,
		remoteFile: null,
		remoteFileRefreshInterval: 0,
		fadeSpeed: 4000,
		morningStartTime: 3,
		morningEndTime: 12,
		afternoonStartTime: 12,
		afternoonEndTime: 17,
		random: true,
		specialDayUnique: true
	},
	compliments_new: null,
	refreshMinimumDelay: 15 * 60 * 1000, // 15 minutes
	lastIndexUsed: -1,
	// Set currentweather from module
	currentWeatherType: "",
	cron_regex: /^(((\d+,)+\d+|((\d+|[*])[/]\d+|((JAN|FEB|APR|MA[RY]|JU[LN]|AUG|SEP|OCT|NOV|DEC)(-(JAN|FEB|APR|MA[RY]|JU[LN]|AUG|SEP|OCT|NOV|DEC))?))|(\d+-\d+)|\d+(-\d+)?[/]\d+(-\d+)?|\d+|[*]|(MON|TUE|WED|THU|FRI|SAT|SUN)(-(MON|TUE|WED|THU|FRI|SAT|SUN))?) ?){5}$/i,
	date_regex: "[1-9.][0-9.][0-9.]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])",
	pre_defined_types: ["anytime", "morning", "afternoon", "evening"],
	// Define required scripts.
	getScripts () {
		return ["croner.js", "moment.js"];
	},

	// Define start sequence.
	async start () {
		Log.info(`Starting module: ${this.name}`);

		this.lastComplimentIndex = -1;

		if (this.config.remoteFile !== null) {
			const response = await this.loadComplimentFile();
			this.config.compliments = JSON.parse(response);
			this.updateDom();
			if (this.config.remoteFileRefreshInterval !== 0) {
				if ((this.config.remoteFileRefreshInterval >= this.refreshMinimumDelay) || window.mmTestMode === "true") {
					setInterval(async () => {
						const response = await this.loadComplimentFile();
						if (response) {
							this.compliments_new = JSON.parse(response);
						}
						else {
							Log.error(`[compliments] ${this.name} remoteFile refresh failed`);
						}
					},
					this.config.remoteFileRefreshInterval);
				} else {
					Log.error(`[compliments] ${this.name} remoteFileRefreshInterval less than minimum`);
				}
			}
		}
		let minute_sync_delay = 1;
		// loop thru all the configured when events
		for (let m of Object.keys(this.config.compliments)) {
			// if it is a cron entry
			if (this.isCronEntry(m)) {
				// we need to synch our interval cycle to the minute
				minute_sync_delay = (60 - (moment().second())) * 1000;
				break;
			}
		}
		// Schedule update timer. sync to the minute start (if needed), so minute based events happen on the minute start
		setTimeout(() => {
			setInterval(() => {
				this.updateDom(this.config.fadeSpeed);
			}, this.config.updateInterval);
		},
		minute_sync_delay);
	},

	// check to see if this entry could be a cron entry which contains spaces
	isCronEntry (entry) {
		return entry.includes(" ");
	},

	/**
	 * @param {string} cronExpression The cron expression. See https://croner.56k.guru/usage/pattern/
	 * @param {Date} [timestamp] The timestamp to check. Defaults to the current time.
	 * @returns {number} The number of seconds until the next cron run.
	 */
	getSecondsUntilNextCronRun (cronExpression, timestamp = new Date()) {
		// Required for seconds precision
		const adjustedTimestamp = new Date(timestamp.getTime() - 1000);

		// https://www.npmjs.com/package/croner
		const cronJob = new Cron(cronExpression);
		const nextRunTime = cronJob.nextRun(adjustedTimestamp);

		const secondsDelta = (nextRunTime - adjustedTimestamp) / 1000;
		return secondsDelta;
	},

	/**
	 * Generate a random index for a list of compliments.
	 * @param {string[]} compliments Array with compliments.
	 * @returns {number} a random index of given array
	 */
	randomIndex (compliments) {
		if (compliments.length <= 1) {
			return 0;
		}

		const generate = function () {
			return Math.floor(Math.random() * compliments.length);
		};

		let complimentIndex = generate();

		while (complimentIndex === this.lastComplimentIndex) {
			complimentIndex = generate();
		}

		this.lastComplimentIndex = complimentIndex;

		return complimentIndex;
	},

	/**
	 * Retrieve an array of compliments for the time of the day.
	 * @returns {string[]} array with compliments for the time of the day.
	 */
	complimentArray () {
		const now = moment();
		const hour = now.hour();
		const date = now.format("YYYY-MM-DD");
		let compliments = [];

		// Add time of day compliments
		let timeOfDay;
		if (hour >= this.config.morningStartTime && hour < this.config.morningEndTime) {
			timeOfDay = "morning";
		} else if (hour >= this.config.afternoonStartTime && hour < this.config.afternoonEndTime) {
			timeOfDay = "afternoon";
		} else {
			timeOfDay = "evening";
		}

		if (this.config.compliments.hasOwnProperty(timeOfDay)) {
			compliments = [...this.config.compliments[timeOfDay]];
		}

		// Add compliments based on weather
		if (this.currentWeatherType in this.config.compliments) {
			Array.prototype.push.apply(compliments, this.config.compliments[this.currentWeatherType]);
			// if the predefine list doesn't include it (yet)
			if (!this.pre_defined_types.includes(this.currentWeatherType)) {
				// add it
				this.pre_defined_types.push(this.currentWeatherType);
			}
		}

		// Add compliments for anytime
		Array.prototype.push.apply(compliments, this.config.compliments.anytime);

		// get the list of just date entry keys
		let temp_list = Object.keys(this.config.compliments).filter((k) => {
			if (this.pre_defined_types.includes(k)) return false;
			else return true;
		});

		let date_compliments = [];
		// Add compliments for special day/times
		for (let entry of temp_list) {
			// check if this could be a cron type entry
			if (this.isCronEntry(entry)) {
				// make sure the regex is valid
				if (new RegExp(this.cron_regex).test(entry)) {
					// check if we are in the time range for the cron entry
					if (this.getSecondsUntilNextCronRun(entry, now.set("seconds", 0).toDate()) <= 1) {
						// if so, use its notice entries
						Array.prototype.push.apply(date_compliments, this.config.compliments[entry]);
					}
				} else Log.error(`[compliments] cron syntax invalid=${JSON.stringify(entry)}`);
			} else if (new RegExp(entry).test(date)) {
				Array.prototype.push.apply(date_compliments, this.config.compliments[entry]);
			}
		}

		// if we found any date compliments
		if (date_compliments.length) {
			// and the special flag is true
			if (this.config.specialDayUnique) {
				// clear the non-date compliments if any
				compliments.length = 0;
			}
			// put the date based compliments on the list
			Array.prototype.push.apply(compliments, date_compliments);
		}

		return compliments;
	},

	/**
	 * Retrieve a file from the local filesystem
	 * @returns {Promise<string|null>} Resolved with file content or null on error
	 */
	async loadComplimentFile () {
		const { remoteFile, remoteFileRefreshInterval } = this.config;
		const isRemote = remoteFile.startsWith("http://") || remoteFile.startsWith("https://");
		let url = isRemote ? remoteFile : this.file(remoteFile);

		try {
			// Validate URL
			const urlObj = new URL(url);
			// Add cache-busting parameter to remote URLs to prevent cached responses
			if (isRemote && remoteFileRefreshInterval !== 0) {
				urlObj.searchParams.set("dummy", Date.now());
			}
			url = urlObj.toString();
		} catch {
			Log.warn(`[compliments] Invalid URL: ${url}`);
		}

		try {
			const response = await fetch(url);
			if (!response.ok) {
				Log.error(`[compliments] HTTP error: ${response.status} ${response.statusText}`);
				return null;
			}
			return await response.text();
		} catch (error) {
			Log.info("[compliments] fetch failed:", error.message);
			return null;
		}
	},

	/**
	 * Retrieve a random compliment.
	 * @returns {string} a compliment
	 */
	getRandomCompliment () {
		// get the current time of day compliments list
		const compliments = this.complimentArray();
		// variable for index to next message to display
		let index;
		// are we randomizing
		if (this.config.random) {
			// yes
			index = this.randomIndex(compliments);
		} else {
			// no, sequential
			// if doing sequential, don't fall off the end
			index = this.lastIndexUsed >= compliments.length - 1 ? 0 : ++this.lastIndexUsed;
		}

		return compliments[index] || "";
	},

	// Override dom generator.
	getDom () {
		const wrapper = document.createElement("div");
		wrapper.className = this.config.classes ? this.config.classes : "thin xlarge bright pre-line";
		// get the compliment text
		const complimentText = this.getRandomCompliment();
		// split it into parts on newline text
		const parts = complimentText.split("\n");
		// create a span to hold the compliment
		const compliment = document.createElement("span");
		// process all the parts of the compliment text
		for (const part of parts) {
			if (part !== "") {
				// create a text element for each part
				compliment.appendChild(document.createTextNode(part));
				// add a break
				compliment.appendChild(document.createElement("BR"));
			}
		}
		// only add compliment to wrapper if there is actual text in there
		if (compliment.children.length > 0) {
			// remove the last break
			compliment.lastElementChild.remove();
			wrapper.appendChild(compliment);
		}
		// if a new set of compliments was loaded from the refresh task
		// we do this here to make sure no other function is using the compliments list
		if (this.compliments_new) {
			// use them
			if (JSON.stringify(this.config.compliments) !== JSON.stringify(this.compliments_new)) {
				// only reset if the contents changes
				this.config.compliments = this.compliments_new;
				// reset the index
				this.lastIndexUsed = -1;
			}
			// clear new file list so we don't waste cycles comparing between refreshes
			this.compliments_new = null;
		}
		// only in test mode
		if (window.mmTestMode === "true") {
			// check for (undocumented) remoteFile2 to test new file load
			if (this.config.remoteFile2 !== null && this.config.remoteFileRefreshInterval !== 0) {
				// switch the file so that next time it will be loaded from a changed file
				this.config.remoteFile = this.config.remoteFile2;
			}
		}
		return wrapper;
	},

	// Override notification handler.
	notificationReceived (notification, payload) {
		if (notification === "CURRENTWEATHER_TYPE") {
			this.currentWeatherType = payload.type;
		}
	}
});
