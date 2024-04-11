import React, { useEffect, useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { getDoc, doc } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Test = () => {

    const [index, setIndex] = useState(31)

    useEffect(() => {
        console.log("Next " + index)

    }, [index])



    const handleClick = async () => {
        await setDoc(doc(db, "questions", `${index}`), {
            title: "Maximum Depth of Binary Tree",
            description: "Given the root of a binary tree, return its maximum depth.",
            difficulty: "Easy",
            testCases: [
              {
                input: {root: {val: 3, left: {val: 9, left: null, right: null}, right: {val: 20, left: {val: 15, left: null, right: null}, right: {val: 7, left: null, right: null}}}},
                output: 3
              },
              {
                input: {root: {val: 1, left: null, right: {val: 2, left: null, right: null}}},
                output: 2
              },
              {
                input: {root: {val: 5, left: {val: 3, left: {val: 9, left: null, right: null}, right: {val: 8, left: null, right: null}}, right: {val: 10, left: null, right: {val: 4, left: null, right: null}}}},
                output: 3
              }
            ],
            constraints: [
              "The number of nodes in the tree is in the range [0, 104]",
              "-100 <= Node.val <= 100"
            ]
          }
          



        )

        // await setDoc(doc(db, "users", "team_1"), {

        //     teamName:"Team-Cosmos",
        //     password:"cosmos123",
        //     questions_ID:["1","10"],
        //     bids_left:900,
        //     score:100
        // })
        setIndex((prev) => prev + 1);
        console.log("Done")




        // )
    }
    const getiing = async () => {
        const q = query(collection(db, "users"), where("teamName", "==", "Team-Cosmos"));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id);
        });
        // const docRef = doc(db, "users", "team_1");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        //     const DATA = docSnap.data()
        //     console.log("Document data:", DATA.id);
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        // }
    }

    return (

        <div>
            <div>
                <button onClick={handleClick}>Add</button>
            </div>
            <div>
                <button onClick={getiing}>get</button>
            </div>


        </div>
    )
}

export default Test