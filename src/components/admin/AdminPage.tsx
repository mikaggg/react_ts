import React, { useEffect, useState } from "react";
import AdminTemplate from "../templates/AdminTemplate";
import { Link } from "react-router-dom";
import { store, storage } from "../atoms/firebase";
import { TableBody, TableCell, TableHead, TableRow }from "@material-ui/core";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import { useReducer } from "react";
import { siteDataReducer,initialState } from "../atoms/context";

interface Column {
    id: 'siteName' | 'url' | 'siteIntroduction' | 'imageName' | 'category' | 'createdAt' | 'edit' | 'delete';
    label?: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: Column[] = [
    {id: 'siteName', label: 'サイト名', minWidth: 150},
    {id: 'url', label: 'サイトURL', minWidth: 150},
    {id: 'siteIntroduction', label: 'サイト紹介文', minWidth: 170},
    {id: 'imageName', label: '画像ファイル', minWidth: 150},
    {id: 'category', label: 'カテゴリー', minWidth: 90},
    {id: 'createdAt', label: 'created', minWidth: 150},
    {id: 'edit'},
    {id: 'delete'},
];

export interface Data {
    id: string;
    siteName: string;
    url: string;
    siteIntroduction: string;
    imageName: string;
    imageUrl: string;
    createdAt: number;
    category: string;
    edit: string;
}

const AdminPage: React.FC = () => {
    const [sites, setSites] = useState<Data[]>([]);
    //const [imageUrl, setImageUrl] = useState("");
    const [dataSite, dispatch] = useReducer(siteDataReducer, initialState);
    console.log(dataSite);

    const fetchSitesData = async() => {
        await store.collection("sites").orderBy('createdAt', 'desc').get().then((snapshot) => {
            const newSites: any[] = [];
            snapshot.forEach((doc) => {
                storage.ref("image").child(doc.data().imageName).getDownloadURL()
                    .then(fireBaseUrl => {
                        newSites.push({
                            id:doc.id,
                            siteName: doc.data().siteName,
                            url: doc.data().url,
                            siteIntroduction: doc.data().siteIntroduction,
                            imageName: doc.data().imageName,
                            imageUrl: fireBaseUrl,
                            createdAt: doc.data().createdAt.seconds,
                            category: doc.data().category,   
                        }); 
                });
                   
            });
            if(newSites) setSites(newSites);
        });
    };

    useEffect(() => {
        fetchSitesData();
    }, []);

    sites.map((row) => (
        console.log(row.siteName)
    ))
    
    return (
        <AdminTemplate title="サイト一覧">
            <div><Link to="/admin/adminSiteAdd">新規登録</Link></div>
            <TableHead>
                <TableRow>
                    {columns.map((column) => (
                        <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                        >
                            {column.label}
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {sites.map((row) => (
                    <TableRow key={row.id}>
                        <TableCell>{row.siteName}</TableCell>
                        <TableCell>{row.url}</TableCell>
                        <TableCell>{row.siteIntroduction}</TableCell>
                        <TableCell><img src={row.imageUrl} height="60" alt="" /></TableCell>
                        <TableCell>{row.category}</TableCell>
                        <TableCell>{new Date(row.createdAt * 1000).toLocaleString()}</TableCell>
                        <TableCell>
                            <Link to={{pathname: "/admin/adminDetail"}} onClick={()=>dispatch({type:"detail", payload: row})}>
                                <BorderColorIcon color="primary" />
                            </Link>
                        </TableCell>
                        <TableCell>
                            <Link to={{pathname: "/admin/adminDetail"}} onClick={()=>dispatch({type:"delete", payload: row})}>
                                <DeleteIcon color="primary" />
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </AdminTemplate>
    );
};

export default AdminPage;