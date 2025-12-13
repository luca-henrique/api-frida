# News Module

This module handles the management of News/Informative content in the FRIDA application.

## Components

- **Entity**: `News`
- **Features**: CRUD for news, including categorization and active status management.

## Architecture

Follows the **Clean Architecture** / **Modular** pattern:

- **Controllers**: Handle HTTP requests.
- **Use Cases**: Encapsulate specific business logic.
- **Repositories**: Handle database access (Prisma).
- **DTOs**: Define data transfer objects.

## Usage

The `NewsRepository` provides methods to:

- List news with pagination and category filtering.
- Create, Update, Delete, and Disable news items.
