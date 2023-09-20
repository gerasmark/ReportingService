from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
import json
from reportingService.service import sensorMetricsService, sensorReadingService, sensorReadingServiceGet

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
            print(body)
            result = sensorMetricsService(body)
            print(result)
            return JsonResponse(result, status=200, safe=False)
    except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=400, safe=False)