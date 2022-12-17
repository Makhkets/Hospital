
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

@dp.message_handler(text="/start")
async def start(message: types.Message, state: FSMContext):
    text = f"Добрый день, <code>{message.from_user.first_name}</code> Мы рады приветствовать Вас в чат-боте госпиталя\n<b>«MD HELPER»!</b>\n\nДля выбора интересующего вас раздела воспользуйтесь кнопками из меню ниже 👇\n\n👁 Если вы не видите внизу кнопки меню, нажмите квадрат с 4-мя точкам правее окна ввода сообщений. ✉"
    await message.answer_photo(photo="https://thumbs.dreamstime.com/b/%D0%B7%D0%B5-%D0%B5%D0%BD%D0%B0%D1%8F-%D0%B1%D0%BE-%D1%8C%D0%BD%D0%B8%D1%86%D0%B0-%D0%B2-%D0%B0%D0%B1%D1%83-%D0%B4%D0%B0%D0%B1%D0%B8-82730118.jpg",
                               caption=text,
                               reply_markup=mainkb(message.from_user.id))

@dp.message_handler(text="ℹ Информация")
async def info(message: types.Message, state: FSMContext):
    text = f"""
<b>Государственное бюджетное учреждение «Клиническая больница №4 г. Грозного».</b>

Адрес: <code>Социалистическая ул., 4, Грозный, Чеченская Респ., 364030</code>

Часы работы: 
<code>суббота	Закрыто
воскресенье	Закрыто
понедельник	09:00–18:00
вторник	09:00–18:00
среда	09:00–18:00
четверг	09:00–18:00
пятница	09:00–18:00</code>

Номер телефона: <code>8 (871) 222-22-47</code>
"""
    await message.answer_photo(photo="https://i.pinimg.com/564x/ca/a5/1b/caa51b565cb636d5c312a835dfbc1655.jpg",
                               caption=text,
                               reply_markup=mainkb(message.from_user.id))

@dp.message_handler(text="📗 Статистика")
async def statistic(message: types.Message, state: FSMContext):
    try:
        response = requests.get(config.BACKEND_URL + "/auth/statistic").json()
        text = f"""
Всего врачей —— <code>{response["doctors"]}</code>
Всего пациентов —— <code>{response["patients"]}</code>
Всего отчетов —— <code>{response["actions"]}</code>

Пациентов в Терапии —— <code>{response["therapy"]}</code>
Пациентов в Кардиологии —— <code>{response["cardiology"]}</code>
Пациентов в Нервология —— <code>{response["neurology"]}</code>
Пациентов в Хирургии —— <code>{response["surgical"]}</code>
Пациентов в Эндокринологии —— <code>{response["endocrinology"]}</code>
"""
        await message.answer_photo(photo="https://i.pinimg.com/564x/e0/a0/9a/e0a09ad65424251fff4b5a4b2243bf34.jpg",
                                caption=text,
                                reply_markup=mainkb(message.from_user.id))
    except Exception as ex: await message.answer("❌ Ошибка сети: " + str(ex))

@dp.message_handler(text="🖥 Отделения")
async def otdel(message: types.Message, state: FSMContext):
    await message.answer_photo(
        photo="https://i.pinimg.com/564x/16/31/df/1631df84620572e643faca266bca8787.jpg",
        caption="Выберите интересующее отделение:",
        reply_markup=department(),
    )


@dp.callback_query_handler(text_startswith="endocrinology", state="*")
async def endocrinology(call: types.CallbackQuery, state: FSMContext):
    try:
        await call.message.delete()
        response = requests.get(config.BACKEND_URL + config.URLS["endocrinology"]).json()
        if response:
            text = "<code>Эндокриноло́гия — наука о строении и функции желёз внутренней секреции, вырабатываемых ими продуктах, о путях их образования и действия на организм животных и человека; а также о заболеваниях, вызванных нарушением функции этих желёз или действиями этих гормонов.</code>\n\n"
            for data in response:
                text += f"ID: <code>{data['id']}</code> ; <b>{data['first_name']} {data['last_name']} {data['patronymic']}</b>\n"
            inline_kb_full = types.InlineKeyboardMarkup()
            inline_kb_full.row(types.InlineKeyboardButton("⚙ Подробнее об пациенте", callback_data=f"find"))
            await call.message.answer_photo(photo="https://i.pinimg.com/564x/36/67/f1/3667f10628d1aa579bb8d4f39fd7928f.jpg",
                                            caption=text,
                                            reply_markup=inline_kb_full)
        else:
            await call.answer("❌ Пусто, людей в данном отделении нет")
    except Exception as ex: await call.message.answer("❌ Ошибка сети: " + str(ex))

@dp.callback_query_handler(text_startswith="therapy", state="*")
async def therapy(call: types.CallbackQuery, state: FSMContext):
    try:
        await call.message.delete()
        response = requests.get(config.BACKEND_URL + config.URLS["therapy"]).json()
        if response:
            text = "<code>процесс, целью которого является устранение заболевания или травмы, патологического состояния или иного нарушения жизнедеятельности, нормализация нарушенных процессов жизнедеятельности, восстановление и улучшение здоровья.</code>\n\n"
            for data in response:
                text += f"ID: <code>{data['id']}</code> ; <b>{data['first_name']} {data['last_name']} {data['patronymic']}</b>\n"
            inline_kb_full = types.InlineKeyboardMarkup()
            inline_kb_full.row(types.InlineKeyboardButton("⚙ Подробнее об пациенте", callback_data=f"find"))
            await call.message.answer_photo(photo="https://i.pinimg.com/564x/36/67/f1/3667f10628d1aa579bb8d4f39fd7928f.jpg",
                                            caption=text,
                                            reply_markup=inline_kb_full)
        else:
            await call.answer("❌ Пусто, людей в данном отделении нет")
    except Exception as ex: await call.message.answer("❌ Ошибка сети: " + str(ex))

