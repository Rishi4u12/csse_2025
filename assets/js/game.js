if (isValidPathData(pathData)) {
    pathElement.setAttribute('d', pathData);
}
function isValidPathData(pathData) {
    // Checks that pathData is a non-empty string and does not contain only whitespace
    return typeof pathData === 'string' && pathData.trim().length > 0;
}

// ...existing code...
if (isValidPathData(pathData)) {
    pathElement.setAttribute('d', pathData);
}
