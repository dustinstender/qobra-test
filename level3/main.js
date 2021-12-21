const object = require('/Users/dustinstender/Downloads/serpentini - candidat/level3/data/input.json');

// more useful because day of month is redundant
function deleteDayInDate(string) {
	return string.slice(0, -3);
}

// used to separate array of deals based on which user
function groupBy(arr, property) {
	return arr.reduce(function (memo, x) {
		if (!memo[x[property]]) {
			memo[x[property]] = [];
		}
		memo[x[property]].push(x);
		return memo;
	}, {});
}

// obtain all the months to be used in algorithm
function getMonths(array) {
	let arrayOfMonths = [];
	array.forEach((deal) => {
		arrayOfMonths.push(deleteDayInDate(deal.close_date));
		arrayOfMonths.push(deleteDayInDate(deal.payment_date));
	});
	return arrayOfMonths.filter((x, i, a) => a.indexOf(x) == i);
}

// calculates commission
function calculateCommission(amount, objective) {
	let total = 0;
	if (amount > objective) {
		total += (amount - objective) * 0.15;
		// this is for both the first and second tier
		total += (objective / 2) * 0.15;
	} else if (amount > objective / 2) {
		total += (amount - objective / 2) * 0.1;
		total += (objective / 2) * 0.05;
	} else {
		total += amount * 0.05;
	}
	return total;
}

// a running total of commission after iterating over each deal
function totalCommissionPerDeal(arrayOfDeals, objective) {
	const months = getMonths(arrayOfDeals);
	let commissionPerDeal = Array(arrayOfDeals.length).fill(0);
	let tallied = Array(months.length).fill(0);
	for (let i = 0; i < arrayOfDeals.length; ++i) {
		for (let j = 0; j < months.length; ++j) {
			if (deleteDayInDate(arrayOfDeals[i].close_date) === months[j]) {
				tallied[j] += arrayOfDeals[i].amount;
				commissionPerDeal[i] = calculateCommission(tallied[j], objective);
			}
		}
	}
	return commissionPerDeal;
}

// calculates actual commission for each deal, rather than a running total
function commissionPerDeal(arrayOfDeals, totalCommissionPerDeal) {
	let actualArrayOfCommission = Array(arrayOfDeals.length).fill(0);
	for (let i = 0; i < arrayOfDeals.length - 1; ++i) {
		if (
			deleteDayInDate(arrayOfDeals[i].close_date) ===
			deleteDayInDate(arrayOfDeals[i + 1].close_date)
		) {
			actualArrayOfCommission[i + 1] =
				totalCommissionPerDeal[i + 1] - totalCommissionPerDeal[i];
		} else {
			actualArrayOfCommission[i + 1] = totalCommissionPerDeal[i + 1];
		}
		if (i === 0) {
			actualArrayOfCommission[i] = totalCommissionPerDeal[i];
		}
	}
	return actualArrayOfCommission;
}

// creates an object for a single salespersons deals
function createDealsObject(arrayOfDeals, commissionPerDeal) {
	const object = commissionPerDeal.map((person, index) => ({
		id: arrayOfDeals[index].id,
		commission: person,
	}));
	return object;
}

// creates an object of all salespeoples deals
function combineDealsObjects(jsonObject) {
	const lengthOfUsers = jsonObject.users.length;
	let actualArrayOfCommission = Array(lengthOfUsers).fill(0);
	for (let i = 0; i < lengthOfUsers; ++i) {
		const stringNumber = (i + 1).toString();
		const total = totalCommissionPerDeal(
			groupBy(jsonObject.deals, 'user')[stringNumber],
			jsonObject.users[i].objective
		);
		const deals = groupBy(jsonObject.deals, 'user')[stringNumber];
		const commissionPerDealArray = commissionPerDeal(deals, total);
		actualArrayOfCommission[i] = createDealsObject(
			deals,
			commissionPerDealArray
		);
	}
	return {
		deals: actualArrayOfCommission.flat(1),
	};
}
// calculates total commission per each month
function commissionPerMonth(arrayOfDeals, commissionPerDeal) {
	const months = getMonths(arrayOfDeals);
	let actualArrayOfCommission = Array(months.length).fill(0);
	arrayOfDeals.forEach((deal, index) => {
		for (let i = 0; i < months.length; i++) {
			if (deleteDayInDate(deal.payment_date) === months[i]) {
				actualArrayOfCommission[i] += commissionPerDeal[index];
			}
		}
	});
	return actualArrayOfCommission;
}

// creates an object for one persons commission
function createCommissionsObject(jsonObject, arrayOfDeals, commission) {
	const months = getMonths(arrayOfDeals);
	const id = jsonObject.id;
	const commissionArray = commissionPerMonth(arrayOfDeals, commission);
	let object = months.map((month, index) => ({
		[month]: commissionArray[index],
	}));
	return { user_id: id, commission: object };
}

// combine the commission objects of each user
function combineCommissionObjects(jsonObject) {
	const lengthOfUsers = jsonObject.users.length;
	let realArrayOfCommission = Array(lengthOfUsers).fill(0);
	for (let i = 0; i < lengthOfUsers; ++i) {
		const stringNumber = (i + 1).toString();
		const total = totalCommissionPerDeal(
			groupBy(jsonObject.deals, 'user')[stringNumber],
			jsonObject.users[i].objective
		);
		const user = jsonObject.users[i];
		const deals = groupBy(jsonObject.deals, 'user')[stringNumber];
		const commission = commissionPerDeal(deals, total);
		realArrayOfCommission[i] = createCommissionsObject(user, deals, commission);
	}
	return realArrayOfCommission;
}

// creates the final object
function finalObject(jsonObject) {
	const deals = combineDealsObjects(jsonObject);
	const commissions = combineCommissionObjects(jsonObject);
	return {
		commissions,
		deals,
	};
}

const finalAnswer = finalObject(object);
console.log(finalAnswer);
console.log(finalAnswer.deals);
console.log(finalAnswer.commissions[1]);
