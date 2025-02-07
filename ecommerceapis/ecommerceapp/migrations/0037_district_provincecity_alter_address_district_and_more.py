# Generated by Django 5.1.2 on 2025-01-21 11:47

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0036_alter_saleinfo_primary_attr_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ProvinceCity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='address',
            name='district',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerceapp.district'),
        ),
        migrations.AddField(
            model_name='district',
            name='locatedIn',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.provincecity'),
        ),
        migrations.AlterField(
            model_name='address',
            name='province_city',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerceapp.provincecity'),
        ),
        migrations.CreateModel(
            name='WardCommune',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('locatedIn', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.district')),
            ],
        ),
        migrations.AlterField(
            model_name='address',
            name='ward_commune',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerceapp.wardcommune'),
        ),
    ]
