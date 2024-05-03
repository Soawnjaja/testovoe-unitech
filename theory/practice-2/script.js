document.addEventListener('DOMContentLoaded', function() {
    const modal = document.querySelector('.modal');
    const form = document.querySelector('.form');
    const openModalBtn = document.querySelector('.open-modal');
    const closeModalBtn = document.querySelector('.close-modal');

  function toggleModal() {
    modal.classList.toggle('modal__hidden');
  }
  openModalBtn.addEventListener('click', toggleModal);
  closeModalBtn.addEventListener('click', toggleModal);


    function validateForm() {
      if (!form.checkValidity()) {
        form.reportValidity();
        return false;
      }
      return true;
    }
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {
        alert('Форма отправлена!');
        toggleModal();
      }
    });
  });



