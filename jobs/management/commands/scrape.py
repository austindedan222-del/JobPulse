from django.core.management.base import BaseCommand

from jobs.models import Job
from scrapers.remoteok import RemoteOKScraper


class Command(BaseCommand):
    help = "Scrape jobs from the Python Job Board"

    def handle(self, *args, **kwargs):
        scraper = RemoteOKScraper()

        jobs = scraper.scrape()

        created = 0
        skipped = 0

        for job in jobs:

            _, was_created = Job.objects.get_or_create(
                url=job["url"],
                defaults={
                    "title": job["title"],
                    "company": job["company"],
                    "location": job["location"],
                },
            )

            if was_created:
                created += 1
            else:
                skipped += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Saved {created} new jobs."
            )
        )

        self.stdout.write(
            self.style.WARNING(
                f"Skipped {skipped} existing jobs."
            )
        )