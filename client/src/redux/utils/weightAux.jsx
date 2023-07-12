export function extractWeightValue(weight) {
    const [min] = weight.split(" - ");
    return {
        min: parseInt(min),
    }
}

export function compareWeight(a, b) {
    const weightA = extractWeightValue(a.weight)
    const weightB = extractWeightValue(b.weight)
    return weightA.min - weightB.min
}
