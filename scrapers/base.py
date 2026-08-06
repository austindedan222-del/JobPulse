from abc import ABC, abstractmethod


class BaseScraper(ABC):
    """
    Base class that every scraper must inherit from.
    """

    @abstractmethod
    def scrape(self):
        """
        Returns a list of dictionaries representing jobs.
        """
        pass