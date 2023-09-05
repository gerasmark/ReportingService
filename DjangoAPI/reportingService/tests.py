from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from reportingService.models import SensorReading, Sensor  
from reportingService.views import sensorMetrics, sensorReadings  
from datetime import datetime, timedelta
# Create your tests here.

class first(TestCase):
    def test(self):
        self.assertEqual(True, True)
    