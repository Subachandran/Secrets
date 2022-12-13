$(document).ready(function () {
  $("#confirmPassword").on("keyup", () => {
    if ($("#confirmPassword").val() !== $("#createPassword").val()) {
      $("#confirmPassword").addClass("is-invalid");
      $(".invalid-feedback").show()
      $(".valid-feedback").hide()
    } else {
      $(".subBtn").removeClass("disabled");
      $("#confirmPassword").removeClass("is-invalid").addClass("is-valid");
      $(".invalid-feedback").hide()
      $(".valid-feedback").show()
    }
  });
});
