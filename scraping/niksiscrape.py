import requests
import re
import json
from bs4 import BeautifulSoup

url = 'https://www.pirkka.fi/niksit-ajax?page=4'

response = requests.get(url)
data = json.loads(response.text)

print('TOTAL', data['total'])

soup = BeautifulSoup(data['html'], 'html.parser')
# print(soup)

# For each niksi get
# 1. Title
# 2. Category
# 3. Niksi text

# Title
card_titles = [c.text.strip() for c in soup.find_all('h5', {'class': 'lifehack-card-title'})]
print(card_titles)

# Niksi text
hacks = [h.text.strip() for h in soup.find_all('div', {'class': 'lifehack-card-text'})]
# print(hacks)

# Categories
categories = [cat.text.strip() for cat in soup.select('div.lifehack-card-category a')]
# print(categories)
