from django.test import TestCase, Client
from django.urls import reverse
from reportingService.models import *
import json

class testViews(TestCase):

    def setUp(self):
        


    def  test_sensorReadings_Get(self):
        client = Client()

        response = client.get(reverse('sensorReadings'))
        self.assertEqual(response.status_code, 200)

        # self.assertTemplateUsed(resp)
        response_data = json.loads(response.content.decode('utf-8'))
        print(response_data)