from django.test import SimpleTestCase
from rest_framework.test import APIClient
from rest_framework import status
from reportingService.models import SensorReading, Sensor  
from reportingService.views import sensorMetrics, sensorReadings  
from datetime import datetime, timedelta
# Create your tests here.

class SensorReadingViewTestCase(SimpleTestCase):
    def test_queries(self):
        client = APIClient()
        data = {
             "type": "humidity",
            "location": "Ayalafurt",
            "time": "08:56:32"
        }

        response = client.post('http://127.0.0.1:8000/sensorReadings/', data, format='json')
        print(response.json())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test1(self):
        self.assertEqual(True, True)