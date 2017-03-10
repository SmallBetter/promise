import Promise from 'bluebird'
import Dungeon from './Dungeon'


export default class play {

  static play() {
    return Promise
      .try(() => Dungeon.login())
      .then(() => Dungeon.playDungeon1())
  }
}
