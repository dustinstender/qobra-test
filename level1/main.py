input = {
	"users": [
		{ "id": 1, "name": 'Nicolas' },
		{ "id": 2, "name": 'Math' },
	],
	"deals": [
		{ "id": 1, "amount": 500, "user": 1 },
		{ "id": 2, "amount": 1000, "user": 2 },
		{ "id": 3, "amount": 800, "user": 1 },
		{ "id": 4, "amount": 1000, "user": 2 },
		{ "id": 5, "amount": 300, "user": 2 },
		{ "id": 6, "amount": 300, "user": 2 },
	],
}

# calculates the commission
def commute_commission(original_object):
    total_users = len(original_object['users'])
    total_amount_list = [0] * total_users
    total_sales_list = [0] * total_users
    for deal in original_object['deals']:
        total_amount_list[deal['user'] - 1] += deal['amount']
        total_sales_list[deal['user'] - 1] += 1
    commission_list = [0] * total_users
    for i in range(total_users):
        if total_sales_list[i] < 3:
            commission_list[i] += total_amount_list[i] * 0.1
        else:
            commission_list[i] += total_amount_list[i] * 0.2
        if total_amount_list[i] > 2000:
            commission_list[i] += 500
    return commission_list

# converts to the output dictionary
def convert_to_dictionary(original_object):
    commission_list = commute_commission(original_object)
    dict = [{'user_id':i + 1 ,'commission': x} for i,x in enumerate(commission_list)]
    return {
        "commissions": dict
    }

print(convert_to_dictionary(input))
