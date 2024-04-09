import sql from './db.js'

sql `
    CREATE TABLE videos (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        duration INTEGER
    );
`.then(() => {
    console.log('tabela criada')
})