import React, {useState, useEffect} from "react";
/*
export default function UserStatus(props){
    const [ isOnline, setIsOnline ] = useState(null)

    useEffect( ()=>{

        function handlerStateChange( state ){ setIsOnline( state.isOnline );}

        ServerAPI.subscribeUserStatus(props.user.id, handlerStateChange );
        return () => { ServerAPI.unsubscribeUserStatus(props.user.id, handlerStateChange)}

    } )

    if(isOnline == null){ return '대기중...'}
    return isOnline ? '온라인' : '오프라인';

    return (
        <li style={{color : isOnline ? 'green' : 'black'}}>
            {props.user.name}
        </li>
    )
}
*/

function useUserStatus(userID){
    const [ isOnline, setIsOnline ] = useState(null);

    useEffect( ()=>{

        function handlerStateChange( state ){ setIsOnline( state.isOnline );}

        ServerAPI.subscribeUserStatus(props.user.id, handlerStateChange );
        return () => { ServerAPI.unsubscribeUserStatus(props.user.id, handlerStateChange)}

    } )
    return isOnline;
}

function UserStatus(props){
    const isOnline = useUserStatus(props.user.id);
    if(isOnline==null){
        return '대기중...';
    }
    return isOnline ? '온라인' : '오프라인';
}


function UserListItem(props){
    const isOnline = useUserStatus(props.user.id)
    return (
        <li style={{color : isOnline ? 'green' : 'black'}}>
            {props.user.name}
        </li>
    )
}
