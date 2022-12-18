from .models import USER, Patient, CustomUser

from pprint import pprint
from loguru import logger as l

def patient_check(data):
    '''
     Проверка, есть ли пользователь. Если есть то обновляем его
     '''
    try:
        patient = Patient.objects.get(medical_number=data["medical_number"])
        patient.branch = data["branch"]
        patient.doctor = USER.objects.get(pk=data["doctor"])
        patient.first_name = data["first_name"]
        patient.save()
        return patient
    except:
        return False
    

def patient_create(data):
    '''
    Создаем Пациента проверяя есть ли свободные палаты
    '''
    p = Patient.objects.filter(branch=data["branch"])
    if data["branch"] == "Не выбрано": return "Не выбрали отделение"
    if p.count() < 50: 
        for counter in range(1, 32):
            if Patient.objects.filter(chamber=counter, branch=data["branch"]).count() < 3:
                
                BRANCH = data.get("branch")
                FIRST_NAME = data.get("first_name")
                LAST_NAME = data.get("last_name")
                MEDICAL_NUMBER = data.get("medical_number")
                PATRONYMIC = data.get("patronymic")
                SERIES = data.get("series")
                DOCTOR = USER.objects.get(pk=data.get("doctor"))
                
                return Patient.objects.create(
                    branch=BRANCH, first_name=FIRST_NAME, last_name=LAST_NAME,
                    medical_number=MEDICAL_NUMBER, patronymic=PATRONYMIC, series=SERIES,
                    doctor=DOCTOR,
                    chamber=counter,
                )
    else: return "Нет мест"