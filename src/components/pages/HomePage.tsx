import { useParams } from "react-router-dom";
import GenericTemplate from "../templates/GenericTemplate";
import ImgMediaCard from "../pages/ImgMediaCard";
interface UrlProps {
  param: string;
}

const HomePage: React.FC = () => {
  let { param } = useParams<UrlProps>();
  return (
    <GenericTemplate title={param}>
      <ImgMediaCard param={param} />
    </GenericTemplate>
  );
};
export default HomePage;
