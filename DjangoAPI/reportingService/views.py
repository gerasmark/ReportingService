from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import json
from reportingService.services.filterService import sensorMetricsService, sensorReadingService, sensorReadingServiceGet
from reportingService.services.SensorService import addSensorService
from reportingService.services.SensorReadingService import addSensorReadingService


# Create your views here.

@csrf_exempt
def sensorReadings(request):
    if request.method == 'POST':
        try:
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            result = sensorReadingService(body)
            return JsonResponse(result, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)
            
    elif request.method == 'GET':
        try:
            result = sensorReadingServiceGet(body)
            return JsonResponse(result, status=200, safe=False)
        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)
@csrf_exempt
def sensorMetrics(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            result = sensorMetricsService(body)
            return JsonResponse(result, status=200, safe=False)
    except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)
    
@csrf_exempt
def sensor(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            status = addSensorService(body)
            if status == 200:
                return JsonResponse({'message': 'Sensor created successfully'}, status=status, safe=False)
            else:
                return JsonResponse({'message': 'Error creating Sensor'}, status=status, safe=False)
    except Exception as e:
        return JsonResponse({'error_message': str(e)}, status=400, safe=False)

@csrf_exempt
def sensorReading(request):
    try:
        if request.method == 'POST':
            body_unicode = request.body.decode('utf-8')
            body = json.loads(body_unicode)
            status = addSensorReadingService(body)
            if status == 200:
                return JsonResponse({'message': 'Sensor Reading created successfully'}, status=status, safe=False)
            else:
                return JsonResponse({'message': 'Error creating Sensor Reading'}, status=status, safe=False)
    except Exception as e:
        return JsonResponse({'error_message': str(e)}, status=400, safe=False)