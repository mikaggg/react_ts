import React, { useState } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import firebase, { storage, store } from "../atoms/firebase";
import { LinearProgress, Box, Container } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { categorys } from "../atoms/prefectures";
import Resizer from "react-image-file-resizer";

const useStyles = makeStyles((theme: Theme) => ({
    form: {
      width: '100%', // Fix IE 11 issue.
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
    },
    clearButton: {
        display: 'frex',
        justifyContent: 'flexEnd',
    },
}));

interface FormValues {
    siteName: string,
    url: string,
    siteIntroduction: string,
    category: string,
}

const schema = yup.object().shape({
    siteName: yup.string().required("必須項目です"),
    url: yup.string().url("正しいURLを入力してください").required("必須項目です"),
    siteIntroduction: yup.string().required("必須項目です"),
    category: yup.string().required(),
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
    const [progress, setProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [message, setMessage] = useState("");

    const { register, handleSubmit, formState: {errors} } = useForm<FormValues>({
        mode: "onBlur",
        resolver: yupResolver(schema)
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValue({
            ...values,
            [name]: value
        });
        setErrorMessage("");
    };

    const resizeFile = async (file: Blob) =>
        await new Promise((resolve) => {
            Resizer.imageFileResizer(
                file, 200, 160, 'JPEG', 80, 0,
                (uri) => {
                    resolve(uri);
                },
                'base64',
            );
        });

    const handleInputImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileName = e.target.files?.[0].name;
        const blobImage = e.target.files?.[0] as Blob;

        if(fileName !== undefined && blobImage !== undefined ) {
            if (/image.*/.exec(blobImage.type)) {
                const resizeImage = (await resizeFile(blobImage)) as any as string;
                setImage(resizeImage);
                setImageName(fileName);
                setErrorMessage("");
                
            } else {

            }
        }
    };

    const clearInput = () => {
        setValue({siteName: "", url: "", siteIntroduction: "", category: ""});
        setImage("");
        setImageName("");
        setImageUrl("");
    };

    const next = (snapshot: any) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percent);
    };
    const error = (error: any) => {
        setErrorMessage("画像の登録に失敗しました。");
    };
    const complete = () => {
        if(!image) return;
        storage
            .ref("image")
            .child(imageName)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setImageUrl(fireBaseUrl);
            });
        setMessage("サイトの登録が完了しました");
    };

    //画像登録処理
    const upload = async() => {
        console.log("upload!!");
        if (!image) return null;
        await storage.ref(`/image/${imageName}`).putString(image, 'data_url').on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            next,
            error,
            complete,
        );
    }

    const onClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(!values.url || !values.siteIntroduction || !values.category) {
            setErrorMessage("未記入の項目があります")
            return;
        }
        if(!image) {
           setErrorMessage("ファイルが選択されていません");
           return;
        }
        
        await store.runTransaction(async (transaction) => {
            const siteRef = await store.collection("sites");
            const newSiteRef = await siteRef.doc();
            
            await transaction.get(newSiteRef).then(async () => {
                store.collection("sites").add({
                    siteName: values.siteName,
                    url: values.url,
                    siteIntroduction: values.siteIntroduction,
                    category: values.category,
                    imageName: imageName,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                })
                .then((docRef) => {
                    console.log("successfully written!", docRef.id);
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
                upload();
            })
        })
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
                {errorMessage && <Typography color="secondary">{errorMessage}</Typography>}
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
                    <TextField
                        error={!!errors.category}
                        id="category"
                        {...register("category")}
                        variant="outlined"
                        margin="normal"
                        select
                        required
                        fullWidth
                        value={values.category}
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
                        <input
                            type="file"
                            name="image"
                            required
                            className={classes.inputButton}
                            onChange={handleInputImage}
                            accept="image/*"
                        />
                    </Button>
                    {progress > 0 && progress !== 100 &&
                        <div>
                            <LinearProgress variant="determinate" value={progress}/>
                            <Typography>{`${Math.round(progress)}`}%</Typography> 
                        </div>
                    }
                    {image && <p>{imageName}</p>}
                    <img src={imageUrl} alt="" />
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