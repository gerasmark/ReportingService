from django.test import SimpleTestCase
from django.urls import reverse, resolve
from reportingService import views

class TestUrls(SimpleTestCase):

    def test_sensorReadings_url(self):
        url = reverse('sensorReadings')
        self.assertEqual(resolve(url).func, views.sensorReadings)
    
    def test_sensorMetrics_url(self):
        url = reverse('sensorMetrics')
        self.assertEqual(resolve(url).func, views.sensorMetrics)
    
    def test_sensor_url(self):
        url = reverse('sensor')
        self.assertEqual(resolve(url).func, views.sensor)
    
    def test_sensorReading_url(self):
        url = reverse('sensorReading')
        self.assertEqual(resolve(url).func, views.sensorReading)
    
    def test_deleteSensorReading_url(self):
        url = reverse('deleteSensorReading')
        self.assertEqual(resolve(url).func, views.deleteSensorReading)
    
    def test_deleteSensor_url(self):
        url = reverse('deleteSensor')
        self.assertEqual(resolve(url).func, views.deleteSensor)

    def test_sensorStats_url(self):
        url = reverse('sensorStats')
        self.assertEqual(resolve(url).func, views.sensorStats)