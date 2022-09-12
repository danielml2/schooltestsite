import React from "react";
import { loadChanges } from "../../../firebase/firebase"

interface ChangeListProps {
    
}
 
interface ChangeListState {
    
}
 
class ChangeList extends React.Component<ChangeListProps, ChangeListState> {

    render() { 
        return <div></div>;
    }

    async componentDidMount() {
        await loadChanges(15,(snasphot) => { console.log(snasphot)});
    }
}
 
export default ChangeList;