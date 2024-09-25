import { createRoot } from 'react-dom/client';
import {Camera} from "@capacitor/camera"
import {SplashScreen} from "@capacitor/splash-screen"

const App = ()=>{
    return <div style={{marginTop: 80}} onClick={()=>{
        Camera.pickImages({
            limit: 3,
            
        }).then(res=>{
            console.log(res)
        })
    }}>hello world</div>
}

const rootEle = document.createElement('div');

console.log(document.body)

document.body.appendChild(rootEle);

const root = createRoot(rootEle);

root.render(<App />);

SplashScreen.hide();