import path from 'path'
import express, { Application } from 'express';
import  morgan  from "morgan";
import cors from "cors";
import config from 'config'

import * as uni from './app'
import gamesRoutes from './routes/gamesRoutes';

class Server {
    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        // setup view engine  
        this.app.set('views',path.join(config.get('buildDirectory')))
        this.app.set('view engine', 'ejs')
        this.app.set('port', config.get('express.port') || 3000);
        //static directories
        this.app.use(express.static(config.get('buildDirectory')));
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    routes(): void {
        this.app.get('/', (uni.handleRender));
        this.app.use('/api/games', gamesRoutes);
    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listening on port ${this.app.get('port')}`)
        });
    }

}

const server = new Server();
server.start();