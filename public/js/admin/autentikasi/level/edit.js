$(document).ready(function () {
    const successMessage = $("#formLevelEdit").data("success-message");
    const errorMessage = $("#formLevelEdit").data("error-message");

    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }
});
