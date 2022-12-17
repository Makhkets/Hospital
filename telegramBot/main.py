from loader import *

from handlers.user import *
from handlers.admin import *

if __name__ == "__main__":
	executor.start_polling(dp)