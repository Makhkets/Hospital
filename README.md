# Hospital - Умная система для Госпиталей

Эта аналогичная система но с дополненными функциями для удобства. Врачам больше не придется бегать по всем койкам и смотреть информацию, т.к он будет сразу транслироваться на наш сайт, также врачам не придется писать огромные отчеты, которые занимают больше времени, которое можно потратить на обследования пациента, а пациенту выделяется 10 минут, что крайне мало.

❌ Запрещено использовать в коммерческих целях. Подробнее можно прочитать в файле LICENSE.md ❌

------



## Реализовано:

- [x] Добавлен README.md
- [x] Добавлена **Модифицированная Лицензия** (Apache 2.0)

##### Backend:

- [x] Аутентификация с помощью **JWT Токенов**
- [x] Добавить регистрацию
- [x] Добавить подтверждение по почте
- [x] Добавить авторизацию
- [x] Авто обновление access токена (**чтобы пользователя не деаутентифициравало**)
- [х] Добавить авторизацию

##### Frontend:

- [x] Верстка SideBar, Cap, Main page, Footer. SignUp page, SignIn Page
- [x] Добавление подсветки каждой категории при её активности в sidebar'e
- [x] Подключение React
- [x] Авто выставление cookie при необходимости (при работе с refresh)
- [x] Авто получение данных пользователя отправкой запроса на backend
- [x] Отделения (5 шт)


## В Разработке:

- [ ] Удаление Пациентов
- [ ] Поиск Пациентов
- [ ] Авто Отчет
- [ ] Авто Статистика
- [ ] Оставить заявку на посещение пациента (с временем)
- [ ] Одобрение / отклонение заявки посетителя (с оставлением комментария от врача)
- [ ] Эмулирование температуры, давление и т.д
- [ ] Добавить различную информацию на сайт, по типу плана эвакуации
- [ ] Автоматический подсчет больных и номеров, чтобы узнать есть ли место для нового больного
- [ ] Поиск пациентов


**Список будет дополняться...**

------

## Language and tools
![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green) 
![Django Rest](https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white) 
![Sqlite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) 

![Html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![Css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
![Javascript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E) 

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) 

![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white) 

------



## Скриншоты наработок:

#### Страница авторизованного пользователя (показывается аватарка и username человека)

![image-20220918111034182](/images/1.png)![image-20220918111103686](/images/2.png)

#### Страница НЕ авторизованного пользователя (показывается аватарка с знаком вопроса и две ссылки для регистрации и авторизации)

![image-20220918111213191](/images/3.png)![image-20220918111324060](/images/2.png)



##### Страница Регистрации (все ссылки рабочие)

![image-20220918111424807](/images/4.png)



##### Страница авторизации (все ссылки рабочие)

![image-20220918111511073](/images/5.png)
