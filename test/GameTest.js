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

  describe('play()', function () {
    it('should  game tobe fullfilled', function () {
      this.sinon.stub(Dungeon, 'login')
      this.sinon.stub(Dungeon, 'playDungeon1')
      this.sinon.stub(Dungeon, 'playDungeon2')
      this.sinon.stub(Dungeon, 'playDungeon3')
      this.sinon.stub(Dungeon, 'logout')
      return expect(Game.play())
        .to.eventually.be.fulfilled
    })

    it('should be reject Error', function () {
      this.sinon.stub(Dungeon, 'login').throws(new Error('Server Down'))
      return expect(Game.play())
        .to.eventually.be.rejectedWith('Server')
    })
  })
})

