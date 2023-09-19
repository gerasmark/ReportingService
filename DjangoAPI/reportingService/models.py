from django.db import models

# Create your models here.
class Sensor(models.Model):
    SENSOR_TYPES = [
        ('temperature', 'Temperature'),
        ('humidity', 'Humidity'),
        ('acoustic', 'Acoustic'),
    ]

    sensorId = models.CharField(max_length=50, primary_key=True)
    type = models.CharField(max_length=20, choices=SENSOR_TYPES)
    vendorName = models.CharField(max_length=100)
    vendorEmail = models.EmailField()
    description = models.TextField()
    location = models.CharField(max_length=100)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    def __str__(self):
        return f"Sensor: {self.sensorId} "

class SensorReading(models.Model):
    SENSOR_TYPES = [
        ('temperature', 'Temperature'),
        ('humidity', 'Humidity'),
        ('acoustic', 'Acoustic'),
    ]

    Id = models.CharField(max_length=50, primary_key=True) #AutoField(primary_key=True, serialize=False) #
    sensorId = models.CharField(max_length=50)
    readingType = models.CharField(max_length=20, choices=SENSOR_TYPES)
    readingValue = models.FloatField() #DecimalField(max_digits=10, decimal_places=2)
    readingDate = models.CharField(max_length=10)  #DateField()
    description = models.TextField()
    time = models.CharField(max_length=9)  #TimeField()

    def __str__(self):
        return f"Sensor Reading Id {self.Id} - Sensor: {self.sensorId.sensorId}"
