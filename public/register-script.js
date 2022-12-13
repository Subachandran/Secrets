$(document).ready(function () {
  $("#confirmPassword").on("keyup", () => {
    if ($("#confirmPassword").val() !== $("#createPassword").val()) {
      $("#confirmPassword").addClass("is-invalid");
    } else {
      $(".subBtn").removeClass("disabled");
      $("#confirmPassword").removeClass("is-invalid").addClass("is-valid");
    }
  });
});
