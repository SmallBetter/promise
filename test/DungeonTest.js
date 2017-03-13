/* eslint-disable prefer-arrow-callback */

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import Server from '../src/Server'
import Dungeon from '../src/Dungeon'
import Hero from '../src/Hero'

chai.use(chaiAsPromised)

describe('Dungeon', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('login()', function () {
    it('should true be fullfilled', function () {
      this.sinon.stub(Server, 'connect').returns(true)
      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should false to be Hero', function () {
      this.sinon.stub(Server, 'connect').returns(false)
      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })

    it('should throws to be Hero', function () {
      this.sinon.stub(Server, 'connect').throws(new Error('Server Error'))

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })

  describe('logout()', function () {
    it('should true be fullfilled', function () {
      this.sinon.stub(Server, 'disconnect').returns(true)
      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.that.eqls(true)
    })

    it('should false be equal true', function () {
      this.sinon.stub(Server, 'disconnect').returns(false)
      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.that.eqls(true)
    })
    it('should rejected Error', function () {
      this.sinon.stub(Server, 'disconnect').throws(new Error('Server Down'))
      return expect(Dungeon.logout())
        .to.eventually.be.rejectedWith('Down')
    })

    it('should throw Server Error be fullfilled', function () {
      this.sinon.stub(Server, 'disconnect').throws(new Error('Server Error'))
      return expect(Dungeon.logout())
        .to.eventually.be.fulfilled
        .and.that.eqls(true)
    })
  })

  describe('playDungeon1()', function () {
    it('should hero playDungeon1 all item drop', function () {
      const hero = { hp: 1000, item: { sword: 1 }, gold: 0 }
      const heroReword = { hp: 800, item: { chestbox: 1, sword: 1 }, gold: 2 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon1(hero))
          .to.be.eqls(heroReword)
    })
    it('should hero playDungeon1 all item drop', function () {
      const hero = { hp: 14200, item: {}, gold: 0 }
      const heroReword = { hp: 14000, item: { chestbox: 1 }, gold: 2 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon1(hero))
        .to.be.eqls(heroReword)
    })
  })

  describe('playDungeon2()', function () {
    it('should hero playDungeon2 all item drop', function () {
      const hero = { hp: 1800, item: { chestbox: 1 }, gold: 2 }
      const heroReword = { hp: 1800, item: { chestbox: 2, sword: 1 }, gold: 5 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon2(hero))
        .to.be.eqls(heroReword)
    })

    it('should hero playDungeon2 all item drop...', function () {
      const hero = { hp: 800, item: {}, gold: 2 }
      const heroReword = { hp: 800, item: { chestbox: 1, sword: 1 }, gold: 5 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon2(hero))
        .to.be.eqls(heroReword)
    })
  })

  describe('playDungeon3()', function () {
    it('should hero playDungeon3 all item drop', function () {
      const hero = { hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 }
      const heroReword = { hp: 800, item: { chestbox: 2, sword: 1, steel: 5 }, gold: 15 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon3(hero))
        .to.be.eqls(heroReword)
    })
    it('should hero playDungeon3 all item drop', function () {
      const hero = { hp: 5800, item: { chestbox: 2, sword: 1, bow: 1 }, gold: 5 }
      const heroReword = { hp: 5800, item: { chestbox: 2, sword: 1, steel: 5, bow: 1 }, gold: 15 }
      this.sinon.stub(Hero, 'addReword').returns(heroReword)

      return expect(Dungeon.playDungeon3(hero))
        .to.be.eqls(heroReword)
    })
  })
})
