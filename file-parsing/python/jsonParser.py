import sys
import json

with open(sys.argv[1]) as json_file:
    data = json.load(json_file)
print(data)