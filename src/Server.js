
export default class Server {

  static connect(login) {
    if (login !== true) {
      throw new Error('server')
    }
    const Hero = { hp: 1000, item: {}, gold: 0 }
    return Hero
  }
}
