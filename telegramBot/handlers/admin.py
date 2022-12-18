
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


@dp.message_handler(text="👥 Посетители", state="*")
async def start(message: types.Message, state: FSMContext):
    await state.finish()
    if message.from_user.id in config.ADMINS:
        try:
            response = requests.get(config.BACKEND_URL + "/auth/visitor/").json()
            if response:
                for data in response:
                    patient = data['patient']
                    patient_response = requests.get(config.BACKEND_URL + f"/auth/patients/{patient}/").json()
                    text = f"""
ФИО Пациента: <code>{patient_response['first_name']} {patient_response['last_name']} {patient_response['patronymic']}</code>
Отделение: <code>{patient_response['branch']}</code>
Палата: <code>{patient_response['chamber']}</code>
Мед. Полис: <code>{patient_response['medical_number']}</code>
Серия и номер паспорта: <code>{patient_response['series']}</code>

Телефон для связи: <code>{data['phone']}</code>
Время желаемого посещения пациента: <code>{data['visit_time']}</code>
"""

                    inline_kb_full = types.InlineKeyboardMarkup()
                    inline_kb_full.row(types.InlineKeyboardButton("✅ Принять", callback_data=f"yes_patient:{data['id']}"), 
                                        types.InlineKeyboardButton("❌ Отклонить", callback_data=f"cancel_patient:{data['id']}"))
                    await message.answer_photo(
                        photo="https://www.meme-arsenal.com/memes/723c78e9be76eba2598c2d4c611f994c.jpg",
                        caption=text,
                        reply_markup=inline_kb_full,
                    )
            else: message.answer("❌ Не удалось получить .json() с сервера")
        except Exception as ex: await message.answer("❌ Произошла неизвестная ошибка: " + str(ex))
    else: await message.answer("❌ Обойти защиту не получилось :)")

 #  password: admin | username: admin

@dp.callback_query_handler(text_startswith="yes_patient", state="*")
async def find(call: types.CallbackQuery, state: FSMContext):
    ID = call.data.split(":")[1]
    try:
        response = requests.post(config.BACKEND_URL + "/auth/jwt/create/", data={
            "password": config.password,
            "username": config.login,
        }) \
            .json()
        JWT = response["access"]
        answer = requests.patch(config.BACKEND_URL + f"/auth/visitor/{ID}/", headers={
            "Authorization": "JWT " + JWT,
        }, data={
            "solution": True,
        }) \
            .json()
        if answer:
            await call.message.delete()
            await call.answer("✅ Успешно")
    except Exception as ex: await call.answer("❌ Произошла ошибка, попробуйте еще раз по позже! " + str(ex)) 

@dp.callback_query_handler(text_startswith="cancel_patient", state="*")
async def find(call: types.CallbackQuery, state: FSMContext):
    ID = call.data.split(":")[1]
    try:
        response = requests.post(config.BACKEND_URL + "/auth/jwt/create/", data={
            "password": config.password,
            "username": config.login,
        }) \
            .json()
        JWT = response["access"]
        answer = requests.patch(config.BACKEND_URL + f"/auth/visitor/{ID}/", headers={
            "Authorization": "JWT " + JWT,
        }, data={
            "solution": False,
        }) \
            .json()
        if answer:
            await call.answer("✅ Успешно")
            await call.message.delete()
    except Exception as ex: await call.answer("❌ Произошла ошибка, попробуйте еще раз по позже! " + str(ex))



@dp.message_handler(text="➕ Добавить пациента", state="*")
async def start(message: types.Message, state: FSMContext):
    await state.finish()
    if message.from_user.id in config.ADMINS:
        text = """
<b>Для добавление пациента в базу заполните следующую форму:</b>
<code>1. ФИО Пациента
2. Серие и номер паспорта
3. Мед. Полис
4. Отдел (Терапия, Кардиология, Неврология, Хирургическая, Эндокринология)</code>

<b>Пример добавления пациента:</b>
<code>Александров Алексей Александрович
37 24 2024512
492199240201
Терапия</code>
"""
        await message.answer_photo(
            photo="https://thumbs.dreamstime.com/b/%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%8B%D0%B9-%D0%BD%D0%B5%D0%BE%D0%BD%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BA%D1%80%D0%B5%D1%81%D1%82-%D0%BD%D0%B0-%D1%87%D0%B5%D1%80%D0%BD%D0%BE%D0%BC-%D1%84%D0%BE%D0%BD%D0%B5-%D0%BE%D0%B4%D0%B8%D0%BD-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82-%D0%B7%D0%BD%D0%B0%D0%BA-%D0%BF%D0%BB%D1%8E%D1%81-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-222454480.jpg",
            caption=text
        )
        await PatientState.q.set()
    else: await message.answer("❌ Обойти защиту не получилось :)")


@dp.message_handler(state=PatientState.q)
async def start(message: types.Message, state: FSMContext):
    try:
        FIRST_NAME = message.text.split("\n")[0].split(" ")[1]
        LAST_NAME = message.text.split("\n")[0].split(" ")[0]
        PATRONYMIC = message.text.split("\n")[0].split(" ")[-1]
        SERIES = message.text.split("\n")[1]
        MEDICAL = message.text.split("\n")[2]
        BRANCH = message.text.split("\n")[3]


        response = requests.post(config.BACKEND_URL + "/auth/jwt/create/", data={
            "password": config.password,
            "username": config.login,
        }) \
            .json()
        JWT = response["access"]
        print(JWT)
        answer = requests.post(config.BACKEND_URL + "/auth/patients/", headers={
            "Authorization": "JWT " + JWT,
        }, data={
            "branch": BRANCH,
            "doctor": "1",
            "first_name": FIRST_NAME,
            "last_name": LAST_NAME,
            "medical_number": MEDICAL,
            "patronymic": PATRONYMIC,
            "series": SERIES,
        }) \
            # .json()
        print(FIRST_NAME, LAST_NAME, PATRONYMIC)
        print(SERIES, MEDICAL, BRANCH)
        if answer:
            await message.delete()
            await message.answer("✅ Успешно добавлен пациент.")

    except Exception as ex: await message.answer("❌ Ошибка сети: " + str(ex))
    await state.finish()