import React, { useState } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import { Button, InputLabel, TextField, Typography } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { LinearProgress, Box, Container } from "@material-ui/core";
import { Select, MenuItem, SelectChangeEvent } from "@material-ui/core";
import { storage, store } from "../atoms/firebase";
import { collection, doc, serverTimestamp } from "firebase/firestore";
import { runTransaction } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { categorys } from "../atoms/prefectures";
import Resizer from "react-image-file-resizer";

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

const schema = yup.object().shape({
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
  const [values, setValue] = useState<FormValues>({
    siteName: "",
    url: "",
    siteIntroduction: "",
    category: "",
  });
  const [image, setImage] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [message] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({
      ...values,
      [name]: value,
    });
    setErrorMessage("");
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageName = e.target.files?.[0].name;
    const blobImage = e.target.files?.[0] as Blob;

    if (imageName !== undefined && blobImage !== undefined) {
      if (/image.*/.exec(blobImage.type)) {
        const resizeImage = (await resizeFile(blobImage)) as any as string;
        setImage(resizeImage);
        setImageName(imageName);
        setImageUrl(window.URL.createObjectURL(blobImage));
        setErrorMessage("");
      }
    }
  };

  const clearInput = () => {
    setValue({ siteName: "", url: "", siteIntroduction: "", category: "" });
    setImage("");
    setImageName("");
    setImageUrl("");
  };

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!values.url || !values.siteIntroduction || !values.category) {
      setErrorMessage("未記入の項目があります");
      return;
    }
    if (!image) {
      setErrorMessage("ファイルが選択されていません");
      return;
    }

    const storeRef = doc(collection(store, "sites"));
    const data = {
      siteName: values.siteName,
      url: values.url,
      siteIntroduction: values.siteIntroduction,
      category: values.category,
      imageName: imageName,
      createdAt: serverTimestamp(),
    };

    try {
      await runTransaction(store, async (transaction) => {
        const sitesDoc = await transaction.set(storeRef, data);
        if (!sitesDoc) {
          throw "Document dose not exist!";
        }
        const storageRef = ref(storage, "image/" + imageName);
        uploadString(storageRef, image, "data_url")
          .then((snapshot) => {
            console.log("Uploaded a data_url string!");
          })
          .catch(() => {
            setErrorMessage("画像の登録に失敗しました。");
            throw "error: strage upload";
          });
        clearInput();
      });
    } catch (e) {
      console.log("Transaction failed:", e);
    }
  };

  const onSubmit = (data: FormValues) => console.log(data);

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
          {message && <Typography>{message}</Typography>}
          {errorMessage && (
            <Typography color="secondary">{errorMessage}</Typography>
          )}
          <TextField
            error={!!errors.siteName}
            id="siteName"
            {...register("siteName")}
            label="サイト名"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={values.siteName}
            onChange={handleInputChange}
            helperText={errors.siteName?.message}
          />
          <TextField
            error={!!errors.url}
            id="url"
            {...register("url")}
            label="サイトURL"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            value={values.url}
            onChange={handleInputChange}
            helperText={errors.url?.message}
          />
          <TextField
            error={!!errors.siteIntroduction}
            id="siteIntroduction"
            {...register("siteIntroduction")}
            label="サイト紹介文"
            variant="outlined"
            margin="normal"
            fullWidth
            required
            multiline
            rows={4}
            value={values.siteIntroduction}
            onChange={handleInputChange}
            helperText={errors.siteIntroduction?.message}
          />
          <InputLabel id="category-label">
            ★カテゴリーを選択して下さい
          </InputLabel>
          <Select
            error={!!errors.category}
            labelId="category-label"
            id="category"
            {...register("category")}
            variant="outlined"
            margin="none"
            required
            fullWidth
            value={values.category}
            onChange={handleInputChange}
            defaultValue="onlineService"
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
          {progress > 0 && progress !== 100 && (
            <div>
              <LinearProgress variant="determinate" value={progress} />
              <Typography>{`${Math.round(progress)}`}%</Typography>
            </div>
          )}
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
            onClick={onClick}
          >
            送信
          </Button>
        </form>
      </Container>
    </AdminTemplate>
  );
};

export default AdminSiteAdd;
