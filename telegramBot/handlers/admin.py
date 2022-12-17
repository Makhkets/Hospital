
import config

from main import dp, bot
from state.default_state import *
from keyboards.kb import *

import requests

import aiogram.utils.markdown as md
from aiogram import Bot, Dispatcher, types
from aiogram.contrib.fsm_storage.memory import MemoryStorage
from aiogram.dispatcher import FSMContext
from aiogram.dispatcher.filters import Text
from aiogram.dispatcher.filters.state import State, StatesGroup
from aiogram.types import ParseMode
from aiogram.utils import executor


@dp.message_handler(text="📕 Панель", state="*")
async def start(message: types.Message, state: FSMContext):
    await state.finish()
    if message.from_user.id in config.ADMINS:
        await message.answer_photo(
            photo="https://i.ibb.co/BC7h7ZP/image.png",
            caption=f"<b>Актуальный адрес админ панели:</b> - {config.BACKEND_URL}/admin/\n\nAPI V1 (SWAGGER) - {config.BACKEND_URL}/swagger/\nAPI V2 (REDOC) - {config.BACKEND_URL}/redoc/\n\nАктуальные данные для входа в админ панель:\nЛогин: <code>{config.login}</code>\nПароль: <code>{config.password}</code>"
        )
    else: await message.answer("❌ Обойти защиту не получилось :)")