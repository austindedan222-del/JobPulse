# JobPulse

JobPulse is a backend application built with Django that collects job listings from the Python.org Job Board, stores them in a database, and makes them available through a REST API.

I built this project to strengthen my backend development skills by working on a real-world problem. It combines web scraping, database management, and API development into a single application. The goal was to create a clean and maintainable backend that automatically collects job listings and provides an easy way to access them through an API.

The scraper retrieves job postings from the Python.org Job Board, extracts important details such as the job title, company, location, and job link, then stores them in the database while preventing duplicate entries.

## Project Objectives

The objectives of this project were to:

* Learn how to build a web scraper with BeautifulSoup.
* Design a backend application using Django.
* Build REST APIs with Django REST Framework.
* Store and manage scraped data in a database.
* Apply clean project structure and separation of responsibilities.

## Features

* Scrapes live job listings from the Python.org Job Board.
* Stores job information in a Django database.
* Prevents duplicate job records.
* Provides a REST API for accessing stored jobs.
* Supports searching by job title, company, or location.
* Supports filtering jobs by location.
* Includes a Django Admin dashboard for managing job records.
* Uses a custom Django management command to run the scraper.

## Technologies Used

* Python 3.12
* Django
* Django REST Framework
* BeautifulSoup4
* Requests
* SQLite
* Git
* GitHub

## How the Project Works

The application follows a simple flow.

1. The scraper requests job listings from the Python.org Job Board.
2. BeautifulSoup extracts the required information.
3. The extracted data is stored in the database.
4. The REST API exposes the stored jobs.
5. Users can search and filter the available job listings.

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

## Installation

Clone the repository.

```bash
git clone https://github.com/YOUR_USERNAME/JobPulse.git
```

Move into the project directory.

```bash
cd JobPulse
```

Create a virtual environment.

```bash
python -m venv venv
```

Activate the virtual environment.

**Windows**

```bash
venv\Scripts\activate
```

**Linux or macOS**

```bash
source venv/bin/activate
```

Install the project dependencies.

```bash
pip install -r requirements.txt
```

Apply the database migrations.

```bash
python manage.py migrate
```

Start the development server.

```bash
python manage.py runserver
```

## Running the Scraper

To fetch the latest jobs, run:

```bash
python manage.py scrape
```

The scraper will download the latest job listings, save new jobs to the database, and skip any jobs that have already been stored.

## API Endpoints

List all jobs

```text
GET /api/jobs/
```

Retrieve a single job

```text
GET /api/jobs/<id>/
```

Search for jobs

```text
GET /api/jobs/?search=python
```

Filter jobs by location

```text
GET /api/jobs/?location=Canada
```

## Django Admin

Create an administrator account.

```bash
python manage.py createsuperuser
```

Then log in at:

```text
http://127.0.0.1:8000/admin/
```

The admin dashboard allows you to view and manage all stored job listings.

## What I Learned

Building JobPulse gave me practical experience with:

* Web scraping using BeautifulSoup.
* Django models and the ORM.
* Building REST APIs with Django REST Framework.
* Designing a clean backend architecture.
* Working with relational databases.
* Preventing duplicate data.
* Managing a project with Git and GitHub.

## Future Improvements

There are several ways this project could be extended in the future.

* Support additional job boards.
* Extract salary information when available.
* Add scheduled scraping.
* Deploy with PostgreSQL.
* Containerize the project using Docker.
* Add authentication and user accounts.
* Allow users to save favourite jobs.

## About the Author

**Dedan Austin**

Computer Science Student

Backend Developer with Python and Django

GitHub: https://github.com/austindedan222-del

## License

This project is licensed under the MIT License.
