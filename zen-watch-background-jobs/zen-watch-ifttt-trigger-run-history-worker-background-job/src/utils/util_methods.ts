// write a function that takes a number and returns a random number between 0 and the number
export function _getRandomNumber(max: number) {
    return Math.floor(Math.random() * max);
}

// write a function that to get a random shard number
export function getRandomShardNumber(no_of_shards: number) {
    const worker_shards = Number(no_of_shards);
    return _getRandomNumber(worker_shards);
}