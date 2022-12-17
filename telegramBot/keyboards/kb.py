from aiogram import types

import config


def mainkb(user_id):
    kb = types.ReplyKeyboardMarkup(resize_keyboard=True)
    kb.row("🕐 Записаться к пациенту")
    kb.row("ℹ Информация", "📗 Статистика")
    kb.row("🖥 Отделения", "🧑 Пациенты")
    kb.row("🔍 Поиск", "👨‍⚕️ Врачи")
    if user_id in config.ADMINS:
        kb.row("👥 Посетители", "📕 Панель")
        kb.row("➕ Добавить пациента")
    return kb

def department():
    inline_kb_full = types.InlineKeyboardMarkup()
    inline_kb_full.row(types.InlineKeyboardButton("Эндокринология", callback_data="endocrinology"), 
                        types.InlineKeyboardButton("Терапия", callback_data="therapy"))
    inline_kb_full.row(types.InlineKeyboardButton("Кардиология", callback_data="cardiology"), 
                        types.InlineKeyboardButton("Неврология", callback_data="neurology")) 
    inline_kb_full.row(types.InlineKeyboardButton("Хирургическая", callback_data="surgical"))
    return inline_kb_full


# Информация
# Статистика
# Отделения
# Поиск
# Панель

####

# Пациенты
# Врачи
# Посетители
# Добавить пациента