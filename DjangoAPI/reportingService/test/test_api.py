from django.test import SimpleTestCase
from rest_framework.test import APIClient
from rest_framework import status
from reportingService.models import SensorReading, Sensor  
from reportingService.views import sensorMetrics, sensorReadings  
from datetime import datetime, timedelta
# Create your tests here.

class SensorReadingViewTestCase(SimpleTestCase):
    def test_sensorReadings(self):
        client = APIClient()
        data = {
             "type": "humidity",
            "location": "Ayalafurt",
            "time": ""
        }
        response = client.post('/sensorReadings/', data, format='json')
        print("response")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_sensorMetrics(self):
        client = APIClient()
        data = {
             "sensorId" : "16863"
        }
        response = client.post('/sensorMetrics/', data, format='json')
        print("response")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test1(self):
        self.assertEqual(True, True)