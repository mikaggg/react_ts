import React, { useEffect, useState, useContext } from "react";
import AdminTemplate from "./AdminTemplate";
import { Link } from "react-router-dom";
import { store, storage } from "../../config/firebase";
import { TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { SiteContext } from "../../contexts/context";
import { ImageContext } from "../../contexts/imageContext";
import DeleteModal from "./modal/DeleteModal";
import categorys from "../../constants/categorys";

interface Column {
  id:
    | "no"
    | "siteName"
    | "url"
    | "siteIntroduction"
    | "imageName"
    | "category"
    | "createdAt"
    | "edit"
    | "delete";
  label?: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "no", label: "No" },
  { id: "siteName", label: "サイト名", minWidth: 150 },
  { id: "url", label: "サイトURL", minWidth: 150 },
  { id: "siteIntroduction", label: "サイト紹介文", minWidth: 170 },
  { id: "imageName", label: "画像ファイル", minWidth: 150 },
  { id: "category", label: "カテゴリー", minWidth: 150 },
  { id: "createdAt", label: "created", minWidth: 150 },
  { id: "edit" },
  { id: "delete" },
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
  categoryName: string;
}

const AdminPage: React.FC = () => {
  const [sites, setSites] = useState<Data[]>([]);
  const { setDetail } = useContext(SiteContext);
  const { image, setImage } = useContext(ImageContext);
  const [showModal, setShowModal] = useState(false);

  const setContext = (row: any) => {
    setDetail({
      id: row.id,
      siteName: row.siteName,
      url: row.url,
      siteIntroduction: row.siteIntroduction,
      imageName: row.imageName,
      category: row.category,
      categoryName: row.categoryName,
    });
    setImage({
      ...image,
      imageName: row.imageName,
      imageUrl: row.imageUrl,
      beforeImageName: row.imageName,
    });
  };

  const DeleteModalShow = (row: any) => {
    setShowModal(true);
    setContext(row);
  };

  useEffect(() => {
    (async () => {
      const sitesCollection = collection(store, "sites");
      const q = query(sitesCollection, orderBy("createdAt", "desc"));

      try {
        let querySnapshot = await getDocs(q);
        let a = await Promise.all(
          querySnapshot.docs.map((doc) => {
            return getDownloadURL(
              ref(storage, "image/" + doc.data().imageName)
            ).then((imageUrl) => {
              return {
                id: doc.id,
                siteName: doc.data().siteName,
                url: doc.data().url,
                siteIntroduction: doc.data().siteIntroduction,
                imageName: doc.data().imageName,
                imageUrl: imageUrl,
                createdAt: doc.data().createdAt.seconds,
                category: doc.data().category,
                categoryName:
                  categorys.find(
                    (category) => category.value === doc.data().category
                  )?.label || doc.data().category,
              };
            });
          })
        );
        setSites(a);
      } catch (error) {
        console.log("firebaseエラー:" + error);
      }
    })();
  }, [showModal]);
  console.log(sites);

  return (
    <AdminTemplate title="サイト一覧">
      <div>
        <Link to="/admin/adminSiteAdd">新規登録</Link>
      </div>
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
            <TableCell>
              {sites.findIndex(({ id }) => id === row.id) + 1}
            </TableCell>
            <TableCell>{row.siteName}</TableCell>
            <TableCell>{row.url}</TableCell>
            <TableCell>{row.siteIntroduction}</TableCell>
            <TableCell>
              <img src={row.imageUrl} height="60" alt="" />
            </TableCell>
            <TableCell>{row.categoryName}</TableCell>
            <TableCell>
              {new Date(row.createdAt * 1000).toLocaleString()}
            </TableCell>
            <TableCell>
              <Link to="/admin/adminDetail" onClick={() => setContext(row)}>
                <BorderColorIcon color="primary" />
              </Link>
            </TableCell>
            <TableCell>
              <IconButton onClick={() => DeleteModalShow(row)}>
                <DeleteIcon color="primary" />
              </IconButton>
              <DeleteModal showFlag={showModal} setShowModal={setShowModal} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </AdminTemplate>
  );
};

export default AdminPage;
