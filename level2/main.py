object = {
	'users': [
		{ 'id': 1, 'name': 'Nicolas', 'objective': 1000 },
		{ 'id': 2, 'name': 'Math', 'objective': 500 },
	],
	'deals': [
		{ 'id': 1, 'amount': 500, 'user': 1 },
		{ 'id': 2, 'amount': 1000, 'user': 2 },
		{ 'id': 3, 'amount': 800, 'user': 1 },
	],
}

# calculates commission given the total amount and their objective
def caluclate_commission(amount, objective):
    total = 0
    if amount > objective:
        total += (amount - objective) * 0.15
        total += (objective / 2) * 0.15
    elif amount > (objective / 2):
        total += (amount - objective / 2) * 0.1
        total += (objective / 2) * 0.05
    else:
        total += amount * 0.05
    return total

# calculates total amount generated for each salesperson
def total_amount(object):
    total_users = len(object['users'])
    total_amount_list = [0] * total_users
    for deal in object['deals']:
        total_amount_list[deal['user'] - 1] += deal['amount']
    return total_amount_list

# creates an array of commission
def create_commissions_list(object):
    total_amount_list = total_amount(object)
    commission_amount_list = [0] * len(total_amount_list)
    for i in range(len(total_amount_list)):
        commission_amount_list[i] += caluclate_commission(total_amount_list[i], object['users'][i]['objective'])
    return commission_amount_list

# converts input to the final output dictionary
def convert_to_dictionary(object):
    commission_list = create_commissions_list(object)
    dict = [{'user_id':i + 1 ,'commission': x} for i,x in enumerate(commission_list)]
    return {
        "commissions": dict
    }

print(convert_to_dictionary(object))
