var backdrop = document.querySelector( '.backdrop' );
var modal = document.querySelector( '.modal' );
var selectPlanButtons = document.querySelectorAll( '.plan button' );
var selectCloseModalButton = document.querySelector( '.modal__action--negative' );
var toggleBtn = document.querySelector('.toggle-button');
var mobileNav = document.querySelector( '.mobile-nav' );

selectCloseModalButton.addEventListener( 'click', closeModal );
backdrop.addEventListener( 'click', function () {
  closeModal();
  // mobileNav.style.display = 'none';
  mobileNav.classList.remove('open');
} );

for ( var i = 0; i < selectPlanButtons.length; i++ )
{
  selectPlanButtons[i].addEventListener( 'click', function ( event ) {
    /*backdrop.style.display = 'block';
    modal.style.display = 'block';*/
    backdrop.classList.add( 'open' );
    modal.classList.add( 'open' );
  } );
}

function closeModal()
{
 /* backdrop.style.display = 'none';
  modal.style.display = 'none';*/
  backdrop.classList.remove( 'open' );
  modal.classList.remove( 'open' );
}

toggleBtn.addEventListener('click', function (  ) {
  /*mobileNav.style.display = 'block';
  backdrop.style.display = 'block';*/
  backdrop.classList.add( 'open' );
  mobileNav.classList.add('open');
});


