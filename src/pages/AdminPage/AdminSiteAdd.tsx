import React, { useState } from "react";
import AdminTemplate from "./AdminTemplate";
import { Button, InputLabel, TextField, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Box, Container, MenuItem, Select } from "@material-ui/core";
import { storage, store } from "../../config/firebase";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { runTransaction } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import categorys from "../../constants/categorys";
import Resizer from "react-image-file-resizer";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0),
  },
  inputButton: {
    opacity: "0",
    appearance: "none",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  uploadButton: {
    marginBottom: theme.spacing(2),
  },
  clearButton: {
    display: "frex",
    justifyContent: "flexEnd",
  },
  preview: {
    width: "300px",
  },
  previewImg: {
    width: "100%",
  },
}));

interface FormValues {
  siteName: string;
  url: string;
  siteIntroduction: string;
  category: string;
}

const schema = yup.object({
  siteName: yup.string().required("必須項目です"),
  url: yup.string().url("正しいURLを入力してください").required("必須項目です"),
  siteIntroduction: yup.string().required("必須項目です"),
  category: yup.string().required(),
});

const resizeFile = (file: Blob) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      200,
      160,
      "JPEG",
      80,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const AdminSiteAdd: React.FC = () => {
  const classes = useStyles();
  const [image, setImage] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageName = e.target.files?.[0].name;
    const blobImage = e.target.files?.[0] as Blob;
    console.log(e.target.files);

    if (imageName !== undefined && blobImage !== undefined) {
      if (/image.*/.exec(blobImage.type)) {
        const resizeImage = (await resizeFile(blobImage)) as any as string;
        setImage(resizeImage);
        setImageName(imageName);
        setImageUrl(window.URL.createObjectURL(blobImage));
      }
    }
  };

  const clearInput = () => {
    setImage("");
    setImageName("");
    setImageUrl("");
    reset();
  };

  const onSubmit = async (value: FormValues) => {
    const storeRef = doc(collection(store, "sites"));
    const data = {
      siteName: value.siteName,
      url: value.url,
      siteIntroduction: value.siteIntroduction,
      category: value.category,
      imageName: imageName,
      createdAt: serverTimestamp(),
    };

    try {
      await runTransaction(store, async (transaction) => {
        await transaction.set(storeRef, data);
        const storageRef = ref(storage, "image/" + imageName);
        await uploadString(storageRef, image, "data_url");
        history.push("/admin/home");
      });
    } catch (e) {
      console.log("Transaction failed:", e);
    }
  };

  return (
    <AdminTemplate title="サイト追加">
      <Container component="main" maxWidth="sm">
        <Box display="flex" flexDirection="row-reverse">
          <Button
            className={classes.clearButton}
            variant="outlined"
            color="primary"
            onClick={clearInput}
          >
            CLEAR
          </Button>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            error={!!errors.siteName}
            {...register("siteName")}
            label="サイト名"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            helperText={errors.siteName?.message}
          />
          <TextField
            error={!!errors.url}
            {...register("url")}
            label="URL"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            helperText={errors.url?.message}
          />
          <TextField
            error={!!errors.siteIntroduction}
            {...register("siteIntroduction")}
            label="サイト説明文"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            multiline
            rows={4}
            helperText={errors.siteName?.message}
          />
          <InputLabel id="category-label">
            ★カテゴリーを選択して下さい
          </InputLabel>
          <Select
            labelId="category-label"
            error={!!errors.category}
            {...register("category")}
            label="サイト名"
            variant="outlined"
            margin="dense"
            fullWidth
            required
          >
            {categorys.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
          <Typography>*サイト画像</Typography>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<CloudUploadIcon />}
            className={classes.uploadButton}
          >
            UPLOAD
            <input
              type="file"
              name="image"
              required
              className={classes.inputButton}
              onChange={handleChangeImage}
              accept="image/*"
            />
          </Button>
          {image && <p>{imageName}</p>}
          <div className={classes.preview}>
            <img className={classes.previewImg} src={imageUrl} alt="" />
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            送信
          </Button>
        </form>
      </Container>
    </AdminTemplate>
  );
};

export default AdminSiteAdd;
