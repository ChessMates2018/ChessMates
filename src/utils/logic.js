
    export function randomizePlayerStart(challenger, challenged){
        let randoCalrizian = Math.random()
        let lightPlayer = ''
        let darkPlayer = ''
        if(randoCalrizian >= .6){
            lightPlayer = challenger
            darkPlayer = challenged
        }else{
            lightPlayer = challenged
            darkPlayer = challenger
        }

        return ({lightPlayer, darkPlayer, randoCalrizian})
        // return true
    }

