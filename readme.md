# Технологии

* Typescript + Express - Базовая обработка запросов
* Zod - валидация запросов
* Postgres + OpenAPI - Работа с БД
* Авторизация через Bearer JWT

# Установка

`npm install` - Установка зависимостей

`npm start` - Запуск сервера

# Эндпоинты

/docs - OpenAPI документация

POST /signin - Авторизация

GET /users/ - Получить всех пользователей

POST /users/ - Создать пользователя

GET /users/:id - Получить данные о пользователе

POST /users/:id/deactivate - Блокировка пользователя
