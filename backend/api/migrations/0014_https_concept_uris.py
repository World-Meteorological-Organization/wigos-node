import json

from django.db import migrations

OLD, NEW = "http://codes.wmo.int/", "https://codes.wmo.int/"


def to_https(apps, schema_editor):
    """Codelist concept URIs are https, as in the WMDS codelists. Records are
    rewritten in place; their next save publishes them."""
    Station = apps.get_model("api", "Station")
    for station in Station.objects.only("id", "wmdrv2").iterator():
        text = json.dumps(station.wmdrv2)
        if OLD in text:
            Station.objects.filter(pk=station.pk).update(wmdrv2=json.loads(text.replace(OLD, NEW)))


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0013_drop_outbox"),
    ]

    operations = [
        migrations.RunPython(to_https, migrations.RunPython.noop),
    ]
