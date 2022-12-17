from aiogram import types

import config


def mainkb(user_id):
    kb = types.ReplyKeyboardMarkup(resize_keyboard=True)
    kb.row("💵 Оплата киви", "💵 Оплата картой")
    kb.row("⬅ На главную")


# INLINE
    # inline_kb_full = types.InlineKeyboardMarkup()
    # inline_kb_full.row(types.InlineKeyboardButton("❓ Эль Дракон Розадо ❓", callback_data="yes:" + str(user_id)))
    # inline_kb_full.row(types.InlineKeyboardButton("❓ Эль Рей Примо ❓", callback_data="no"))
    # inline_kb_full.row(types.InlineKeyboardButton("❓ Эль Рудо Примо ❓", callback_data="no"))
    # return inline_kb_full