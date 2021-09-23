from django.db import models
from cloudinary_storage.storage import RawMediaCloudinaryStorage
from django.contrib.auth.models import User

# Create your models here.

class Crypto(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    name = models.CharField(max_length=100)
    csv_file = models.FileField(upload_to='files/', blank=True, storage=RawMediaCloudinaryStorage())

    def __str__(self):
        return self.name

class FavCoin(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    coin = models.CharField(max_length=75, null=True, blank=True)

    def __str__(self):
        return str(self.user)
