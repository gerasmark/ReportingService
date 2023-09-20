from django.urls import path
from reportingService import views

urlpatterns = [
    path('deleteSensor/<str:sensorId>/', views.deleteSensor, name='deleteSensor'),
    path('sensorReadings/', views.sensorReadings, name='sensorReadings'),
    path('sensorMetrics/', views.sensorMetrics, name='sensorMetrics'),
    path('sensor/', views.sensor, name='sensor'),
    path('sensorReading/', views.sensorReading, name='sensorReading'),
    path('deleteSensorReading/<str:Id>/', views.deleteSensorReading, name='deleteSensorReading'),
]