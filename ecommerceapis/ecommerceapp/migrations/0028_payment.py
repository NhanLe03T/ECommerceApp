# Generated by Django 5.1.2 on 2024-12-01 16:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerceapp', '0027_orderitem'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('created_date', models.DateTimeField(auto_now_add=True)),
                ('updated_date', models.DateTimeField(auto_now=True)),
                ('paid_at', models.DateTimeField(default=None, null=True)),
                ('total_amount', models.DecimalField(decimal_places=2, default=None, max_digits=10, null=True)),
                ('payment_status', models.CharField(choices=[('pending', 'Pending'), ('completed', 'Completed'), ('failed', 'Failed')], default='pending', max_length=20)),
                ('payment_method', models.CharField(choices=[('cash', 'Cash'), ('paypal', 'Paypal'), ('momo', 'Momo'), ('stripe', 'Stripe'), ('zalo_pay', 'Zalo pay')], default='cash', max_length=20)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='ecommerceapp.order')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
