from reportingService.models import SensorReading, Sensor

def addSensorReadingService(body):
    database_sensor_reading = SensorReading.objects.all()
    sensor_reading = SensorReading(
        Id=body['Id'],
        sensorId=body['sensorId'],
        readingType=body['readingType'],
        readingValue=body['readingValue'],
        readingDate=body['readingDate'],
        description=body['description'],
        time=body['time']
    )
    empty = database_sensor_reading.filter(Id=sensor_reading.Id)
    if len(empty) == 0: 
        sensor = Sensor.objects.filter(sensorId=sensor_reading.sensorId).first()
        if sensor:
            sensor_reading.save()
            return 200
    return 400
