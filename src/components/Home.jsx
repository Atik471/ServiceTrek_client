import { Helmet } from "react-helmet-async";
import Banner from "./Banner"
import Partners from "./Partners" 
import TopServices from "./TopServices";

const Home = () => {
    
    return (
        <div>
            <Helmet>
                <title>ServiceTrek | Home</title>
            </Helmet>
            <Banner></Banner>
            <TopServices></TopServices>
            <Partners></Partners>
        </div>
    );
};

export default Home;