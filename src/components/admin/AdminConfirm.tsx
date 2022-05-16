import { useContext, useState } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import { SiteContext } from "../atoms/context";
import { Button, Typography, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { categorys } from "../atoms/prefectures";
import { ref, uploadString, deleteObject } from "firebase/storage";
import { storage, store } from "../atoms/firebase";
import { doc, serverTimestamp, runTransaction } from "firebase/firestore";
import { ImageContext } from "../atoms/imageContext";
import "../../App.css";

const AdminConfirm = () => {
  const { detail } = useContext(SiteContext);
  const { image } = useContext(ImageContext);
  const [errorMessage, setErrorMessage] = useState("");

  const onClick = async () => {
    const data = {
      siteName: detail.siteName,
      url: detail.url,
      siteIntroduction: detail.siteIntroduction,
      category: detail.category,
      imageName: image.imageName,
      createdAt: serverTimestamp(),
    };

    const storeRef = doc(store, "sites", detail.id);
    try {
      await runTransaction(store, async (transaction) => {
        const sitesDoc = await transaction.set(storeRef, data);
        if (!sitesDoc) {
          throw "Document dose not exist!";
        }
        const storageRef = ref(storage, "image/" + image.imageName);
        uploadString(storageRef, image.image, "data_url")
          .then((snapshot) => {
            console.log("success!");
            const desertRef = ref(storage, "image/" + image.beforeImageName);
            deleteObject(desertRef)
              .then(() => {
                console.log("success: delete beforeImage");
              })
              .catch((error) => {
                console.log("storage delete Error:" + error);
              });
          })
          .catch(() => {
            setErrorMessage("画像の登録に失敗しました。");
            throw "error: strage upload";
          });
      });
    } catch (e) {}
  };

  return (
    <AdminTemplate title="確認画面">
      {errorMessage && (
        <Typography color="secondary">{errorMessage}</Typography>
      )}
      <p>{detail.siteName}</p>
      <p>{detail.url}</p>
      <p>{detail.siteIntroduction}</p>
      <p>{detail.category}</p>
      <p className="preview">
        <img className="previewImg" src={image.imageUrl} alt="" />
      </p>
      <Grid container spacing={2}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/AdminDetail"
          >
            戻る
          </Button>
        </Grid>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            component={Link}
            to="/admin/home"
            onClick={onClick}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    </AdminTemplate>
  );
};

export default AdminConfirm;
