# Generated by Django 4.1.1 on 2022-09-18 20:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hospital', '0003_patient_doctor'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='patient',
            name='doctor',
        ),
    ]