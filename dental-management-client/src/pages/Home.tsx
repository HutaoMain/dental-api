import Calendar from "../components/Calendar";
import Header from "../components/Header";
import Services from "../components/Services";

const Home = () => {
  return (
    <div className="flex items-center flex-col">
      <Header />
      <Services />
      <Calendar />
    </div>
  );
};

export default Home;
