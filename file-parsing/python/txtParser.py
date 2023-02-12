import sys

output = dict()
with open(sys.argv[1]) as file:
    input = file.read()
    lines = input.split("\n")
    for line in lines:
        key_val = line.split("=")
        key, val = key_val[0], key_val[1]
        try:
            val = float(val)
            rounded = int(val)
            if rounded == val:
                val = rounded
        except ValueError:
            pass
        try:
            if "," in val:
                val = val.split(",")
        except TypeError:
            pass
        
        output[key] = val

print(output)