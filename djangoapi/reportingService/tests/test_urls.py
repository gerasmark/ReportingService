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