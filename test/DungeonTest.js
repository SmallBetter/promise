/* eslint-disable prefer-arrow-callback */

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import Server from '../src/Server'
import Dungeon from '../src/Dungeon'

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
    it('should be fullfilled', function () {
      this.sinon.stub(Server, 'connect').returns({ hp: 1000, item: {}, gold: 0 })
      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
    it('should be fullfilled', function () {
      this.sinon.stub(Server, 'connect').throws(new Error('Server Down'))

      return expect(Dungeon.login())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })
  describe('playDungeon1()', function () {
    it('should be fullfilled', function () {
      return expect(Dungeon.playDungeon1({ hp: 1000, item: {}, gold: 0 }))
        .to.be.eqls({ hp: 800, item: { chestbox: 1 }, gold: 2 })
    })
  })
})
