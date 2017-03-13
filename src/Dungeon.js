import Promise from 'bluebird'
import Server from './Server'
import Hero from './Hero'

export default class Dungeon {

  static login() {
    return Promise
      .try(() => Server.connect())
      .then(() => Hero.heroBegin())
      .catch(() => Hero.heroBegin())
  }

  static logout() {
    return Promise
      .try(() => Server.disconnect())
      .then(success => {
        if (!success) {
          throw new Error('Server Error')
        }
        return true
      })
      .catch(error => {
        if (error.message.includes('Server Error')) {
          return true
        }
        throw error
      })
  }

  static playDungeon1(hero) {
    const reword = { hp: -200, item: { chestbox: 1 }, gold: 2 }
    return Hero.addReword(hero, reword)
  }

  static playDungeon2(hero) {
    const reword = { hp: 0, item: { chestbox: 1, sword: 1 }, gold: 3 }
    return Hero.addReword(hero, reword)
  }

  static playDungeon3(hero) {
    const reword = { hp: 0, item: { steel: 5 }, gold: 10 }
    return Hero.addReword(hero, reword)
  }
}
