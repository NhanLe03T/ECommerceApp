# Generated by Django 5.1.2 on 2025-01-26 14:33

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0040_remove_product_brand_remove_product_origin_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='childCateLv1',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.childcatelv1'),
        ),
        migrations.AddField(
            model_name='product',
            name='childCateLv2',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.childcatelv2'),
        ),
    ]
