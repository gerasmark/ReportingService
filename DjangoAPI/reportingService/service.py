from reportingService.models import SensorReading, Sensor
from django.core.paginator import Paginator
from reportingService.serializers import SensorReadingSerializer

def sensorMetricsService(body):
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
    result = {'mean': mean_value,
              'min': min_value,
              'max': max_value,
              'range': range,
              'maxValues': ascending_sensor_values_list,
              'minValues': descending_sensor_values_list}
    return result

def sensorReadingService(body):
    type = body['type']
    location = body['location']
    time = body['time']
    pageNumber = body['pageNumber']
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
    sensorReadings = sensorReadings.order_by('-Id')
    page_size = 10
    paginator = Paginator(sensorReadings, page_size)
    page = paginator.get_page(pageNumber)
    serializer = SensorReadingSerializer(page, many=True)
    result = serializer.data
    return result

def sensorReadingServiceGet(body):
    sensorReadings = SensorReading.objects.all()
    sensorReadings = sensorReadings.order_by('-Id')
    serializer = SensorReadingSerializer(sensorReadings, many=True)
    page_size = 10
    page_number = 1
    paginator = Paginator(sensorReadings, page_size)
    page = paginator.get_page(page_number)
    serializer = SensorReadingSerializer(page, many=True)
    result = serializer.data
    return result

