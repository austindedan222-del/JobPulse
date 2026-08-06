import requests
from bs4 import BeautifulSoup

from .base import BaseScraper


class RemoteOKScraper(BaseScraper):

    URL = "https://www.python.org/jobs/"

    HEADERS = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 "
            "(KHTML, like Gecko) "
            "Chrome/138.0 Safari/537.36"
        )
    }

    def scrape(self):
        response = requests.get(
            self.URL,
            headers=self.HEADERS,
            timeout=15
        )

        response.raise_for_status()

        soup = BeautifulSoup(response.text, "lxml")

        job_container = soup.find(
            "ol",
            class_="list-recent-jobs list-row-container menu"
        )

        job_listings = job_container.find_all("li", recursive=False)

        print(f"Found {len(job_listings)} jobs.")

        jobs = []

        for job in job_listings:
            title_link = job.find("h2", class_="listing-company").find("a")

            title = title_link.get_text(strip=True)

            company = (
                title_link.parent.get_text("\n", strip=True)
                .split("\n")[-1]
            )

            location = job.find(
                "span",
                class_="listing-location"
            ).get_text(strip=True)

            url = "https://www.python.org" + title_link["href"]

            jobs.append({
                "title": title,
                "company": company,
                "location": location,
                "url": url,
            })

        print(jobs[0])

        return jobs


