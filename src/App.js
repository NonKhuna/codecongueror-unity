import Unity, { UnityContext } from "react-unity-webgl";
import React, { Fragment, useEffect, useState } from "react";

const unityContext = new UnityContext({
  loaderUrl: "build/app.loader.js",
  dataUrl: "build/app.data",
  frameworkUrl: "build/app.framework.js",
  codeUrl: "build/app.wasm",
});

function App() {

    const [isLoaded, setLoaded] = useState(false);
    const [herohealth, setHeroHealth] = useState(100);
    const [enemyhealth, setEnemyHealth] = useState(100);
    const demoData = {name:"non", handsome:100, damage:10};

    function tricker1() {
        unityContext.send("GameController", "TrickEnemyButton1");
    }
    function tricker2() {
        unityContext.send("GameController", "TrickEnemyButton2");
    }
    function tricker3() {
        unityContext.send("GameController", "TrickEnemyButton3");
    }

    function initial() {
        unityContext.send("GameController", "receiveData", JSON.stringify(demoData));
    }

    useEffect(function(){
        unityContext.on("HeroHealth", function (hp) {
            setHeroHealth(hp);
        });
        unityContext.on("EnemyHealth", function (hp) {
            setEnemyHealth(hp);
        });
    }, []);

    return <Fragment>
        <h1>React Unity WebGL Test</h1>
        <button onClick={tricker1}>tricker1</button>
        <button onClick={tricker2}>tricker2</button>
        <button onClick={tricker3}>tricker3</button>
        <button onClick={initial}>sendData</button>
        <p>Hero health = {herohealth}</p>
        <p>Enemy health = {enemyhealth}</p>
        <Unity 
            unityContext={unityContext}
            style={{
                width: 544,
                height: 306,
                border: "2px solid black",
                background: "grey",
              }}
        />
    </Fragment>
}

export default App;