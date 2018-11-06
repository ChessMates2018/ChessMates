import axios from "axios"



export function TopofLeaderboard(user1, user2){
let result;
axios.get('/api/leaderboard').then((res) => {
    console.log('TEST LOG!', res.data)
    return res.data
    })







}