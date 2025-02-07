# Generated by Django 5.1.2 on 2025-01-31 17:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0048_alter_childcatelv1_supercate_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='district',
            name='locatedIn',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='districts', to='ecommerceapp.provincecity'),
        ),
        migrations.AlterField(
            model_name='wardcommune',
            name='locatedIn',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='wards_communes', to='ecommerceapp.district'),
        ),
    ]
