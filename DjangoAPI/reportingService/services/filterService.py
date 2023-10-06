from reportingService.models import SensorReading, Sensor
from django.core.paginator import Paginator
from reportingService.serializers import SensorReadingSerializer
import pandas as pd

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
    ascending_sensor_values_list = unique(ascending_sensor_values_list)
    descending_sensor_values_list = sorted(sensor_values_list)
    descending_sensor_values_list = unique(descending_sensor_values_list)
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

def sensorStatsService(sensorId):
    sensorReadings = SensorReading.objects.all()
    sensorReadings = sensorReadings.filter(sensorId=sensorId).values()
    readings = pd.DataFrame(sensorReadings)
    readings.drop(columns=['Id', 'readingType', 'description'], inplace=True)
    readings['readingDate'] = pd.to_datetime(readings['readingDate'], format='%Y-%m-%d')
    readings['time'] = pd.to_datetime(readings['time'], format='%H:%M:%S')
    readings['year'] = readings['readingDate'].apply(lambda x : x.year)
    readings['month'] = readings['readingDate'].apply(lambda x : x.month)
    readings['day'] = readings['readingDate'].apply(lambda x : x.day)
    readings['weekday'] = readings['readingDate'].apply(lambda x : x.day_name())
    readings['weekofyear'] = readings['readingDate'].apply(lambda x : x.weekofyear)
    readings['hour'] = readings['time'].apply(lambda x : x.hour)
    readings['minute'] = readings['time'].apply(lambda x : x.minute)
    readings['season'] = readings['month'].apply(month2seasons)
    readings['timing'] = readings['hour'].apply(hours2timing)
    result = readings.to_json(orient='records')
    return result

def unique(list1):
    unique_list = []
    for x in list1:
        if x not in unique_list:
            unique_list.append(x)
    return unique_list

def month2seasons(x):
    if x in [12, 1, 2]:
        season = 'Winter'
    elif x in [3, 4, 5]:
        season = 'Spring'
    elif x in [6, 7, 8]:
        season = 'Summer'
    elif x in [9,10, 11]:
        season = 'Fall'
    return season

def hours2timing(x):
    if x in [22,23,0,1,2,3]:
        timing = 'Night'
    elif x in range(4, 12):
        timing = 'Morning'
    elif x in range(12, 17):
        timing = 'Afternoon'
    elif x in range(17, 22):
        timing = 'Evening'
    else:
        timing = 'X'
    return timing