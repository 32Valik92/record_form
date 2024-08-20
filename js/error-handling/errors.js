function errResponse(error) {
    console.log(error);
    switch (true) {
        case (error.status === 401):
            console.log(error.responseJSON.Error);
            showAlert('Token is not valid or you are not unauthorized', 'Status: ' + error.responseJSON.Status);
            localStorage.clear();
            // window.location.href = URLS.logout;
            break;
        case (error.responseJSON.Status === "NOK"):
            showAlert("Error: " + error.responseJSON.Error, "Status: " + error.responseJSON.Status);
            break;
        default:
            showAlert('An unexpected error occurred', error.responseJSON.Error);
            break;
    }

}

function showAlert(message, details) {
    alert(message + '\n' + details);
}

const objectErrors = {
    unauthorized: 'unauthorized:Result -> {"ErrorType":"PermissionDeniedError","ErrorCode":"PDE_01","Error":"Permission denied for: ManagementAccountingDictionarymethod: get","Status":"NOK"}'
}
