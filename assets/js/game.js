function isValidPathData(pathData) {
    try {
        // Basic input validation
        if (typeof pathData !== 'string' || pathData.trim().length === 0) {
            return false;
        }

        const validCommands = 'MmLlHhVvCcSsQqTtAaZz';
        const parts = pathData.trim().split(/([MmLlHhVvCcSsQqTtAaZz])/).filter(Boolean);

        // Path must start with a command
        if (!validCommands.includes(parts[0])) {
            return false;
        }

        // Validate commands and their parameters
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i].trim();
            
            // Check commands
            if (i % 2 === 0) {
                if (!validCommands.includes(part)) {
                    return false;
                }
            } 
            // Check parameters
            else {
                // Parameters should only contain numbers, spaces, commas, dots, and minus signs
                if (!/^[\d\s,.\-eE]*$/.test(part)) {
                    return false;
                }
            }
        }

        return true;
    } catch (error) {
        console.error('Error validating path data:', error);
        return false;
    }
}

// Test cases
console.log(isValidPathData('M0,0 L100,100')); // true
console.log(isValidPathData('tc0.2,0,0.4,-0.2,0')); // false
console.log(isValidPathData('M10 20 L30 40')); // true
console.log(isValidPathData('')); // false