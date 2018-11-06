import axios from "axios"

const leaderboardInfo = [];

function getLeaderboardInfo () {
axios.get('/api/leaderboard').then((res) => {
return res.data
})}

getLeaderboardInfo().then(
leaderboardInfo.push(res.data)
)

export function TopofLeaderboard(user1, user2){
//variables
let result;








}