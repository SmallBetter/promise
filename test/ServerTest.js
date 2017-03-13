/* eslint-disable prefer-arrow-callback */

import { describe, it, beforeEach, afterEach } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import Server from '../src/Server'

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
    it('should be ture', function () {
      return expect(Server.connect(true))
        .to.be.eqls(true)
    })
  })
  describe('disconnect()', function () {
    it('should be ture', function () {
      return expect(Server.disconnect(true))
        .to.be.eqls(true)
    })
  })
})

