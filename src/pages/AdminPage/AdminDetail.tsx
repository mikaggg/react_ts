import { useState, useContext, useEffect } from "react";
import AdminTemplate from "./AdminTemplate";
import { makeStyles, Theme } from "@material-ui/core/";
import { Typography, TextField, Button } from "@material-ui/core/";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import categorys from "../../constants/categorys";
import { SiteContext } from "../../contexts/context";
import { ImageContext } from "../../contexts/imageContext";
import Resizer from "react-image-file-resizer";

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
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

const AdminDetail = (props: any) => {
  const classes = useStyles();
  const { detail, setDetail } = useContext(SiteContext);
  const { image, setImage } = useContext(ImageContext);
  const [beforeImageName, setBeforeImageName] = useState("");

  useEffect(() => {
    setBeforeImageName(detail.imageName);
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleInputChange = (
    e: React.ChangeEvent<{ value: any; name?: any }>
  ) => {
    const { name, value } = e.target;
    setDetail({
      ...detail,
      [name]: value,
    });
  };

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageName = e.target.files?.[0].name;
    const blobImage = e.target.files?.[0] as Blob;

    if (imageName !== undefined && blobImage !== undefined) {
      if (/image.*/.exec(blobImage.type)) {
        const resizeImage = (await resizeFile(blobImage)) as any as string;
        setImage({
          image: resizeImage,
          imageUrl: window.URL.createObjectURL(blobImage),
          imageName: imageName,
          beforeImageName: beforeImageName,
        });
      }
    }
  };

  const onSubmit = (value: FormValues) => {
    props.history.push("/admin/Confirm");
  };

  return (
    <AdminTemplate title="サイト編集">
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.siteName}
          {...register("siteName")}
          label="サイト名"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={detail.siteName}
          helperText={errors.siteName?.message}
          onChange={handleInputChange}
        />
        <TextField
          error={!!errors.url}
          {...register("url")}
          label="サイトURL"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={detail.url}
          helperText={errors.url?.message}
          onChange={handleInputChange}
        />
        <TextField
          error={!!errors.siteIntroduction}
          {...register("siteIntroduction")}
          label="サイト紹介文"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={detail.siteIntroduction}
          multiline
          rows={4}
          helperText={errors.siteIntroduction?.message}
          onChange={handleInputChange}
        />
        <InputLabel id="category-label">*カテゴリーを選択して下さい</InputLabel>
        <Select
          error={!!errors.category}
          {...register("category")}
          label="選択する"
          variant="outlined"
          margin="dense"
          fullWidth
          required
          value={detail.category}
          onChange={handleInputChange}
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
            className={classes.inputButton}
            onChange={handleChangeImage}
            //value={image.imageName}
            accept="image/*"
          />
        </Button>
        <p>{image.imageName}</p>
        <div className={classes.preview}>
          {image.imageUrl && (
            <img className={classes.previewImg} src={image.imageUrl} alt="" />
          )}
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          確認
        </Button>
      </form>
    </AdminTemplate>
  );
};

export default AdminDetail;
