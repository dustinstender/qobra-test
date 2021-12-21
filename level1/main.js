const input = require('./data/input.json');

// calculates the commission
function computeCommission(jsonFile) {
	const totalUsers = jsonFile.users.length;
	let totalAmountArray = Array(totalUsers).fill(0);
	let totalSalesArray = Array(totalUsers).fill(0);
	jsonFile.deals.forEach((element) => {
		totalAmountArray[element.user - 1] += element.amount;
		totalSalesArray[element.user - 1] += 1;
	});
	let commissionArray = Array(totalUsers).fill(0);
	for (let i = 0; i < totalUsers; ++i) {
		totalSalesArray[i] < 3
			? (commissionArray[i] += totalAmountArray[i] * 0.1)
			: (commissionArray[i] += totalAmountArray[i] * 0.2);
		if (totalAmountArray[i] > 2000) {
			commissionArray[i] += 500;
		}
	}
	return commissionArray;
}

// converts to the output object
function convertToObject(input) {
	const array = computeCommission(input);
	const object = array.map((person, index) => ({
		user_id: input.users[index].id,
		commission: person,
	}));
	return {
		commissions: object,
	};
}

console.log(convertToObject(input));
