function moveToNext(currentInput, nextInputID) {
    if (currentInput.value.length === 1) {
        document.getElementById(nextInputID).focus();
    }
}
