import React, { useEffect, useState } from 'react';
import { Auth, storage, database } from './../firebase';
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    function givePosts(setPosts) {
        let temp = [];
        const unSubscribe = database.posts.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            //console.log('invoked');
            temp = [];
            let promises = [];
            querySnapshot.forEach((doc) => {
                promises.push(database.users.doc(doc.data().userId).get().then(snapshot => {
                    //console.log(snapshot);
                    //console.log(snapshot.data());
                    let data = {
                        ...doc.data(), postId: doc.id, uProfileUrl: snapshot.data().profileUrl,
                        uName: snapshot.data().name
                    };
                    temp.push(data);
                }));
            });
            Promise.all(promises).then(() => {
                //console.log(temp);
                setPosts(temp);
            })
        });
        return unSubscribe;
    }
    // database.users.doc(user.uid).onSnapshot((snapshot) => {
    //     let uid = snapshot.data().uid;
    //     postIds = snapshot.data().postIds;
    //     //console.log(postIds);
    //     database.users.doc(uid).update({
    //         postIds: postIds ? [...postIds, ref.id] : [ref.id]
    //     });
    // });
    function givePostLikes(postId, setLikes) {
        console.log(postId);
        database.posts.doc(postId).onSnapshot((snapshot) => {
            setLikes(snapshot.data().likes);
        })
    }

    function giveUserLikeStatus(postId, setUserLikeStatus) {
        database.posts.doc(postId).onSnapshot((snapshot) => {
            if (snapshot.data().likes.includes(user.uid))
                setUserLikeStatus(true);
            else
                setUserLikeStatus(false);
        });
    }

    function changeUserLikeStatus(postId, userLikeStatus, setUserLikeStatus) {
        if (userLikeStatus === false) {

            // database.users.doc(uid).get().then(snapshot=>{
            //     return snapshot.data().profileUrl;
            // });

            database.posts.doc(postId).get().then((snapshot) => {
                let likes = snapshot.data().likes;
                //console.log(likes);//console.log(user.uid);
                //console.log([...likes,user.uid]);
                database.posts.doc(postId).update({
                    likes: [...likes, user.uid],
                }).then(() => {
                    setUserLikeStatus(true);
                });
            });

        } else {
            database.posts.doc(postId).get().then((snapshot) => {
                let likes = [...snapshot.data().likes];
                likes.splice(likes.indexOf(user.uid), 1);
                database.posts.doc(postId).update({
                    likes: likes,
                }).then(() => {
                    setUserLikeStatus(false);
                }).catch((error) => {
                    //console.log(error);
                })
            })
        }
    }

    async function giveUserData(userId, setUserData) {
        database.users.doc(userId).onSnapshot((snapshot) => {
            console.log(snapshot);
            console.log(snapshot.data());
            setUserData(snapshot.data());
        });
    }

    async function givePostsByUserId(postIds, setUserPosts) {
        let temp = [];
        for (let i = 0; i < postIds.length; i++) {
            let postData = await database.posts.doc(postIds[i]).get();
            let t = postData.data();
            t.postId = postIds[i];
            temp.push(t);
        }
        setUserPosts(temp);
    }

    async function getUserProfileUrlByUserId(uid) {
        // database.users.doc(uid).get().then(snapshot=>{
        //     return snapshot.data().profileUrl;
        // });
        let res = await database.users.doc(user.uid).get();
        return res.profileUrl;
    }

    function signUp(email, password) {
        //console.log('sdfw');
        //console.log(email);
        //console.log(password);
        return Auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        //console.log('sdifow');
        return Auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return Auth.signOut();
    }

    async function upload(file, uid, name, email) {
        const uploadTask = storage.ref(`/data/${uid}/profileImg`).put(file);

        const progressFun = (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log(`Upload is ${progress} done.`);
        };
        const errorFun = (error) => {
            throw error;
        };
        const successFun = async () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async (url) => {
                //console.log(url);
                await addUserData(uid, name, email, url);
            });
        };
        uploadTask.on("state_changed", progressFun, errorFun, successFun);
    };

    function addComment(data, postId) {

        // database.users.doc(uid).update({
        //         postIds: postIds ? [...postIds, ref.id] : [ref.id]
        //     });
        console.log(postId);
        database.posts.doc(postId).get().then(snapshot => {
            console.log({ name: user.name, comment: data })
            console.log({})
            console.log(snapshot);
            console.log(snapshot.data());
            database.users.doc(user.uid).get().then(user => {
                database.posts.doc(postId).update({
                    comments: snapshot.data().comments ? [...snapshot.data().comments, { name: user.data().name, comment: data }] : [{ name: user.data().name, comment: data }]
                });
            });
        });
    }

    async function uploadVideo(uid, file, setLoading) {
        const uploadTask = storage.ref(`/post/${uid}/${file.name}`).put(file);

        const progressFun = (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //console.log(`Upload is ${progress} done.`);
        };
        const errorFun = (error) => {
            throw error;
        };
        const successFun = async () => {
            uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                //console.log(url);
                let obj = {
                    likes: [],
                    comments: [],
                    pId: uid,
                    pUrl: url,
                    userId: user.uid,
                    createdAt: database.getTimeStamp()
                };
                //console.log(obj);
                database.posts.add(obj).then((ref) => {
                    let postIds = [];

                    // onSnapshot atteched eventlistener 
                    // database.users.doc(user.uid).onSnapshot((snapshot) => {
                    //     let uid = snapshot.data().uid;
                    //     postIds = snapshot.data().postIds;
                    //     //console.log(postIds);
                    //     database.users.doc(uid).update({
                    //         postIds: postIds ? [...postIds, ref.id] : [ref.id]
                    //     });
                    // });
                    database.users.doc(user.uid).get().then(snapshot => {
                        let uid = snapshot.data().uid;
                        postIds = snapshot.data().postIds;
                        //console.log(postIds);
                        database.users.doc(uid).update({
                            postIds: postIds ? [...postIds, ref.id] : [ref.id]
                        }).then(() => {
                            setLoading(false);
                            return;
                        });
                    })
                });
            });
        };
        uploadTask.on("state_changed", progressFun, errorFun, successFun);
    };


    const addUserData = async (uid, name, email, profileUrl) => {
        let res = await database.users.doc(uid).set({ uid: uid, name: name, email: email, profileUrl: profileUrl, createdAt: database.getTimeStamp() });
    }

    useEffect(() => {
        const unSubscribe = Auth.onAuthStateChanged(
            (user) => {
                //console.log(user);

                setUser(user);
            }
        );
        return () => unSubscribe();
    }, []);

    const store = {
        user, signUp, login, logout, upload, addUserData, uploadVideo, givePosts, getUserProfileUrlByUserId, givePostLikes, giveUserLikeStatus, changeUserLikeStatus, addComment, givePostsByUserId, giveUserData
    }

    return (
        <AuthContext.Provider value={store} >
            {!loading && children}
        </AuthContext.Provider>
    )
}