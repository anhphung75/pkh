import os
import sys

# add thu muc vao sys path
lib_path = os.path.abspath(os.path.join("web"))
if lib_path not in sys.path:
    sys.path.append(lib_path)
