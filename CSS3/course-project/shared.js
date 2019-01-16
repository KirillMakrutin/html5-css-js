var backdrop = document.querySelector( '.backdrop' );
var modal = document.querySelector( '.modal' );
var selectPlanButtons = document.querySelectorAll( '.plan button' );

for ( var i = 0; i < selectPlanButtons.length; i++ )
{
  selectPlanButtons[i].addEventListener( 'click', function ( event ) {
    backdrop.style.display = 'block';
    modal.style.display = 'block';
  } );
}


