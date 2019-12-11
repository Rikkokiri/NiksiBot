import requests
import re
import json
from bs4 import BeautifulSoup

# There are 4072 pages of niksit, so something like 40 000+ niksi

url = 'https://www.pirkka.fi/niksit-ajax?page={}'
page = 1
niksiList = []

while True:
	response = requests.get(url.format(page))
	response_data = json.loads(response.text)

	page += 1

	if('html' not in response_data):
		print('Empty page')
		continue

	if(response_data['html'] == '\n'):
		print('Last page!')
		break

	# page = response_data['nextPage']

	# For each niksi get
	# 1. Title
	# 2. Category
	# 3. Niksi text

	soup = BeautifulSoup(response_data['html'], 'html.parser')

	# Title
	titles = [c.text.strip() for c in soup.find_all('h5', {'class': 'lifehack-card-title'})]

	# Niksi text
	hacks = [h.text.strip() for h in soup.find_all('div', {'class': 'lifehack-card-text'})]

	# Categories
	categories = [cat.text.strip() for cat in soup.select('div.lifehack-card-category a')]

	# Turn data into 'objects' that can be stored in JSON file
	for (title, cat, hack) in list(zip(titles, categories, hacks)):
		niksi = {'title': title, 'category': cat, 'text': hack}
		niksiList.append(niksi)

	parseCount = len(niksiList)
	percentage = round(parseCount / (4072 * 11) * 100, 2) 
	print('Page {}: {} niksis parsed, (approximately {} %% of all data)'.format(page-1, parseCount, percentage))

# Write the retrieved data to a JSON file
with open('niksidata.json', 'w') as outfile:
	json.dump(niksiList, outfile, ensure_ascii=False)

