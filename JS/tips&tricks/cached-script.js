var loadedCachedScripts = [];

jQuery.cachedScript = function ( url, callback ) {

  if ( $.inArray( url, loadedCachedScripts ) !== -1 )
  {
    return callback();
  }

  return jQuery.ajax( {
    dataType: "script",
    cache: true,
    url: url
  } ).done( function () {
    loadedCachedScripts.push( url );
    callback()
  } );
};


jQuery.cachedScripts = function () {
  const varArgs = [].slice.call( arguments );

  if ( varArgs.length === 0 )
  {
    return;
  }
  if ( varArgs.length === 1 && typeof varArgs[0] === 'function' )
  {
    varArgs[0]();
  }
  else
  {
    $.cachedScript( varArgs[0], function () {
      $.cachedScripts.apply( this, varArgs.slice( 1 ) );
    } )
  }
};
