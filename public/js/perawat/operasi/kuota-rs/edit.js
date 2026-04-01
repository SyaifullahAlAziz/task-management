$(document).ready(function () {
    const successMessage = $("#kuotaRSForm").data("success-message");
    const errorMessage = $("#kuotaRSForm").data("error-message");
    if (successMessage) {
        toastr.success(successMessage);
    }
    if (errorMessage) {
        toastr.error(errorMessage);
    }

});
