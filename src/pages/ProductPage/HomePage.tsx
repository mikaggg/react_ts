import { useParams } from "react-router-dom";
import GenericTemplate from "../../components/GenericTemplate";
import ImgMediaCard from "../../components/ImgMediaCard";
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
