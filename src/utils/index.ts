export function getSubArrayAfterNumber(arr: number[], num: number): number[] {
    const index = arr.indexOf(num);
    if (index === -1) {
        return []; // Return an empty array if the number is not found
    }
    return arr.slice(index + 1); // Get the sub-array after the specified number
}


export function convertSecondsToMMSS(totalSeconds?: number): string {
    const t = (Number.isNaN(totalSeconds) ? 0 : totalSeconds) ?? 0;
    const minutes = Math.floor(t / 60);
    const seconds = Math.round(t % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function createArray(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
}
export function createArrayWithValue(n: number, value: number): number[] {
    return Array.from({ length: n }, () => value);
}

// Example usage
const result = createArrayWithValue(5, 3); // Returns: [3, 3, 3, 3, 3]
console.log(result);


export function createShuffleArray(n: number, priority = -1): number[] {
    // Create an array from 0 to n - 1
    const array = Array.from({ length: n }, (_, index) => index);

    // Check if priority is valid
    if (priority >= 0 && priority < n) {
        // Remove priority from the array
        const index = array.indexOf(priority);
        if (index !== -1) {
            array.splice(index, 1); // Remove the priority element
        }
    } else {
        priority = -1; // Reset priority if invalid
    }

    // Shuffle the array using Fisher-Yates algorithm
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }

    // If priority is valid, prepend it to the shuffled array
    if (priority !== -1) {
        return [priority, ...array];
    }

    return array; // Return the shuffled array
}