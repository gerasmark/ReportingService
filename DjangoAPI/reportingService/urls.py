from django.urls import re_path
from reportingService import views

urlpatterns = [
    re_path('sensorReadings/', views.sensorReadings, name='sensorReadings'),
]