import sys
import yaml

with open(sys.argv[1], "r") as stream:
    try:
        print(yaml.safe_load(stream))
    except yaml.YAMLError as error:
        print(error)