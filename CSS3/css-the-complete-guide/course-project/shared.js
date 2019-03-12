var backdrop = document.querySelector( '.backdrop' );
var modal = document.querySelector( '.modal' );
var selectPlanButtons = document.querySelectorAll( '.plan button' );
var selectCloseModalButton = document.querySelector( '.modal__action--negative' );
var toggleBtn = document.querySelector('.toggle-button');
var mobileNav = document.querySelector( '.mobile-nav' );
var ctaBtn = document.querySelector('.main-nav__item--cta');

if (  selectCloseModalButton ) {
  selectCloseModalButton.addEventListener( 'click', closeModal );
}

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
    backdrop.style.display = 'block';
    setTimeout(function (  ) {
      backdrop.classList.add( 'open' );
    }, 10);
    if ( modal )
    {
      modal.classList.add( 'open' );
    }
  } );
}

function closeModal()
{
  /* backdrop.style.display = 'none';
   modal.style.display = 'none';*/

  backdrop.classList.remove( 'open' );

  setTimeout(function (  ) {
    backdrop.style.display = 'none';
  }, 200);

  if ( modal )
  {
    modal.classList.remove( 'open' );
  }
}

toggleBtn.addEventListener('click', function (  ) {
  backdrop.style.display = 'block';
  mobileNav.style.display = 'block';

  setTimeout(function () {
    backdrop.classList.add( 'open' );
    mobileNav.classList.add('open');
  }, 10);
});

ctaBtn.addEventListener('animationstart', function (event) {
  console.log("Animation started", event)
});

ctaBtn.addEventListener('animationend', function (event) {
  console.log("Animation ended", event)
});

ctaBtn.addEventListener('animationiteration', function (event) {
  console.log("Animation iteration", event)
});
