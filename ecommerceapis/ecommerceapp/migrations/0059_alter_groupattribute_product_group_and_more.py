# Generated by Django 5.1.2 on 2025-02-04 16:06

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0058_alter_childcate_supercate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='groupattribute',
            name='product_group',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='group_attributes', to='ecommerceapp.productgroup'),
        ),
        migrations.AlterField(
            model_name='productgroup',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='product_groups', to='ecommerceapp.product'),
        ),
    ]
