from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from reportingService.models import Sensor, SensorReading
from reportingService.serializers import SensorSerializer, SensorReadingSerializer

# Create your views here.

@csrf_exempt
def sensorReadings(request):
    # if request.method == 'POST':
    #     data = JSONParser().parse(request)
    #     serializer = SensorReadingSerializer(data=data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return JsonResponse(serializer.data, status=201)
    #     else:
    #         return JsonResponse(serializer.errors, status=400)
    # else:
    #     return JsonResponse(status=405)
    if request.method == 'GET':
        sensorReadings = SensorReading.objects.all()
        serializer = SensorReadingSerializer(sensorReadings, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
