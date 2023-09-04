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

        sensor_data = []
        sensor_types = ['temperature', 'humidity', 'acoustic']
        for _ in range(50):  
            sensor = Sensor(
                sensorId=fake.unique.random_int(min=10000, max=99999), 
                type=random.choice(sensor_types),
                vendorName=fake.company(),
                vendorEmail=fake.email(),
                description=fake.sentence(),
                location=fake.city()
            )
            sensor_data.append(sensor)
        Sensor.objects.bulk_create(sensor_data)
        sensor_reading_data = []
        for sensor in Sensor.objects.all():
            for _ in range(5):  
                sensor_reading = SensorReading(
                    Id = fake.unique.random_int(min=10000, max=99999),
                    sensorId=sensor.sensorId,
                    readingType=sensor.type,
                    readingValue=fake.pydecimal(min_value=0, max_value=100, right_digits=2),
                    readingDate=fake.date(),  
                    description=fake.sentence(),
                    time=fake.time()
                )
                sensor_reading_data.append(sensor_reading)
        SensorReading.objects.bulk_create(sensor_reading_data)

