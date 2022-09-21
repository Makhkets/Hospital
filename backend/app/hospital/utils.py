from .models import USER, Patient

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
                data["doctor"] = USER.objects.get(pk=data["doctor"])
                return Patient.objects.create(**data, chamber=counter)
    else: return "Нет мест"