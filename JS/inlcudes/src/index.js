import Person from "./person";
import $ from "jquery";

function watch(nameInput) {
  let nameEntered = "";

  const $element = $(`#${nameInput}`);

  $element.on("input", function name() {
    nameEntered = $(this).val();
    console.log(`Input: ${nameEntered}`);
  });

  return function build(namesContainer) {
    console.log(`Adding: ${nameEntered}`);
    $element.val("");
    $("<li/>")
      .text(nameEntered)
      .appendTo($(`#${namesContainer}`));
  };
}

function newPerson(name) {
  return new Person(name);
}

export { newPerson, watch };
