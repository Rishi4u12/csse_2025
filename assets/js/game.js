function isValidPathData(pathData) {
    if (typeof pathData !== 'string' || pathData.trim().length === 0) return false;
    // Only allow valid SVG path commands and numbers, spaces, commas, dots, and minus signs
    const validCommands = 'MmLlHhVvCcSsQqTtAaZz';
    // Split by command letters, keep the letters
    const parts = pathData.trim().split(/([MmLlHhVvCcSsQqTtAaZz])/).filter(Boolean);
    // The first part must be a command
    if (!validCommands.includes(parts[0])) return false;
    // Check all command letters are valid
    for (let i = 0; i < parts.length; i += 2) {
        if (!validCommands.includes(parts[i])) return false;
    }
    // Basic check passed
    return true;
}