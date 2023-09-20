from reportingService.models import SensorReading, Sensor

def addSensorService(body):
    database_sensor = Sensor.objects.all()
    sensor = Sensor(
        sensorId=body['sensorId'],
        type=body['type'],
        vendorName=body['vendorName'],
        vendorEmail=body['vendorEmail'],
        description=body['description'],
        location=body['location'],
        latitude=body['latitude'],
        longitude=body['longitude']
    )
    empty = database_sensor.filter(sensorId=sensor.sensorId)
    if len(empty) == 0:
        sensor.save()
        return 200
    return 400

def deleteSensorService(sensorId):
    sensor = Sensor.objects.get(sensorId = sensorId)
    if not sensor:
        return 404
    sensor.delete()
    SensorReading.objects.filter(sensorId=sensorId).delete()
    return 200