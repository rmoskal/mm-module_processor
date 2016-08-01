global.chai = require("chai");
global.expect = require('chai').expect;
global.should = require('chai').should();
global.chai.use(require('chai-things'));
global.assert =  require('chai').assert;
global.sinon = require('sinon');
sinonChai = require("sinon-chai");
global.chai.use(sinonChai);
var chaiAsPromised = require("chai-as-promised");
global.chai.use(chaiAsPromised);

