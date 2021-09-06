import React, { useState, useContext } from "react";
import AdminTemplate from "../templates/AdminTemplate";
//import firebase, { storage, store } from "../atoms/firebase";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Typography, TextField, Button, Input } from "@material-ui/core/";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { LinearProgress } from "@material-ui/core";
import { categorys } from "../atoms/prefectures";
import { SiteContext } from "../atoms/context";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0),
    },
    inputButton: {
        opacity: '0',
        appearance: 'none',
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    uploadButton: {
        marginBottom: theme.spacing(2),
    }
}));

interface FormValues {
    url: string,
    siteIntroduction: string,
    category: string,
    image: File | undefined,
}

const schema = yup.object().shape({
    url: yup.string().url("正しいURLを入力してください").required("必須項目です"),
    siteIntroduction: yup.string().required("必須項目です"),
    category: yup.string().required(),
    image: yup.mixed().required("画像が選択されていません"),
});

const AdminDetail: React.FC = () => {
    const classes = useStyles();
    const data = useContext(SiteContext);
    console.log(data);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [progress, setProgress] = useState(0);
    const [imageUrl, setImageUrl] = useState("");
    setMessage("");
    setErrorMessage("");
    setProgress(0);
    const [values, setValue] = useState<FormValues>({
        url: "",
        siteIntroduction: "",
        category: "",
        image: undefined,
    });
    const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValue({
            ...values,
            [name]: value
        });
        if(!e.target.files) {
            return;
        } else {
            setImageUrl(e.target.files[0].name);
        }
    };

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    const onSubmit = (data: FormValues) => console.log(data);

    return (
        <AdminTemplate title="サイト編集">
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            {message && <Typography>{message}</Typography>}
            {errorMessage && <Typography color="secondary">{errorMessage}</Typography>}
                <TextField
                    error={!!errors.url}
                    id="url"
                    {...register("url")}
                    label="サイトURL"
                    variant="outlined"
                    margin="normal" 
                    fullWidth
                    required
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
                    onChange={handleInputChange}
                    helperText={errors.siteIntroduction?.message}
                />
                <TextField
                    error={!!errors.category}
                    id="category"
                    {...register("category")}
                    variant="outlined"
                    margin="normal"
                    select
                    required
                    fullWidth
                    label="選択する"
                    onChange={handleInputChange}
                    helperText= "★カテゴリーを選択して下さい"
                >
                    {categorys.map((category) => (
                        <option key={category.value} value={category.value}>
                            {category.label}
                        </option>
                    ))}
                </TextField>
                <Typography>
                    *サイト画像
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                    className={classes.uploadButton}   
                >
                    UPLOAD
                    <Input
                        error={!!errors.image}
                        id="image"
                        {...register("image")}
                        type="file"
                        required
                        className={classes.inputButton}
                        onChange={handleInputChange}
                    />
                </Button>
                {progress > 0 && progress !== 100 &&
                    <div>
                        <LinearProgress variant="determinate" value={progress}/>
                        <Typography>{`${Math.round(progress)}`}%</Typography> 
                    </div>
                }
                {imageUrl && <img src={imageUrl} alt="" />}
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
        </AdminTemplate>
    );
};

export default AdminDetail;