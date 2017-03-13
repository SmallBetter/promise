/* eslint-disable prefer-arrow-callback */

import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Hero from '../src/Hero'

describe('Dungeon', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })

  describe('addReword()', function () {
    it('should hero not item pley dungeon add reword', function () {
      const hero = { hp: 1000, item: {}, gold: 0 }
      const reword = { hp: -200, item: { chestbox: 1 }, gold: 2 }
      const stubitemReword = this.sinon.stub(Hero, 'itemReword')
      stubitemReword.onFirstCall().returns({ chestbox: 1 })

      return expect(Hero.addReword(hero, reword))
        .to.be.eqls({ hp: 800, item: { chestbox: 1 }, gold: 2 })
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubitemReword)
        ) == null)
    })

    it('should hero pley dungeon add reword  ', function () {
      const hero = { hp: 800, item: { chestbox: 1 }, gold: 2 }
      const reword = { hp: 0, item: { chestbox: 1, sword: 1 }, gold: 3 }
      const stubitemReword = this.sinon.stub(Hero, 'itemReword')
      stubitemReword.onFirstCall().returns({ chestbox: 2, sword: 1 })

      return expect(Hero.addReword(hero, reword))
        .to.be.eqls({ hp: 800, item: { chestbox: 2, sword: 1 }, gold: 5 })
        .and.satisfy(() => (
          sinon.assert.calledOnce(stubitemReword)
        ) == null)
    })
  })
  describe('itemReword()', function () {
    it('should empty when both empty', function () {
      const heroItem = {}
      const rewordItem = {}
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({})
    })

    it('should be still have item even reward empty', function () {
      const heroItem = { sword: 1 }
      const rewordItem = {}
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({ sword: 1 })
    })

    it('should be add new item', function () {
      const heroItem = {}
      const rewordItem = { sword: 1 }
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({ sword: 1 })
    })

    it('should be have both of item', function () {
      const heroItem = { sword: 1 }
      const rewordItem = { bow: 1 }
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({ sword: 1, bow: 1 })
    })

    it('should be combine both of same item', function () {
      const heroItem = { sword: 1 }
      const rewordItem = { sword: 1 }
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({ sword: 2 })
    })

    it('should be combine, still have, add new item', function () {
      const heroItem = { sword: 1, bow: 1 }
      const rewordItem = { sword: 1, steel: 5 }
      return expect(Hero.itemReword(heroItem, rewordItem))
        .to.be.eqls({ sword: 2, bow: 1, steel: 5 })
    })
  })
})
