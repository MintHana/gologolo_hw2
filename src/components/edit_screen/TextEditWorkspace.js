import React, { Component } from 'react'

// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class TextEditWorkspace extends Component {
    render() {
        const styles = {
            container: {
                position:"absolute",
                "border-style": "solid",
                color: this.props.logo.textColor,
                fontSize: this.props.logo.fontSize + "pt",
                backgroundColor: this.props.logo.backColor,
                "border-color":this.props.logo.borderColor,
                "border-radius":this.props.logo.borderRadius + "pt",
                "border-width":this.props.logo.borderThickness +"pt",
                padding:this.props.logo.padding + "pt",
                margin:this.props.logo.margin + "pt"
            }
        }
        return (
            <div className="col s8" style={{overflow: 'auto'}}>
                <div style={ styles.container }>
                    {this.props.logo.text}
                </div>
            </div>
        )
    }
}

export default TextEditWorkspace