# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2018-02-18 16:23
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('locales', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('nombre', models.CharField(max_length=30)),
                ('foto', models.CharField(max_length=255)),
                ('descripcion', models.CharField(max_length=255)),
                ('price', models.FloatField()),
                ('local', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='producto', to='locales.Local')),
            ],
            options={
                'abstract': False,
                'ordering': ['-created_at', '-updated_at'],
            },
        ),
    ]
