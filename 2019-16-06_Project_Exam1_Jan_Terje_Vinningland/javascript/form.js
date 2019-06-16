(function() {

  var constraints = {
    name: {
      presence: true,
    },
    email: {
      presence: true,
      email: true
    },
    message: {
      presence: true,
    },
  };

  document.querySelector(".form")
    .addEventListener("submit", function(ev) {
      ev.preventDefault();
      handleFormSubmit(this);
    });

  function handleFormSubmit(form) {
    var values = validate.collectFormValues(form);
    var errors = validate(values, constraints);

    showErrors(form, errors || {});

    if (!errors) {
      showSuccess();
    }
  }

  function showErrors(form, errors) {
    _.each(form.querySelectorAll("input[name], select[name]"), function(input) {
      showErrorsForInput(input, errors && errors[input.name]);
    });
  }

  function showErrorsForInput(input, errors) {
    var formGroup = closestParent(input.parentNode, "form-group");
    var messages = formGroup.querySelector(".messages");

    resetFormGroup(formGroup);

    if (errors) {
      formGroup.classList.add("has-error");
      _.each(errors, function(error) {
        addError(messages, error);
      });
    } else {
      formGroup.classList.add("has-success");
    }
  }

  function closestParent(child, className) {
    if (!child || child == document) {
      return null;
    }

    if (child.classList.contains(className)) {
      return child;
    } else {
      return closestParent(child.parentNode, className);
    }
  }

  function resetFormGroup(formGroup) {
    formGroup.classList.remove("has-error");
    formGroup.classList.remove("has-success");
    _.each(formGroup.querySelectorAll(".help-block.error"), function(el) {
      el.parentNode.removeChild(el);
    });
  }

  function addError(messages, error) {
    var block = document.createElement("p");
    block.classList.add("help-block");
    block.classList.add("error");
    block.innerHTML = error;
    messages.appendChild(block);
  }

  function showSuccess() {
    alert("Form submitted!");
  }
})();
