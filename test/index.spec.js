var
    circl =  require( '../lib/index'),
    fs = require( 'fs' ),
    path = require( 'path' ),
    _ = require('lodash');


var top_level_count = 0;
fs.readdirSync(__dirname).forEach( function( file ){

    var stat = fs.statSync( path.join( __dirname, file ) );
    if (stat.isFile())
        top_level_count ++;

} );


describe ("walk_directory", function(){

    it ("it should walk more deeply than the top level", function(){
        var cb = sinon.spy();
        circl.walk_dir(path.join(__dirname,'../'), cb);
        cb.callCount.should.greaterThan(top_level_count);
    });

    it ("it should skip index.js files", function(){
        var cb = sinon.spy();
        circl.walk_dir(path.join(__dirname, "./dir1/"),  cb);
        _.forEach(cb.argsForCall, function(o){
            o[0].lastIndexOf("index.js").should.equal(-1);

        });
    });


}) ;


describe ("process_modules", function(){

  var cb = sinon.spy();
  circl.process_modules(path.join(__dirname,'../'),cb).init("one", "two");
  it ("it should pass all the paramters it is given to the callback", function(){
      expect(cb.args[0][0]).to.equal("one");
      expect(cb.args[0][1]).to.equal("two");
      expect(cb.args[0][2].lastIndexOf(".js")).to.be.greaterThan(0);
      _.forEach(cb.args, function(o){
          expect (o[0].length).to.equal(3);
          

        });

        expect (cb.callCount).to.be.greaterThan(top_level_count);
    });

}   );









