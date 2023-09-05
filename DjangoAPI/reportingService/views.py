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
        try:
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
            # return JsonResponse(serializer.data, status=200, safe=False)
            page_size = 10
            page_number = 1
            paginator = Paginator(sensorReadings, page_size)
            page = paginator.get_page(page_number)
            serializer = SensorReadingSerializer(page, many=True)
            return JsonResponse(serializer.data, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)
            
    elif request.method == 'GET':
        try:
            sensorReadings = SensorReading.objects.all()
            serializer = SensorReadingSerializer(sensorReadings, many=True)
            page_size = 10
            page_number = 1
            paginator = Paginator(sensorReadings, page_size)
            page = paginator.get_page(page_number)
            serializer = SensorReadingSerializer(page, many=True)
            return JsonResponse(serializer.data, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)
@csrf_exempt
def sensorMetrics(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            sensorId = body['sensorId']
            sensorReadings = SensorReading.objects.all()
            sensorReadings = sensorReadings.filter(sensorId=sensorId)
            sensor_values = list(sensorReadings.values_list('readingValue', flat=True))
            sensor_values_list = list(sensor_values)
            mean_value = round(sum(sensor_values_list)/len(sensor_values_list), 2)
            min_value = min(sensor_values_list)
            max_value = max(sensor_values_list)
            ascending_sensor_values_list = sorted(sensor_values_list,reverse=True)
            descending_sensor_values_list = sorted(sensor_values_list)
            ascending_sensor_values_list = ascending_sensor_values_list[:10]
            descending_sensor_values_list = descending_sensor_values_list[:10]
            range = round(max_value - min_value, 2)
            result = {'mean': mean_value,'min': min_value,'max': max_value, 'range': range, '10 maximum recorded values': ascending_sensor_values_list, '10 minimum recorded values': descending_sensor_values_list}

            return JsonResponse(result, status=200, safe=False)
    except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)