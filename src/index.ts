import express from 'express';
import morgan from 'morgan';
import Count from './db.js';

import { connection } from './db.js';

const PORT = process.env.PORT ?? 3001;

const app = express();

app.set('trust proxy', true);

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
    const { ip } = req;

    if (!(await Count.findByPk(ip))) {
        await Count.create({ ip });
    }

    res.status(200).send(`<center>
<h1>Number of unique page-views (one IP address = one page-view)</h1>
<img src="https://i.imgflip.com/vgyft.jpg" alt="WOODY GOODY"/>
<p style="font-size: 20rem; margin: 0">${await Count.count()}</p>
<p>Your IP: ${ip}</p>
</center>`);
});

app.get('/reset', async (_, res) => {
    try {
        await Count.destroy({
            where: {},
            truncate: true,
        });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        res.status(500).json({ message: (error as Error)?.message });
    }
});

app.get('*', (_, res) => res.status(404).json({ message: 'Not found.' }));

await connection.sync();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
