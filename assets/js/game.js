function isValidPathData(pathData) {
    // Checks that pathData is a non-empty string and does not contain only whitespace
    if (typeof pathData !== 'string' || pathData.trim().length === 0) return false;
    // Basic SVG path validation: starts with M/m, contains only valid commands
    return /^[MmLlHhVvCcSsQqTtAaZz][0-9,\s\.\-]+$/.test(pathData.trim());
}