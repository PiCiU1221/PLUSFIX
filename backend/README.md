# Backend API Setup

This guide details how to set up and run the backend API locally. The project is built using Laravel and uses SQLite as the database.

## Prerequisites

Before you begin, ensure you have **PHP** and **Composer** installed on your machine.

### PHP Extensions
Please ensure the following extensions are uncommented/enabled in your `php.ini` file:

- `openssl`
- `pdo_sqlite`
- `sqlite3`
- `fileinfo`
- `mbstring`
- `curl`
- `zip`

---

## Installation Steps

Follow these steps to get the project running on your local machine.

### 1. Install Dependencies
Navigate to the main backend directory and run the Composer install command to download the required PHP libraries.

~~~bash
composer install
~~~

### 2. Configure Environment
Create your local environment file by copying the example file.

~~~bash
copy .env.example .env
~~~

Generate the application encryption key:

~~~bash
php artisan key:generate
~~~

### 3. Setup Database
This project uses SQLite. You must create the database file manually before migrating.

1. Navigate to the `/database` directory.
2. Create an empty file named `database.sqlite`.

### 4. Run Migrations
Run the migrations to build the database schema.

~~~bash
php artisan migrate
~~~

---

## Running the Application

To start the local development server, run the following command:

~~~bash
php artisan serve
~~~

The API will be accessible at `http://127.0.0.1:8000` (or the port specified in your terminal).
