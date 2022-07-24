import { useEffect, useState } from "react";
import { Card, makeStyles, Box } from "@material-ui/core";
import CardActionsArea from "@material-ui/core/CardActionArea";
import { CardMedia, Typography, CardContent } from "@material-ui/core";
import { storage, store } from "../config/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles({
  hpCard: {
    maxWidth: 250,
    minWidth: 250,
    minHeight: 300,
    marginBottom: 10,
    marginRight: 20,
  },
  root: {
    display: "inline-block",
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
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [allItems, setAllItems] = useState<Data[]>();
  const [displayedItems, setDisplayedItems] = useState<Data[]>();
  const displayNum = 10;

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
        setAllItems(a);
        setPageCount(Math.ceil(a.length / displayNum));
        setDisplayedItems(a.slice((page - 1) * displayNum, page * displayNum));
      } catch (error) {
        console.log("エラー：" + error);
      }
    })();
  }, [param]);

  const handleChange = (e: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    setDisplayedItems(
      allItems?.slice((page - 1) * displayNum, page * displayNum)
    );
  };

  return (
    <>
      <Box display="flex" flexWrap="wrap">
        {displayedItems?.map((row) => (
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
      <div className={classes.root}>
        <Pagination count={pageCount} page={page} onChange={handleChange} />
      </div>
    </>
  );
};

export default ImgMediaCard;
