from django.db import models

# Create your models here.

class Products(models.Model):
    namep=models.CharField(max_length=100)
    descp=models.TextField(max_length=100)
    pricep=models.IntegerField()
    catp=models.CharField(max_length=100)
    imgp=models.CharField(max_length=100)

    def __str__(self):
        return self.namep