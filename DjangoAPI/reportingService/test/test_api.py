from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from reportingService.models import SensorReading, Sensor  
from reportingService.views import sensorMetrics, sensorReadings  
from datetime import datetime, timedelta
# Create your tests here.

class SensorReadingViewTestCase(TestCase):
    def setUp(self):
        self.sensor = Sensor.objects.create(
            sensorId = 'intrasoft', 
            type = 'temperature', 
            location = 'Marousi', 
            vendorName = 'intrasoft', 
            vendorEmail = 'intrasoft@intrasoft.com', 
            description = 'Best sensosr!!!')
        self.sensor_reading_1 = SensorReading.objects.create(
            Id = '11111111',
            sensorId='intrasoft', 
            readingType='temperature', 
            readingValue=25.5,
            readingDate = '2023-01-01',
            description = 'I like temperature',
            time = '14:30:00'
            )
    def test_queries(self):
        client = APIClient()
        data = {
            'sensor_type': 'temperature',
            'location': 'Marousi',
            'time': '14:30:00',
        }
        response = client.post('/sensorReadings/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        print("hello")

    def tearDown(self):
        self.sensor_reading_1.delete()
        self.sensor.delete()