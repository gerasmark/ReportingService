from django.test import TestCase, Client
from django.urls import reverse
from reportingService.models import Sensor, SensorReading
import json

class testViews(TestCase):

    def setUp(self):
        self.client = Client()
        sensor = Sensor.objects.create(
            sensorId = '000001', 
            type = 'temperature', 
            vendorName = 'test', 
            vendorEmail = 'nnheo@example.com', 
            description = 'test',
            location = 'Marousi'
        )
        self.sensorReading = SensorReading.objects.create(
            Id = '000001', 
            sensorId = '000001', 
            readingType = 'temperature', 
            readingValue = 20, 
            readingDate = '2015-01-01',
            description = 'test',
            time = '00:00:00'
        )

        SensorReading.objects.create(
            Id = '000002', 
            sensorId = '000001', 
            readingType = 'temperature', 
            readingValue = 20, 
            readingDate = '2015-01-01',
            description = 'test',
            time = '00:00:00'
        )
    def  test_sensorReadings_Get(self):
        response = self.client.get(reverse('sensorReadings'))
        self.assertEqual(response.status_code, 200)
        # self.assertTemplateUsed(resp)
        # response_data = json.loads(response.content.decode('utf-8'))
        # print(response_data)

    def test_sensorReadings200(self):
        data = {
            "type": "temperature",
            "location": "Marousi",
            "time": "00:00:00"
        }
        response = self.client.post('/sensorReadings/', json.dumps(data), content_type = 'json')
        # response_data = json.loads(response.content.decode('utf-8'))
        # print(response_data)
        self.assertEqual(response.status_code, 200)

    def test_sensorMetrics200(self):
        data = {
            'sensorId': '000001'
        }
        response = self.client.post('/sensorMetrics/', json.dumps(data), content_type = 'json')
        self.assertEqual(response.status_code, 200)

    def test_sensorReadings400(self):
        data = {
            "type": "humidity",
            "location": "Marousi",
            "year": "2015-01-01",
        }
        response = self.client.post('/sensorReadings/', json.dumps(data), content_type = 'json')
        self.assertEqual(response.status_code, 400)

    def test_sensorMetrics400(self):
        data = {
            'sensorId': '000002'
        }
        response = self.client.post('/sensorMetrics/', json.dumps(data), content_type = 'json')
        self.assertEqual(response.status_code, 400)