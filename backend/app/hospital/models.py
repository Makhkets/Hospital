from asyncio import constants
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



class userProfile(models.Model):
    user = models.OneToOneField(CustomUser,on_delete=models.CASCADE,related_name="profile")
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
    is_admin = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username