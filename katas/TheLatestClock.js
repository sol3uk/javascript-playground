//https://www.codewars.com/kata/58925dcb71f43f30cd00005f/train/javascript

function latestClock(a, b, c, d) {
	var allDigits = [a, b, c, d];
	console.log("------- Start", allDigits, "-------");

	let { remainingDigits, firstHour, secondHour } = getHours(allDigits);
	console.log("getHours Done = ", `${firstHour}${secondHour} remainingDigits: ${remainingDigits}`);
	let { firstMin, secondMin } = getMinutes(remainingDigits);

	console.log("------- End - Answer = ", `-------${firstHour}${secondHour}:${firstMin}${secondMin}-------`);
	return `${firstHour}${secondHour}:${firstMin}${secondMin}`;
}

function getHours(allDigits) {
	var firstHour, secondHour;

	if (allDigits.includes(2)) {
		// First hour could be 2, check if it is
		var validationFirstHour = 2;
		var validationPossibleDigits = Array.from(allDigits);
		removeFromArray(validationPossibleDigits, validationFirstHour);
		var validationSecondHour = validateSecondHour(validationPossibleDigits);
		var remainingDigits = Array.from(allDigits);
		removeFromArray(remainingDigits, validationFirstHour);
		removeFromArray(remainingDigits, validationSecondHour);
		if (canMakeValidMinutes(remainingDigits)) {
			firstHour = validationFirstHour;
			secondHour = validationSecondHour;

			return { remainingDigits, firstHour, secondHour };
		}
	}

	// First hour can't be 2, get the hours with this assumption
	var remainingDigits = Array.from(allDigits);
	var possibleFirstHours = [1, 0];
	var possibleSecondHours = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
	possibleFirstHours.forEach((possibleFirstHour) => {
		if (!firstHour && remainingDigits.includes(possibleFirstHour)) {
			removeFromArray(remainingDigits, possibleFirstHour);
			firstHour = possibleFirstHour;

			possibleSecondHours.forEach((possibleSecondHour) => {
				if (!secondHour && remainingDigits.includes(possibleSecondHour)) {
					removeFromArray(remainingDigits, possibleSecondHour);
					secondHour = possibleSecondHour;
				}
			});
		}
	});

	return { remainingDigits, firstHour, secondHour };
}

function getMinutes(allDigits) {
	var possibleDigits = Array.from(allDigits);
	var firstMin, secondMin;
	var possibleFirstMins = [5, 4, 3, 2, 1, 0];
	var possibleSecondMins = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

	possibleFirstMins.forEach((possibleFirstMinute) => {
		if (!firstMin && possibleDigits.includes(possibleFirstMinute)) {
			removeFromArray(possibleDigits, possibleFirstMinute);
			firstMin = possibleFirstMinute;

			possibleSecondMins.forEach((possibleSecondMinute) => {
				if (!secondMin && possibleDigits.includes(possibleSecondMinute)) {
					removeFromArray(possibleDigits, possibleSecondMinute);
					secondMin = possibleSecondMinute;
				}
			});
		}
	});

	return { firstMin, secondMin };
}

function validateSecondHour(possibleDigits) {
	var validationSecondHour;
	var possibleSecondHours = [3, 2, 1, 0];

	possibleSecondHours.forEach((possibleFirstHour) => {
		if (!validationSecondHour && possibleDigits.includes(possibleFirstHour)) {
			validationSecondHour = possibleFirstHour;
		}
	});

	return validationSecondHour;
}

function removeFromArray(arrayToRemoveFrom, valueToRemove) {
	arrayToRemoveFrom.splice(arrayToRemoveFrom.indexOf(valueToRemove), 1);
}

function canMakeValidMinutes(possibleDigits) {
	return !possibleDigits.every((digit) => digit > 5); // If all digits are greater than 5 then we can't make a valid set of mins
}
