import "./App.css";
import Post from "./Post";
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [modalStyle] = React.useState(getModalStyle);
  const [openSignIn, setOpenSignIn] = useState(false);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //Giriş Yaptı
        console.log(authUser);
        setUser(authUser);
      } else {
        //Çıkış Yaptı
        setUser(null);
      }
    });
    return () => {
      unSubscribe();
    };
  }, [user, username]);

  useEffect(() => {
    db.collection("posts").onSnapshot((snapshot) => {
      // Sürekli Olarak dokümanı izler her değişiklikte buraya yansır
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then()
      .catch((error) => {
        alert(error.message);
      });
    setOpenSignIn(false);
  };

  return (
    <div className="app">
      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input
                placeholder={"Email"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder={"Şifre"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type={"submit"} onClick={signIn}>
                Giriş Yap
              </Button>
            </form>
          </div>
        }
      </Modal>
      <Modal open={open} onClose={() => setOpen(false)}>
        {
          <div style={modalStyle} className={classes.paper}>
            <form className="app__signup">
              <center>
                <img
                  className="app__headerImage"
                  src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  alt=""
                />
              </center>
              <Input
                placeholder={"Kullanıcı Adı"}
                type={"text"}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder={"Email"}
                type={"email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                placeholder={"Şifre"}
                type={"password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type={"submit"} onClick={signUp}>
                Kayıt Ol
              </Button>
            </form>
          </div>
        }
      </Modal>
      <div className="app__header">
        <img
          className="app__headerImage"
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
        />
      </div>
      {user ? (
        <Button onClick={() => auth.signOut()}>Çıkış Yap</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Giriş Yap</Button>
          <Button onClick={() => setOpen(true)}>Kayıt Ol</Button>
        </div>
      )}
      <h2>Emircan Dalman Instagram Clone</h2>
      {posts.map(({ id, post }) => (
        <Post
          key={id}
          username={post.username}
          caption={post.caption}
          imageUrl={post.imageUrl}
        />
      ))}
    </div>
  );
}

export default App;