@dp.callback_query_handler(text_startswith="cardiology", state="*")
async def cardiology(call: types.CallbackQuery, state: FSMContext):
    try:
        await call.message.delete()
        response = requests.get(config.BACKEND_URL + config.URLS["cardiology"]).json()
        if response:
            text = "<code>Кардиоло́гия — обширный раздел медицины, занимающийся изучением сердечно-сосудистой системы человека: строения и развития сердца и сосудов, их функций, а также заболеваний, включая изучение причин их возникновения, механизмов развития, клинических проявлений, вопросов диагностики, а также разработку эффективных методов</code>\n\n"
            for data in response:
                text += f"ID: <code>{data['id']}</code> ; <b>{data['first_name']} {data['last_name']} {data['patronymic']}</b>\n"
            inline_kb_full = types.InlineKeyboardMarkup()
            inline_kb_full.row(types.InlineKeyboardButton("⚙ Подробнее об пациенте", callback_data=f"find"))
            await call.message.answer_photo(photo="https://i.pinimg.com/564x/36/67/f1/3667f10628d1aa579bb8d4f39fd7928f.jpg",
                                            caption=text,
                                            reply_markup=inline_kb_full)
        else:
            await call.answer("❌ Пусто, людей в данном отделении нет")
    except Exception as ex: await call.message.answer("❌ Ошибка сети: " + str(ex))

@dp.callback_query_handler(text_startswith="neurology", state="*")
async def neurology(call: types.CallbackQuery, state: FSMContext):
    try:
        await call.message.delete()
        response = requests.get(config.BACKEND_URL + config.URLS["neurology"]).json()
        if response:
            text = "<code>группа медико-биологических научных дисциплин, которая изучает нервную систему как в норме, так и в патологии[1]. Занимается вопросами возникновения заболеваний центральной и периферической частей нервной системы, а также изучает механизмы их развития, симптоматику и возможные способы диагностики, лечения и профилактики[2].</code>\n\n"
            for data in response:
                text += f"ID: <code>{data['id']}</code> ; <b>{data['first_name']} {data['last_name']} {data['patronymic']}</b>\n"
            inline_kb_full = types.InlineKeyboardMarkup()
            inline_kb_full.row(types.InlineKeyboardButton("⚙ Подробнее об пациенте", callback_data=f"find"))
            await call.message.answer_photo(photo="https://i.pinimg.com/564x/36/67/f1/3667f10628d1aa579bb8d4f39fd7928f.jpg",
                                            caption=text,
                                            reply_markup=inline_kb_full)
        else:
            await call.answer("❌ Пусто, людей в данном отделении нет")
    except Exception as ex: await call.message.answer("❌ Ошибка сети: " + str(ex))

@dp.callback_query_handler(text_startswith="surgical", state="*")
async def surgical(call: types.CallbackQuery, state: FSMContext):
    try:
        await call.message.delete()
        response = requests.get(config.BACKEND_URL + config.URLS["surgical"]).json()
        if response:
            text = "<code>область медицины, изучающая острые и хронические заболевания, которые лечат при помощи оперативного (хирургического) метода[1].</code>\n\n"
            for data in response:
                text += f"ID: <code>{data['id']}</code> ; <b>{data['first_name']} {data['last_name']} {data['patronymic']}</b>\n"
            inline_kb_full = types.InlineKeyboardMarkup()
            inline_kb_full.row(types.InlineKeyboardButton("⚙ Подробнее об пациенте", callback_data=f"find"))
            await call.message.answer_photo(photo="https://i.pinimg.com/564x/36/67/f1/3667f10628d1aa579bb8d4f39fd7928f.jpg",
                                            caption=text,
                                            reply_markup=inline_kb_full)
        else:
            await call.answer("❌ Пусто, людей в данном отделении нет")
    except Exception as ex: await call.message.answer("❌ Ошибка сети: " + str(ex))


@dp.callback_query_handler(text_startswith="find", state="*")
async def find(call: types.CallbackQuery, state: FSMContext):
    await call.message.answer("Введите один из пунктов, чтобы найти информацию о пациентах:\n\n1. ID\n2. Мед. Полис")
    await call.message.delete()
    await FindState.q.set()

@dp.message_handler(text="🔍 Поиск", state="*")
async def qstate(message: types.Message, state: FSMContext):
    await message.answer("Введите один из пунктов, чтобы найти информацию о пациентах:\n\n1. ID\n2. Мед. Полис")
    await message.delete()
    await FindState.q.set()

@dp.message_handler(state=FindState.q)
async def qstate(message: types.Message, state: FSMContext):
    try:
        response = requests.get(config.BACKEND_URL + f"/auth/patients/{message.text}/medical/").json()
        if response:
            text = f"ID: <b>{response['id']}</b>\n\nФИО: <code>{response['first_name']} {response['last_name']} {response['patronymic']}</code>\n\nСерия и номер паспорта: <code>{response['series']}</code>\nМед. Полис: <code>{response['medical_number']}</code>\n\nПалата: <code>{response['chamber']}</code>\nОтделение: <code>{response['branch']}</code>"
            await message.answer_photo(photo="https://ichef.bbci.co.uk/news/640/cpsprodpb/151DF/production/_102759468_gettyimages-818784450.jpg",
                                       caption=text)
        else: message.answer("❌ Ошибка сети")
    except Exception as ex: await message.answer("❌ Ошибка сети: " + str(ex))
    await state.finish()
