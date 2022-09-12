import React from "react";
import ChangeList from "./ChangeList";
import TestList from "./TestList";

interface MainProps {
    
}
 
interface MainState {
    display: string
}
 
class MainView extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        this.setState({display: "TESTS"})
    }

    render() { 
        return this.display();
    }

    display() {
       
    }

}
 
export default MainView;