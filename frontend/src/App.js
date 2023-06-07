import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Log_in.js';
import Profile from './Profile.js';
import Mysubgreddits from './Mysubgreddits';
import Allsubgreddits from './Allsubgreddits';
import Homesubgreddits from './Homesubgreddits';
import Posts from './Posts';
import Savedposts from './Savedposts';
function App() {
return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path ='/profile' element={<Profile/>}/>
      <Route exact path='/' element={<Login/>}/>
      <Route path ='/mysubgreddits' element={<Mysubgreddits/>}/>
      <Route path ='/allsubgreddits' element={<Allsubgreddits/>}/>
      <Route path="/mysubgreddits/:name" element={<Homesubgreddits />} />
      <Route path="/allsubgreddits/:gredditname" element={<Posts />} />
      <Route path ='/savedposts' element={<Savedposts/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
};
export default App;