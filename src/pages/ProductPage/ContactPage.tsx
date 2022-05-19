import React, { useState } from "react";
import GenericTemplate from "../../components/GenericTemplate";
import { Button, CssBaseline, Container } from "@material-ui/core";
import { TextField, Typography, makeStyles } from "@material-ui/core";
import prefectures from "../../constants/prefectures";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  company: string;
  charge: string;
  pref: string;
  municipality: string;
  email: string;
  tel: string;
  site: string;
  inquiry: string;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    color: "red",
  },
}));

const schema = yup.object().shape({
  company: yup.string().required("会社名は必須項目です"),
  charge: yup.string().required("担当者名は必須項目です"),
  pref: yup.string().required("都道府県は必須項目です"),
  municipality: yup.string().required("市区郡町村は必須項目です"),
  email: yup
    .string()
    .lowercase()
    .email("正しいメールアドレスを指定して下さい。")
    .required("メールアドレスは必須項目です"),
  tel: yup
    .string()
    .matches(/^0\d+$/, "電話番号を入力して下さい")
    .required("電話番号は必須項目です"),
  site: yup.string().url("正しいURLを入力してください"),
  //site: yup.string().matches(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, "正しいURLを入力して下さい").required("URLは必須項目です"),
  inquiry: yup.string().required("必須項目です"),
});

const ContactPage: React.FC = () => {
  const classes = useStyles();
  const [values, setValue] = useState<FormValues>({
    company: "",
    charge: "",
    pref: "",
    municipality: "",
    email: "",
    tel: "",
    site: "",
    inquiry: "",
  });

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
  };
  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <GenericTemplate title="お問い合わせ">
      お問い合わせページ
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <div className={classes.paper}>
          <Typography>
            <span className={classes.span}>★</span>は必須項目です
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              error={!!errors.company}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="company"
              label="会社名"
              value={values.company}
              helperText={errors.company?.message}
              {...register("company")}
              onChange={handleInputChange}
            />
            <TextField
              error={!!errors.charge}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="担当者名"
              id="charge"
              {...register("charge")}
              onChange={handleInputChange}
              value={values.charge}
              helperText={errors.charge?.message}
            />
            <TextField
              error={!!errors.pref}
              variant="outlined"
              margin="normal"
              select
              required
              fullWidth
              id="pref"
              {...register("pref")}
              value={values.pref}
              onChange={handleInputChange}
              label="選択する"
              helperText="★都道府県を選択して下さい"
            >
              {prefectures.map((options) => (
                <option key={options.value} value={options.value}>
                  {options.label}
                </option>
              ))}
            </TextField>
            <TextField
              error={!!errors.municipality}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="市区町村"
              id="municipality"
              {...register("municipality")}
              onChange={handleInputChange}
              value={values.municipality}
              helperText={errors.municipality?.message}
            />
            <TextField
              error={!!errors.email}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="メールアドレス"
              id="email"
              {...register("email")}
              value={values.email}
              onChange={handleInputChange}
              helperText={errors.email?.message}
            />
            <TextField
              error={!!errors.tel}
              variant="outlined"
              margin="normal"
              type="tel"
              required
              fullWidth
              label="電話番号"
              id="tel"
              {...register("tel")}
              value={values.tel}
              onChange={handleInputChange}
              helperText={errors.tel?.message}
            />
            <TextField
              error={!!errors.site}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="貴社サイト"
              id="site"
              {...register("site")}
              value={values.site}
              onChange={handleInputChange}
              helperText={errors.site?.message}
            />
            <TextField
              error={!!errors.inquiry}
              variant="outlined"
              margin="normal"
              multiline
              required
              fullWidth
              rows={8}
              label="お問い合わせ"
              id="inquiry"
              {...register("inquiry")}
              value={values.inquiry}
              onChange={handleInputChange}
              helperText={errors.inquiry?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              登録
            </Button>
          </form>
        </div>
      </Container>
    </GenericTemplate>
  );
};

export default ContactPage;
