 // let {setLightPlayer, setDarkPlayer, username} = this.props
    // var randoCalrizian = Math.random();
    // console.log(randoCalrizian)
    // if(randoCalrizian >= .6){
    //   setLightPlayer(username)
    // } else {
    //   setDarkPlayer(username)
    // }

    function randomizePlayerStart(challenger, challenged){
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

        return (lightPlayer, darkPlayer)
    }