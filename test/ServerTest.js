/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Server from '../src/Server'
import Dungeon from '../src/Dungeon'

describe('Server', function () {
  let sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    this.sinon = sandbox
  })

  afterEach(function () {
    sandbox.restore()
  })
  describe('connect()', function () {
    it('should attackAndCount tobe hero 0', function () {
      return expect(function () {
        Server.connect(false)
      })
        .to.be.throw(/server/)
    })

    it('should attackAndCount tobe hero 0', function () {
      return expect(Server.connect(true))
        .to.be.eqls({ hp: 1000, item: {}, gold: 0 })
    })
  })
})

