from asyncio import constants
from email.policy import default
from tabnanny import verbose
from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model 

from loguru import logger as l

class CustomUser(AbstractUser):
    email = models.EmailField()
    username = models.CharField(
        max_length=150,
        unique=True,
        blank=True,
        null=True
    )
    is_confirmed = models.BooleanField(default=False)
    REQUIRED_FIELDS = [ "email", 'is_staff', "is_confirmed"]

    def __str__(self):
        return self.email

USER = get_user_model()

class Patient(models.Model):
    CHOICES = (
        ("Не выбрано", "Не выбрано"),
        ("Терапия", "Терапия"),
        ("Кардиология", "Кардиология"),
        ("Неврология", "Неврология"),
        ("Хирургическая", "Хирургическая"),
        ("Эндокринология", "Эндокринология"),
    )
    first_name = models.CharField(max_length=40, verbose_name="Имя")
    last_name = models.CharField(max_length=40, verbose_name="Фамилия")
    patronymic = models.CharField(max_length=40, verbose_name="Отчество")
    series = models.CharField(max_length=500, verbose_name="Cерия и Номер Паспорта")
    medical_number = models.CharField(max_length=500, verbose_name="Номер Мед. Полиса")
    branch = models.CharField(max_length=50, verbose_name="Отделение", choices=CHOICES)
    last_create = models.DateTimeField(auto_now_add=True, verbose_name="Последняя время добавления")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Добавлен")
    updated = models.DateTimeField(auto_now=True, verbose_name="Обновлен в")
    chamber = models.PositiveIntegerField(verbose_name="Палата", null=True, blank=True)

    doctor = models.ForeignKey(
        USER, 
        on_delete=models.PROTECT, 
        related_name="doctor",
        verbose_name="Добавил",
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} {self.patronymic}"


    class Meta:
        verbose_name = "Пациент"
        verbose_name_plural = "Пациенты"


class Visit(models.Model):
    phone = models.CharField(max_length=40, verbose_name="Номер телефона")
    visit_time = models.CharField(max_length=40, verbose_name="Время посещения")
    create_time = models.DateField(auto_now_add=True, verbose_name="Заявка создана в")
    update_time = models.DateTimeField(auto_now=True, verbose_name="Заявка обновлена в")
    solution = models.BooleanField(null=True, blank=True, verbose_name="Решение врача")
    
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, verbose_name="Пациент")

    def __str__(self) -> str:
        return self.phone

    class Meta:
        verbose_name = "Посетитель"
        verbose_name_plural = "Посетители"

class ActionHistory(models.Model):
    user = models.ForeignKey(Patient, on_delete=models.CASCADE, verbose_name="Пациент")
    action = models.TextField(verbose_name="Действие")
    created = models.DateTimeField(auto_now_add=True, verbose_name="Добавлен")

    def __str__(self):
        return self.action

    class Meta:
        verbose_name = "История действий"
        verbose_name_plural = "История действий"

class userProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="profile", 
                                                                    verbose_name="Пользователь")
    date_joined = models.DateTimeField(auto_now_add=True, verbose_name="Дата создания аккаунта")
    updated_on = models.DateTimeField(auto_now=True, verbose_name="Обновлен в")
    is_admin = models.BooleanField(default=False, verbose_name="Админ")

    def __str__(self):
        return self.user.username


        Console.WriteLine("Введите одну букву");
program(Console.ReadLine());


