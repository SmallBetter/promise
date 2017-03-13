export default class Hero {

  static heroBegin() {
    return { hp: 1000, item: {}, gold: 0 }
  }

  static addReword(hero, reword) {
    return {
      hp: hero.hp + reword.hp,
      item: this.itemReword(hero.item, reword.item),
      gold: hero.gold + reword.gold,
    }
  }

  static itemReword(heroItem, rewordItem) {
    const reword = { ...heroItem, ...rewordItem }
    Object.keys(reword).forEach(item => {
      if (heroItem[item] && rewordItem[item]) {
        reword[item] = heroItem[item] + rewordItem[item]
      }
    })
    return reword
  }
}
