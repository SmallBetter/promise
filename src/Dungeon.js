import Promise from 'bluebird'
import Server from './Server'

export default class Dungeon {

  static login() {
    return Promise
      .try(() => Server.connect())
      .catch(error => {
        if (error.message.includes('Server')) {
          return { hp: 1000, item: {}, gold: 0 }
        }
        throw error
      })
  }

  static playDungeon1(heros) {
    return heros
  }
}
