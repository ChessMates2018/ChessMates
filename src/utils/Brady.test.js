const {TopofLeaderboard} = require('./Brady_logic')

describe("Top rated users' informations are being returned correctly", () => {
    test("returns the highest rated user first", () => {
        expect(TopofLeaderboard("Knight")).toBe(true)
    })
    test("highest rated players will have a rating greater than 1000", () => {
        expect(TopofLeaderboard(1000)).toBeTruthy()
    })
    test("users on leaderboard will not always have a picture retrieved to be displayed", () => {
        expect(TopofLeaderboard('test3')).toBe(false)
    })
    test("second ranked player will have a rating of 90000", () => {
        expect(TopofLeaderboard('Rook')).toBe(90000)
    })
    test("Players lower in ranking will have less, or equal, rating than those higher in ranking", () => {
        expect(TopofLeaderboard('test 5')).toBeLessThanOrEqual(90000)
    })
})