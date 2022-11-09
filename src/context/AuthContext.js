import React, { useEffect, useState } from 'react';
import { Auth, storage,database } from './../firebase';
export const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState();

    function signUp(email, password) {
        console.log('sdfw');
        console.log(email);
        console.log(password);
        return Auth.createUserWithEmailAndPassword(email, password);
    }

    function login(email, password) {
        console.log('sdifow');
        return Auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return Auth.signOut();
    }

    async function upload(file,uid,name,email) {
        const uploadTask = storage.ref(`/data/${uid}/profileImg`).put(file);

        const progressFun = (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress} done.`);
        };
        const errorFun = (error) => {
            throw error;
        };
        const successFun = async () => {
            uploadTask.snapshot.ref.getDownloadURL().then(async(url) => {
                console.log(url);
                await addUserData(uid,name,email,url);
            });
        };
        uploadTask.on("state_changed", progressFun, errorFun, successFun);
    };

    const addUserData = async (uid,name,email,profileUrl) => {
        let res = await database.users.doc(uid).set({ uid:uid, name:name,email: email,profileUrl: profileUrl ,createdAt : database.getTimeStamp()});
    }

    useEffect(() => {
        const unSubscribe = Auth.onAuthStateChanged(
            (user) => {
                console.log(user.email);
                setUser(user); setLoading(false);
            }
        );

        return () => unSubscribe();

    }, []);

    const store = {
        user, signUp, login, logout, upload, addUserData
    }

    return (
        <AuthContext.Provider value={store} >
            {!loading && children}
        </AuthContext.Provider>
    )
}