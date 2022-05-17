import { useState, useContext, useEffect } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import { makeStyles, Theme, LinearProgress } from "@material-ui/core/";
import { Typography, TextField, Button, Input } from "@material-ui/core/";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { categorys } from "../atoms/prefectures";
import { SiteContext } from "../atoms/context";
import { ImageContext } from "../atoms/imageContext";
import { Link } from "react-router-dom";
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

const schema = yup.object().shape({
  siteName: yup.string().required("必須項目です"),
  url: yup.string().url("正しいURLを入力してください").required("必須項目です"),
  siteIntroduction: yup.string().required("必須項目です"),
  category: yup.string().required(),
  image: yup.mixed().required("画像が選択されていません"),
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

const AdminDetail = () => {
  const classes = useStyles();
  const { detail, setDetail } = useContext(SiteContext);
  const { image, setImage } = useContext(ImageContext);
  const [progress, setProgress] = useState(0);
  const [beforeImageName, setBeforeImageName] = useState("");

  useEffect(() => {
    setMessage("");
    setErrorMessage("");
    setProgress(0);
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

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <AdminTemplate title="サイト編集">
      <form className={classes.form} onSubmit={() => handleSubmit(onSubmit)}>
        <TextField
          error={!!errors.siteName}
          id="siteName"
          {...register("siteName")}
          label="サイト名"
          variant="outlined"
          margin="normal"
          fullWidth
          required
          value={detail.siteName}
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
          value={detail.url}
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
          value={detail.siteIntroduction}
          multiline
          rows={4}
          onChange={handleInputChange}
          helperText={errors.siteIntroduction?.message}
        />
        <InputLabel id="category-label">★カテゴリーを選択して下さい</InputLabel>
        <Select
          error={!!errors.category}
          id="category"
          {...register("category")}
          label="選択する"
          variant="outlined"
          margin="dense"
          required
          value={detail.category}
          fullWidth
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
          <Input
            type="file"
            name="image"
            required
            className={classes.inputButton}
            onChange={handleChangeImage}
          />
        </Button>
        {progress > 0 && progress !== 100 && (
          <div>
            <LinearProgress variant="determinate" value={progress} />
            <Typography>{`${Math.round(progress)}`}%</Typography>
          </div>
        )}
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
          component={Link}
          to="/admin/AdminConfirm"
        >
          確認
        </Button>
      </form>
    </AdminTemplate>
  );
};

export default AdminDetail;
