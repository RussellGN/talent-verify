# Generated by Django 5.0.6 on 2024-06-23 09:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_employeradmin_username'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='national_id',
            field=models.CharField(blank=True, max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='careertimestamp',
            name='date_started',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='employee',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]