# Generated by Django 3.2.6 on 2021-09-19 06:08

import cloudinary_storage.storage
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crypto',
            name='csv_file',
            field=models.FileField(blank=True, storage=cloudinary_storage.storage.RawMediaCloudinaryStorage(), upload_to='files/'),
        ),
    ]