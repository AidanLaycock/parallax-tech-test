# Parallax Technical Test

Application to store and manage user devices.

## Technology

-   [Laravel](https://laravel.com/]) (PHP),
-   MySQL,
-   [Inertia.js](https://inertiajs.com/)
-   React,
-   [TailwindCSS](https://tailwindcss.com/),

# Getting started

## Prerequisites

Before being able to run the project locally, you will need the following installed:

- [Composer](https://getcomposer.org/),
- PHP,
- Node.js & NPM,
- MySQL (Either in Docker or installed locally),

## Installing the project

To install the project, you will need to clone the project from Github:

```bash
gh repo clone AidanLaycock/parallax-tech-test
```

Once cloned, `cd` into the project and run `composer install`.

Once all of your php dependencies are installed, run:

```bash
cp .env.example .env && php artisan key:generate
```

You will need to add your database connection to your `.env` file.

Then you will need to run the migrations:

```bash
php artisan migrate
```

You can then either setup [Laravel Valet](https://laravel.com/docs/10.x/valet) or use `php artisan serve` to serve your application. You will then be able to view your application (Either on localhost or on your valet custom .test domain).

You will also need to run `npm run dev` or `npm run build` to build the javascript related assets.

## Running the Queue

To handle large file imports, this project leverages the Laravel Queue functionality.

Ideally you will want to leverage the database or redis for your queue.

To run the Queue locally, you will need to run:

```bash
php artisan queue:work
```

This will then process file uploads as they are uploaded. You may see multiple rows of responses as larger files are uploaded, as uploads are split into chunks of 1000 devices at a time.

## Getting Registered

Once you have your site running locally, you will be able to register an account to import `.csv` files for devices or to generate an API key to use the API routes.

To register an account, view the homepage and then click register in the top right hand corner. You will need to add a username, email and password to proceed.

### Generating a new API Token

Once registered & logged in, visit the dashboard (`/dashboard`), there you will be able to see the 'Generate New API Key' button, if you click this and enter a name for your key and then click create. You will be presented with a new API key

> [!IMPORTANT]
> Please note that the token will only be shown once, so make a secure copy of it before navigating from the page.

Once you have generated an API key, you will be able to use it within software like Postman. 

# API Documentation
[View API documentation](./api-documentation)

# Uploading devices via .csv

To upload files to the site, you will need to be registered and logged in.

Then visit the devices page (`/devices`), where you will be able to see a list of all devices in the database, as well as the Upload New Devices button.

If you click on Upload New Devices, then you will be able to select a local file to upload.

> [!NOTE]
> Please note that imports are processed via the Queue, so will be processed in the background, so for large imports, you may not see your data instantly. Do make sure that your Queue is being run locally, otherwise you will not see your data on the site.

# Removing an import

> [!WARNING]
> Please be aware that when removing an import it is not reversible, and you will need to reupload the `.csv` file to add your devices again.

To remove imported devices that have been processed from a `.csv` file, you can visit the devices page, click manage imports. And then click Delete next to the relevant import you want to remove.

Please note that for larger imports, you may need to refresh the page to see the full effects take place.

## Running tests
As part of the project, there is a small suite of automated tests. These tests leverage [PestPHP](https://pestphp.com/) syntax.

To run tests:
```bash
php artisan test
```

## Project next steps
- Refine UX, particularly around device management and data tables,
- Move imports into polymorphic relationship to enable better reuse if other data is also importable,
- Improve API key management so that users can revoke keys as needed,