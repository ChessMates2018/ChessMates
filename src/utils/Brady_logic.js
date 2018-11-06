const leaderboard = require('./Brady_mocks.js/leaderboard.json')

//leaderboard json file is an actual 'get' request to database for information to be displayed on leaderboard.

export function TopofLeaderboard(data1, data2){
let result1;
let result2;
let result3;
let result4;
let result5;

for(let i = 0; i < leaderboard.length; i++){
    if(leaderboard[i].username === data1 && data1 === leaderboard[0].username){
        return result1 = true
    }
    else if(leaderboard[i].rating >= data1){
        return result2 = true
    }
    else if(leaderboard[i].username === data1 && leaderboard[i].image == null){
        return result3 = false
    }
    else if(leaderboard[i].username === data1){
        return result4 = leaderboard[i].rating
    }
    else if(leaderboard[i].username === data1){
        return result5 = leaderboard[i].rating
    }
}
}