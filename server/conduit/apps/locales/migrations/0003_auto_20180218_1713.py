# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-02-18 17:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('locales', '0002_producto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='local',
            name='id',
        ),
        migrations.AlterField(
            model_name='local',
            name='categoria',
            field=models.TextField(max_length=55),
        ),
        migrations.AlterField(
            model_name='local',
            name='direccion',
            field=models.TextField(max_length=55),
        ),
        migrations.AlterField(
            model_name='local',
            name='id_local',
            field=models.TextField(max_length=25, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='local',
            name='nombre',
            field=models.TextField(max_length=25),
        ),
        migrations.AlterField(
            model_name='local',
            name='poblacion',
            field=models.TextField(max_length=55),
        ),
        migrations.AlterField(
            model_name='local',
            name='provincia',
            field=models.TextField(max_length=55),
        ),
        migrations.AlterField(
            model_name='local',
            name='telefono',
            field=models.TextField(max_length=9),
        ),
    ]
