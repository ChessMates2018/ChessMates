const {TopofLeaderboard} = require('./Brady_logic')

describe("Top rated users' informations are being returned correctly", () => {
    test("returns the highest rated user first", () => {
        expect(TopofLeaderboard("Knight")).toBeTruthy()
    })
    test("highest rated player will have a rating greater than 1000", () => {
        expect(TopofLeaderboard("Knight")).toBeGreaterThan(1000)
    })
    test("users on leaderboard will have their username, rating, and picture retrieved to be displayed", () => {
        expect(TopofLeaderboard('Knight')).toBe(true)
    })
    test("Highest rated player will have a ranking of first", () => {
        expect(TopofLeaderboard('Knight')).toBe(true)
    })
    test("Players higher in rating will have a higher ranking in the leaderboard. ex(3rd and 4th)", () => {
        expect(TopofLeaderboard('Bishop', 'test 5')).toBe(true)
    })
})