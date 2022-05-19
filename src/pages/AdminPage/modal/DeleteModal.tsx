import { useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button, Grid } from "@material-ui/core";
import { SiteContext } from "../../../contexts/context";
import { doc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { store, storage } from "../../../config/firebase";

const useStyles = makeStyles(() =>
  createStyles({
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.3)",
    },
    modal: {
      width: "30%",
      padding: "1em",
      margin: "18% 42%",
      background: "#fff",
      borderRadius: "10px",
    },
  })
);

const DeleteModal = (props: any) => {
  const classes = useStyles();
  const { detail } = useContext(SiteContext);
  const closeModal = () => {
    props.setShowModal(false);
  };

  const deleteSite = async () => {
    try {
      await deleteDoc(doc(store, "sites", detail.id));
      const desertRef = ref(storage, "image/" + detail.imageName);
      await deleteObject(desertRef);
    } catch (e) {
      console.log("Error Delete", e);
    }
    closeModal();
  };

  return (
    <>
      {props.showFlag ? (
        <div className={classes.overlay}>
          <div className={classes.modal}>
            <p>削除しますか？</p>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => deleteSite()}
                >
                  OK
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => closeModal()}
                >
                  close
                </Button>
              </Grid>
            </Grid>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DeleteModal;
