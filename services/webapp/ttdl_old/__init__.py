import os
import sys


def update_path(app='webapp'):
    try:
        # add thu muc vao sys path
        lib_path = os.path.abspath(os.path.join(app))
        if lib_path not in sys.path:
            sys.path.append(lib_path)
    except:
        pass


update_path()
