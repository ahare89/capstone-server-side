import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Button, Table } from "reactstrap"
import { getMessagesForUser } from "../../managers/messageManager";

export const Messages = ({loggedInUser}) => {

    const navigate = useNavigate();

    const [myMessages, setMyMessages] = useState([])

    useEffect(() => {
        getMessagesForUser(loggedInUser.id).then(setMyMessages);
    },[])

    console.log(myMessages)

    return (
        <>
        <h4>Messages</h4>
        <Table>
            <thead>
                <tr>
                    <th>From</th>
                    <th>Subject</th>
                    <th>Content</th>
                </tr>
            </thead>
            <tbody>
               {myMessages.map(m => <>
               <td key={m.id}>{m.senderId}</td>
               <td>{m.subject}</td>
               <td>{m.content}</td>
               </>)}
            </tbody>
        </Table>

        <Button onClick={() => {navigate("/newmessage")}}className="btn btn-success">Compose a Message</Button>
        </>
    )

}