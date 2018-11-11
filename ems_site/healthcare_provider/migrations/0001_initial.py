# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-11-11 05:08
from __future__ import unicode_literals

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='WorldBorder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('area', models.IntegerField()),
                ('pop2005', models.IntegerField(verbose_name=b'Population 2005')),
                ('fips', models.CharField(max_length=2, verbose_name=b'FIPS Code')),
                ('iso2', models.CharField(max_length=2, verbose_name=b'2 Digit ISO')),
                ('iso3', models.CharField(max_length=3, verbose_name=b'3 Digit ISO')),
                ('un', models.IntegerField(verbose_name=b'United Nations Code')),
                ('region', models.IntegerField(verbose_name=b'Region Code')),
                ('subregion', models.IntegerField(verbose_name=b'Sub-Region Code')),
                ('lon', models.FloatField()),
                ('lat', models.FloatField()),
                ('mpoly', django.contrib.gis.db.models.fields.MultiPolygonField(srid=4326)),
            ],
        ),
    ]
