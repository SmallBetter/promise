/* eslint-disable prefer-arrow-callback */

import { describe, it } from 'mocha'
import chai, { expect } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import Game from '../src/Game'
import Dungeon from '../src/Dungeon'

chai.use(chaiAsPromised)

describe('Game', function () {
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
      this.sinon.stub(Dungeon, 'login').returns({ hp: 1000, item: {}, gold: 0 })
      return expect(Game.play())
        .to.eventually.be.fulfilled
        .and.that.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })
})

