import { useEffect, useState } from "react";
import { Card, makeStyles, Box } from "@material-ui/core";
import CardActionsArea from "@material-ui/core/CardActionArea";
import { CardMedia, Typography, CardContent } from "@material-ui/core";
import { storage, store } from "../config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";

const useStyles = makeStyles({
  hpCard: {
    maxWidth: 250,
    marginBottom: 10,
    marginRight: 20,
  },
});
export interface Data {
  id: string;
  siteName: string;
  url: string;
  siteIntroduction: string;
  imageUrl: string;
}
interface UrlProps {
  param: string | any;
}

const ImgMediaCard: React.FC<UrlProps> = ({
  param = "onlineService",
}: UrlProps) => {
  const classes = useStyles();
  const [sites, setSites] = useState<Data[]>([]);
  console.log(param);

  useEffect(() => {
    (async () => {
      const sitesCollection = collection(store, "sites");
      const q = query(
        sitesCollection,
        where("category", "==", param),
        orderBy("createdAt", "desc")
      );

      try {
        const querySnapshot = await getDocs(q);
        const a = await Promise.all(
          querySnapshot.docs.map((doc) => {
            return getDownloadURL(
              ref(storage, "image/" + doc.data().imageName)
            ).then((imagePath) => {
              return {
                id: doc.id,
                siteName: doc.data().siteName,
                url: doc.data().url,
                siteIntroduction: doc.data().siteIntroduction,
                imageUrl: imagePath,
              };
            });
          })
        );
        setSites(a);
      } catch (error) {
        console.log("エラー：" + error);
      }
    })();
  }, [param]);

  return (
    <Box display="flex" flexWrap="wrap">
      {sites.map((row) => (
        <Card className={classes.hpCard} key={row.id}>
          <CardActionsArea href={row.url} target="_blank">
            <CardMedia
              component="img"
              alt="Contemplative"
              height="140"
              image={row.imageUrl}
              title={row.siteName}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h2">
                {row.siteName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {row.siteIntroduction}
              </Typography>
            </CardContent>
          </CardActionsArea>
        </Card>
      ))}
    </Box>
  );
};

export default ImgMediaCard;
