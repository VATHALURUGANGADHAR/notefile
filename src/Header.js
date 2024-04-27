import Display from "./Display";
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
        const {output, searchInput, arr1} = this.state
        const ouputLen = Object.keys(output).length
        for (let i = 0; i < ouputLen; i ++) {
            const str = i.toString()
            const resultStr = output[str]
            const isContains = resultStr.includes(searchInput)
            if (isContains === true) {
                this.setState((prevState) => ({...prevState, arr1: [...arr1, resultStr]}))
            }
           
        }
    }
    render() {
        const {arr1} = this.state
        console.log(arr1)
        return (
            <div>
                <input type="file" onChange={this.showFile} />
                <input type = "search" onChange={this.readInput} />
                <button type="button" onClick={this.displayDetails}>Search</button>
                <ul>
                        {arr1.map((eachValue) => (
                            <Display value = {eachValue} />
                        ))}
                </ul>
            </div>
        )
    }
}
export default Header