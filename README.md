# JobPulse

JobPulse is a Django-based job search application that collects job listings from the Python.org Job Board and makes them available through a simple web interface and REST API.

I built JobPulse to gain practical experience with backend development, web scraping, databases, and API development while creating something that people can actually use to find jobs.

## Features

- Scrapes job listings from the Python.org Job Board.
- Stores job listings in SQLite.
- Prevents duplicate job records.
- Search jobs by title, company, or location.
- Filter jobs by location.
- Paginate through job listings.
- View individual job details.
- Apply through the original job listing.
- REST API for accessing job data.
- Django Admin for managing job listings.
- Custom management command for running the scraper.

## Built With

- Python 3.12
- Django
- Django REST Framework
- BeautifulSoup4
- Requests
- SQLite
- HTML, CSS and JavaScript
- Git & GitHub

## How It Works

JobPulse follows a simple process:

1. The scraper collects job listings from the Python.org Job Board.
2. The relevant information is extracted from each listing.
3. New listings are saved to the database.
4. Django REST Framework provides the job data through an API.
5. The frontend uses the API to display, search and filter jobs.

## Project Structure

```text
JobScraper/
│
├── config/
├── jobs/
│   ├── management/
│   │   └── commands/
│   │       └── scrape.py
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
│
├── scrapers/
│   ├── base.py
│   ├── manager.py
│   └── remoteok.py
│
├── manage.py
├── requirements.txt
└── README.md
```

## Getting Started

Clone the repository:

```bash
git clone https://github.com/austindedan222-del/JobPulse.git
```

Enter the project directory:

```bash
cd JobPulse
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows:**

```bash
venv\Scripts\activate
```

**Linux/macOS:**

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Run the database migrations:

```bash
python manage.py migrate
```

Start the development server:

```bash
python manage.py runserver
```

Open the application at:

```text
http://127.0.0.1:8000/
```

## Running the Scraper

To collect the latest job listings:

```bash
python manage.py scrape
```

Existing jobs are skipped to prevent duplicate records.

## API

The main API endpoints are:

```text
GET /jobs/
GET /jobs/<id>/
```

Search jobs:

```text
GET /jobs/?search=python
```

Filter jobs by location:

```text
GET /jobs/?location=Warsaw
```

Search and filter together:

```text
GET /jobs/?search=python&location=Warsaw
```

## Django Admin

Create an admin account:

```bash
python manage.py createsuperuser
```

Then visit:

```text
http://127.0.0.1:8000/admin/
```

The Django Admin allows you to view and manage stored job listings.

## Future Improvements

Possible future improvements include:

- Adding more job sources.
- Adding scheduled scraping.
- Extracting additional job information such as salary.
- Deploying the application.
- Migrating to PostgreSQL for a production environment.
- Adding user accounts and saved jobs.

## About

**Dedan Austin**

Computer Science Student | Backend Developer

GitHub: https://github.com/austindedan222-del

## License

This project is licensed under the MIT License.