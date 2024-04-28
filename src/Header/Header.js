import Display from "../Display/Display";
import './header.css'
import { Component} from "react";
class Header extends Component {
    state  = {
        output : {},
        searchInput : '',
        arr1: []
    }
    
    showFile = async (event) => {
            event.preventDefault()
            const reader = new FileReader()
            reader.onload = async (event) => {
                const text = (event.target.result)
                const result = text.split(/\r?\n/)
                this.setState({output: result})
                
            }
            reader.readAsText(event.target.files[0])
            
    }
    readInput = (event) => {
        const inputValue = event.target.value 
        this.setState((prevState) => ({...prevState, searchInput: inputValue}))
    }
    displayDetails = () => {
        let arr = []
        const {output, searchInput} = this.state
        const ouputLen = Object.keys(output).length
        for (let i = 0; i < ouputLen; i ++) {
            let resultStr = ""
            const str = i.toString()
             resultStr = output[str]
            const isContains = resultStr.includes(searchInput)
            console.log(isContains)
            if (isContains === true) {
                arr.push(resultStr)
                
            }
           
        }

        this.setState((prevState) => ({...prevState, arr1: arr}))
    }
    render() {
        const {arr1,output} = this.state
        const initialString = output['0']
        console.log(arr1)
        return (
            <div className="mainContainer">
                <div className="inputContainer">
                <label htmlFor="chooseFile" className="chooseLabel">Click Button to Choose File</label>
                <br />
                <input type="file" onChange={this.showFile} id="chooseFile"  className="chooseInput"/>
                <label htmlFor="search" className="searchLabel">Enter Input</label>
                <input type = "search" onChange={this.readInput} id="search" className="searchInput"/>
                <br />
                <button type="button" onClick={this.displayDetails} className="button">Search</button>
   
                </div>
                <div className="displayContainer"> 
                <div className="headerContainer">
                    <h1 className="header">{initialString}</h1>
                </div>            
                <ol className="listOrder">
                        {arr1.map((eachValue) => (
                            <Display value = {eachValue} />
                        ))}
                </ol>
                </div>
            </div>
        )
    }
}
export default Header