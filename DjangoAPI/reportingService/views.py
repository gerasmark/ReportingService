from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.core.paginator import Paginator
from reportingService.models import Sensor, SensorReading
from reportingService.serializers import SensorSerializer, SensorReadingSerializer
import json

# Create your views here.

@csrf_exempt
def sensorReadings(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body = json.loads(body_unicode)
        type = body['type']
        location = body['location']
        time = body['time']
        sensorReadings = SensorReading.objects.all()
        sensor = Sensor.objects.all()
        if type:
            sensor = sensor.filter(type=type)
        if location:
            sensor = sensor.filter(location=location)
        sensor_ids = list(sensor.values_list('sensorId', flat=True))
        sensor_ids_list = list(sensor_ids)
        sensorReadings = sensorReadings.filter(sensorId__in=sensor_ids_list)    
        if time:
            sensorReadings = sensorReadings.filter(time=time)
        # serializer = SensorSerializer(sensor, many=True)
        serializer = SensorReadingSerializer(sensorReadings, many=True)
        # return JsonResponse(serializer.data, status=200, safe=False)
        return JsonResponse(serializer.data, status=200, safe=False)

    elif request.method == 'GET':
        sensorReadings = SensorReading.objects.all()
        serializer = SensorReadingSerializer(sensorReadings, many=True)
        page_size = 10
        page_number = 1
        paginator = Paginator(sensorReadings, page_size)
        page = paginator.get_page(page_number)
        serializer = SensorReadingSerializer(page, many=True)
        return JsonResponse(serializer.data, status=200, safe=False)
