import './HomePage.css'
import HomePageBanner from "../../components/HomePageBanner/HomePageBanner"
import Test from '../../components/HomePageBanner/Test';
const HomePage = () => {
  return (
    <div>
      {/* navbar. after they go past a certain vh render it and sticky it to the top */}

      <HomePageBanner />
        
      <Test />
      <h1>asdf</h1>
    </div>
  )
}
export default HomePage