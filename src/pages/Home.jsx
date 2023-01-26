import Slider from "../components/Slider"
import Categories from "../components/Categories"
import Products from "../components/Products"
import Newsletter from "../components/Newsletter"


const Home = () => {
  return (
    <>
        <Slider />
        <Categories />
        <h1 style={{textAlign: 'center', margin: '50px 0 5px 0'}}>Most popular</h1>
        <Products pop={true} />
        <Newsletter />
    </>
  )
}

export default Home