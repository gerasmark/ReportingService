from django.core.management.base import BaseCommand
from faker import Faker
import random
from reportingService.models import Sensor, SensorReading

class Command(BaseCommand):
    help = 'Create fake data for our database'

    def handle(self, *args, **kwargs):
        print('Creating fake data for our database...')
        fake = Faker()
        Faker.seed(123)
        database_sensor = Sensor.objects.all()
        database_sensor_reading = SensorReading.objects.all()
        sensor_data = []
        sensor_types = ['temperature', 'humidity', 'acoustic']
        for _ in range(100):  
            sensor = Sensor(
                sensorId=fake.unique.random_int(min=10000, max=99999), 
                type=random.choice(sensor_types),
                vendorName=fake.company(),
                vendorEmail=fake.email(),
                description=fake.sentence(),
                location=fake.city()
            )
            empty = database_sensor.filter(sensorId=sensor.sensorId)
            print(empty)
            if len(empty) == 0:
                sensor_data.append(sensor)

        Sensor.objects.bulk_create(sensor_data)
        sensor_reading_data = []
        for sensor in Sensor.objects.all():
            for _ in range(20):  
                if(sensor.type == 'temperature'):
                    number=fake.pydecimal(min_value=0, max_value=1000, right_digits=2)
                elif(sensor.type == 'humidity'):
                    number=fake.pydecimal(min_value=0, max_value=100, right_digits=2)
                elif(sensor.type == 'acoustic'):
                    number=fake.pyint(min_value=5000, max_value=20000)
                sensor_reading = SensorReading(
                    Id = fake.unique.random_int(min=10000, max=99999),
                    sensorId=sensor.sensorId,
                    readingType=sensor.type,
                    readingValue=number, 
                    readingDate=fake.date(),  
                    description=fake.sentence(),
                    time=fake.time()
                )
                empty = database_sensor_reading.filter(Id=sensor_reading.Id)
                if len(empty) == 0:
                    sensor_reading_data.append(sensor_reading)
        SensorReading.objects.bulk_create(sensor_reading_data)

