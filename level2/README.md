# Level 2

## Basics
Each user has a name, an objective and an id (which will be used to reference the user in a deal).
Each deal has an amount and a user who closed the deal.

## Goal
We're trying to calculate the compensations of 2 users, knowing what deals they sold during the month.

## Commissioning

Your objective is to calculate the compensation of each user, knowing that they are commissioned as such:
- 5% of what they sell between 0% and 50% of their objective
- 10% of what they sell between 50% and 100% of their objective
- 15% of what they sell above their objective

## Example
Math's objective is 1000 euros and he sold a single deal worth 2000 euros.
He will be commissioned:
+ 5% * 500 => (between 0% and 50% of his objective)
+ 10% * 500 => (between 50% and 100% of his objective)
+ 15% * 1000 => (above his objective)

This means he will be commissioned 25 + 50 + 150 = 225 euros
