var backdrop = document.querySelector( '.backdrop' );
var modal = document.querySelector( '.modal' );
var selectPlanButtons = document.querySelectorAll( '.plan button' );
var selectCloseModalButton = document.querySelector( '.modal__action--negative' );

selectCloseModalButton.addEventListener( 'click', closeModal );
backdrop.addEventListener( 'click', closeModal );

for ( var i = 0; i < selectPlanButtons.length; i++ )
{
  selectPlanButtons[i].addEventListener( 'click', function ( event ) {
    backdrop.style.display = 'block';
    modal.style.display = 'block';
  } );
}

function closeModal()
{
  backdrop.style.display = 'none';
  modal.style.display = 'none';
}


