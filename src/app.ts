import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import config from 'config'
import routes from './routes'

class App {
  public express: express.Application

  public constructor () {
    this.express = express()

    this.middlewares()
    this.database()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(cors())
  }

  private database (): void {
    console.log(config.get('database'))
    mongoose.connect(config.get('database'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    const connection = mongoose.connection

    connection.once('open', function () {
      console.log('MongoDB database connection established successfully')
    })
  }

  private routes (): void {
    this.express.use(routes)
  }
}

export default new App().express
