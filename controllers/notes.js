'use strict';

const Note = require('../models/note');

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

exports.list = (req, res) => {
    const notes = Note.findAll();

    // Объединяем данные специфичные для контроллера с общими данными
    const data = { notes, ...res.locals };

    res.render('index', data);
};

exports.item = (req, res) => {
    const name = req.params.name;
    const note = Note.find(name);
    const data = { note, ...res.locals };

    if (note) {
        res.render('note', data);
    } else {
        // Код «404 Not Found» отправляют в ответ на отсутствующий http-ресурс,
        // в нашем случае отстутствующую заметку
        res.sendStatus(404);
    }
};

exports.create = (req, res) => {
    // Благодаря body-parser мидлваре у нас в поле `body`
    // разобранное тело POST запрос

    const note =  new Note(req.body);

    note.save();

    // Код «201 Created» отправляют в ответ на успешно созданный http-ресурс,
    // в нашем случае это страница конретной заметки
    res.sendStatus(201);
};
