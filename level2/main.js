const object = require('/Users/dustinstender/Downloads/serpentini - candidat/level2/data/input.json');

// calculates commission given the total amount and their objective
function computeCommission(amount, objective) {
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

// calculates total amount generated for each salesperson
function totalAmount(jsonFile) {
	const totalUsers = jsonFile.users.length;
	let totalAmountArray = Array(totalUsers).fill(0);
	jsonFile.deals.forEach((element) => {
		totalAmountArray[element.user - 1] += element.amount;
	});
	return totalAmountArray;
}

// creates an array of commission
function createCommissionArray(jsonFile) {
	let totalAmountArray = totalAmount(jsonFile);
	let commissionAmountArray = Array(totalAmountArray.length).fill(0);
	// console.log(jsonFile.users[0].objective);
	for (let i = 0; i < totalAmountArray.length; ++i) {
		commissionAmountArray[i] += computeCommission(
			totalAmountArray[i],
			jsonFile.users[i].objective
		);
	}
	return commissionAmountArray;
}

// converts input to the final output object
function convertToObject(input) {
	const commissionArray = createCommissionArray(input);
	const object = commissionArray.map((person, index) => ({
		user_id: input.users[index].id,
		commission: person,
	}));
	return {
		commissions: object,
	};
}
console.log(convertToObject(object));
