import * as express from 'express'
import * as bodyParser from 'body-parser'
const apollo = require('apollo-server')

import schema from './schema/index'
import resolvers from './resolvers/index'
import SWAPIConnector from './connectors/swapi'
import FilmModel from './models/film'
import PeopleModel from './models/people'
import VehicleModel from './models/vehicle'
import PlanetModel from './models/planet'
import StarshipModel from './models/starship'
import SpeciesModel from './models/species'

const port = 3000
const app = express()

app.use(bodyParser.json())
app.use('/graphql', apollo.apolloServer((req) => {
  const swapiConnector = new SWAPIConnector('http://swapi.co/api')

  return {
      graphiql: true,
      pretty: true,
      resolvers,
      schema,
      context: {
          film: new FilmModel(swapiConnector),
          vehicle: new VehicleModel(swapiConnector),
          people: new PeopleModel(swapiConnector),
          planet: new PlanetModel(swapiConnector),
          starship: new StarshipModel(swapiConnector),
          species: new SpeciesModel(swapiConnector),
      },
  }
}))

app.listen(port, () => {
    console.log(`Server is listen on ${port}`)
})
