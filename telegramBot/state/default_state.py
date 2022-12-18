
from aiogram.dispatcher.filters.state import State, StatesGroup


class FindState(StatesGroup):
    q = State()

class VisitState(StatesGroup):
    q = State()

class PatientState(StatesGroup):
    q = State()