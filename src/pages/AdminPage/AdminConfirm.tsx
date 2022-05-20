import { useContext } from "react";
import AdminTemplate from "./AdminTemplate";
import { SiteContext } from "../../contexts/context";
import { Button, Grid, Paper } from "@material-ui/core";
import { TableBody, TableCell, TableContainer } from "@material-ui/core";
import { TableRow, Table } from "@material-ui/core";
import { Link } from "react-router-dom";
import categorys from "../../constants/categorys";
import { ref, uploadString, deleteObject } from "firebase/storage";
import { storage, store } from "../../config/firebase";
import { doc, serverTimestamp, runTransaction } from "firebase/firestore";
import { ImageContext } from "../../contexts/imageContext";
import "../../App.css";

const AdminConfirm = (props: any) => {
  const { detail } = useContext(SiteContext);
  const { image } = useContext(ImageContext);

  const onClick = async () => {
    const data = {
      siteName: detail.siteName,
      url: detail.url,
      siteIntroduction: detail.siteIntroduction,
      category: detail.category,
      imageName: image.imageName,
      createdAt: serverTimestamp(),
    };
    console.log(detail);

    try {
      await runTransaction(store, async (transaction) => {
        const storeRef = await doc(store, "sites", detail.id);
        await transaction.update(storeRef, data);
        if (image.imageName !== image.beforeImageName) {
          const storageRef = ref(storage, "image/" + image.imageName);
          await uploadString(storageRef, image.image, "data_url");
          const desertRef = ref(storage, "image/" + image.beforeImageName);
          await deleteObject(desertRef);
        }
      });
    } catch (e) {
      alert("更新エラー:" + e);
    }
    props.history.push("/admin/home");
  };

  return (
    <AdminTemplate title="確認画面">
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>サイト名</TableCell>
              <TableCell>{detail.siteName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>URL</TableCell>
              <TableCell>{detail.url}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>紹介文</TableCell>
              <TableCell>{detail.siteIntroduction}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>カテゴリー</TableCell>
              <TableCell>{detail.category}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
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
