import React, { useState } from 'react'
import authContext from './authContext';
import { collection, addDoc } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";


const AuthState = (props) => {

    const [teamDetails, setTeamDetails] = useState({
        teamName: '',
        score: '',
        bids_left: '',
        questionsID: [],
    })
    const [questionsDetails, setQuestionsDetails] = useState([])
    const getTeamDetails = async () => {
        const docRef = doc(db, "users", `${localStorage.getItem("team-id")}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const DATA = docSnap.data()
            console.log("Document data:", DATA.teamName);
            setTeamDetails({
                teamName: DATA.teamName,
                score: DATA.score,
                bids_left: DATA.bids_left,
                questionsID: [...DATA.questions_ID],
            })
            // DATA.questions_ID.map(async (question: any) => {
            //     const docRef = doc(db, "questions", `${question}`);
            //     const docSnap = await getDoc(docRef);
            //     if (docSnap.exists()) {
            //         const DATAQuestions = docSnap.data()
            //         const questionDetailsWithId = { id: question, ...DATAQuestions };
            //         console.log(questionDetailsWithId)
            //         setQuestionsDetails((prevDetails) => [...prevDetails, questionDetailsWithId]);
            //         // setQuestionsDetails([...new Set(questionsDetails)])
            //     } else {
            //         console.log("No such document!");
            //     }
            // })
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    return (
        <authContext.Provider value={{ getTeamDetails, teamDetails, setTeamDetails,questionsDetails }}>
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;