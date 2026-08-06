class ScraperManager:

    def __init__(self):
        self.scrapers = []

    def register(self, scraper):
        self.scrapers.append(scraper)

    def scrape_all(self):
        jobs = []

        for scraper in self.scrapers:
            jobs.extend(scraper.scrape())

        return jobs