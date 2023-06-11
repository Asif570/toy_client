import Gallery from "../components/Gallery/Gallery";
import HomeBanner from "../components/HomeBanner/HomeBanner";
import OurToys from "../components/OurToys/OurToys";
import CategoryTab from "../components/categoryTab/CategoryTab";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <OurToys />
      <Gallery />
      <CategoryTab />
    </div>
  );
};
export default Home;
