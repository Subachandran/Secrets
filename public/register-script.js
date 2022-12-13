$(document).ready(function () {
  $("#confirmPassword").on("keyup", () => {
    if ($("#confirmPassword").val() !== $("#createPassword").val()) {
      $("#confirmPassword").css(
        "box-shadow",
        "0 0 0 0.25rem rgb(255 0 0 / 25%)"
      );
      $("label[for='confirmPassword']").html("Confirm Password (Not Matched)");
      $("label[for='confirmPassword']").css("color", "red");
    } else {
      $("#confirmPassword:focus + label[for='confirmPassword']").html("Confirm Password (Matched)");
      $("#confirmPassword:focus + label[for='confirmPassword']").css("color", "green");
      $("#confirmPassword:focus").css(
        "box-shadow",
        "0 0 0 0.25rem rgb(0 255 0 / 25%)"
      );
      $("#confirmPassword:not(:focus)").css(
        "box-shadow",
        "0 0 0 0.25rem rgb(13 110 253 / 25%)"
      );
    }
    // alert($("#confirmPassword").val())
  });
});
