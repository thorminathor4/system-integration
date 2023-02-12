import sys
import csv

output = []
with open(sys.argv[1]) as file:
    for entry in csv.DictReader(file):
        output.append(entry)
print(output)