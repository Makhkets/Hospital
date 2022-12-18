from django.contrib import admin

from .models import ActionHistory, userProfile, \
                    CustomUser, Patient, Visit, Service

class PatientAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'first_name', 'last_name',
        'patronymic', 'series', 'medical_number',
        'branch', 'updated', 'chamber'
    )
    search_fields = (
        'id', 'first_name', 'last_name',
        'patronymic', 'series', 'medical_number',
        'branch', 'last_create', 'updated', 'created', 'chamber'
    )
    list_filter = ('last_create', 'updated', 'created')


class ActionHistoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'action', 'created')
    search_fields = ('id', 'user', 'action')
    list_filter = ('action', 'created')

class VisitAdmin(admin.ModelAdmin):
    list_display = (
        'id', 'phone', 'visit_time',
        'solution', 'update_time'
    )
    search_fields = (
        'phone', 'solution'
    )
    list_filter = (
        'visit_time', 'create_time',
        'update_time', 'solution'
    )

class CustomUserAdmin(admin.ModelAdmin):
    list_display = (
        "pk", "email", "username",
        "first_name", "last_name",
        "is_confirmed", "is_staff"
    )

class ServiceAdmin(admin.ModelAdmin):
    list_display = (
        "user", "price",
        "whatsapp", "telegram",
    )

admin.site.register(Patient, PatientAdmin)
admin.site.register(ActionHistory, ActionHistoryAdmin)
admin.site.register(Visit, VisitAdmin)
admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Service, ServiceAdmin)
