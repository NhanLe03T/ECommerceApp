# Generated by Django 5.1.2 on 2025-02-04 13:05

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0054_alter_address_shop'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='staff',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='staff', to=settings.AUTH_USER_MODEL),
        ),
    ]
