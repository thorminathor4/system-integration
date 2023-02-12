import sys
import xmltodict

with open(o, 'r', encoding='utf-8') as file:
    input = file.read()

output = xmltodict.parse(input)

print(output)