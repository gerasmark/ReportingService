from django.shortcuts import render
from django.view.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from reportingService.models import Sensor, SensorReading
from reportingService.serializers import SensorSerializer, SensorReadingSerializer

# Create your views here.

@csrf_exempt
def get_sensors(request):
    