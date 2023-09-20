from django.urls import re_path
from reportingService import views

urlpatterns = [
    re_path('sensorReadings/', views.sensorReadings, name='sensorReadings'),
    re_path('sensorMetrics/', views.sensorMetrics, name='sensorMetrics'),
    re_path('addSensor/', views.addSensor, name='addSensor'),
]