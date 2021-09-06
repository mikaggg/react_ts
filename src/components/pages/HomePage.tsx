import React, { useState, useEffect } from "react";
import GenericTemplate from "../templates/GenericTemplate";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionsArea from "@material-ui/core/CardActionArea";
import { CardMedia, Typography, CardContent, Box } from "@material-ui/core";
import { storage, store } from "../atoms/firebase";
import { useParams } from "react-router-dom";
//import { RouteComponentProps } from "react-router";

const useStyles = makeStyles({
    hpCard: {
        maxWidth: 250,
        marginBottom: 10,
        marginRight: 10,
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
    param: string;
}

const ImgMediaCard: React.FC<UrlProps> = (props) => {
    const classes = useStyles();
    const [sites, setSites] = useState<Data[]>([]);
    const [param, setParam] = useState("");
    const new_param = props.param;
    //console.log(new_param);
    
    const sitesData = async() => {
        //console.log(param);
        await store.collection("sites").where("category","==",param).orderBy('createdAt', 'desc').get().then((snapshot) => {
            const siteList: any[] =[];
            snapshot.forEach((doc) => {
                storage.ref("image").child(doc.data().imageName).getDownloadURL()
                    .then(fireBaseUrl => {
                        siteList.push({
                            id:doc.id,
                            siteName: doc.data().siteName,
                            imageUrl: fireBaseUrl,
                            siteIntroduction: doc.data().siteIntroduction,
                            url: doc.data().url,
                        });
                });   
            });
            if(siteList) setSites(siteList);
        })
    };


    useEffect(() => {
        if(new_param){
            setParam(new_param);
            sitesData();
        }

    }, []);

    return (
        <Box display="flex" flexDirection="row">
            {sites.map((row) => (
                <React.Fragment key={row.id}>
                    <Card className={classes.hpCard}>
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
                </React.Fragment>  
            ))} 
        </Box>
    );
};

const HomePage: React.FC = () => {
    const { param } = useParams<UrlProps>();
    return (
        <GenericTemplate title={param}>
            <ImgMediaCard param={param}/>
        </GenericTemplate>
    );
};

export default HomePage;