import React, { Component } from 'react'
import { Modal } from 'react-materialize';
import { Button } from 'react-materialize';

class TextEditSidebar extends Component {
    constructor() {
        super();

        this.handleTextValueChange = this.handleTextValueChange.bind(this);

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            textValue : "goLogoLo Logo",
            textColor : "#FF0000",
            fontSize : 24
        }
    }

    handleUndo = () => {
        this.props.undoCallback();
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    handleText = () => {
        this.props.editTextCallback();
    }

    handleTextColorChange = (event) => {
        console.log("handleTextColorChange to " + event.target.value);
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log("handleTextColorChangeComplete to " + event.target.value);
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    }

    handleTextValueChange = (event) => {
        if(this.canSave())
        {
            console.log("handleTextValueChange to "+ this.text.value);
            this.setState({ textValue: this.text.value}, this.completeUserEditing);
        }
        else{
            this.text.value = "";
        }
    }

    completeUserEditing = () => {
        console.log("completeUserEditing");
        console.log("this.state.textColor: " + this.state.textColor);
        this.props.changeLogoCallback(this.props.logo, this.props.logo.key, this.state.textValue, this.state.textColor, this.state.fontSize);
    }

    canSave()
    {
        if(this.text.value.length == 0)
            return false;
        else
        {
            for(var i = 0; i < this.text.value.length; i++)
            {
                if(this.text.value.substring(i, i+1) != " ")
                    return true;
            }
            return false;
        }
    }

    render() {
        let undoDisabled = !this.props.canUndo();
        let redoDisabled = !this.props.canRedo();
        let undoClass = "waves-effect waves-light btn-small";
        let redoClass = "waves-effect waves-light btn-small";
        let saveClass = "waves-effect waves-light btn-small";
        if (undoDisabled)
            undoClass += " disabled";
        if (redoDisabled)
            redoClass += " disabled";
            console.log(this.state);
        return (
            <div className="card-panel col s4">
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <Modal
                        actions={[
                            //<Button flat modal="close" node="button" waves="green">Ok</Button>,
                            <button className={saveClass} onClick={this.handleTextValueChange}>Save</button>,
                            <Button flat modal="close" node="button" waves="green">Close</Button>
                        ]}
                        bottomSheet={false}
                        fixedFooter={false}
                        header="Changing the Logo Text"
                        id="modal-0"
                        options={{
                            dismissible: true,
                            endingTop: '10%',
                            inDuration: 200,
                            onCloseEnd: null,
                            onCloseStart: null,
                            onOpenEnd: null,
                            onOpenStart: null,
                            opacity: 0.5,
                            outDuration: 200,
                            preventScrolling: true,
                            startingTop: '0%'
                        }}
                        trigger={<Button node="button">&#9998;</Button>}
                        >
                        <p>
                            <div>
                                Please type a text for the logo.
                                <input id = "Text" type = "text" ref={(c) => this.text = c} class = "validate" required/>
                                <label class="active" for="Text">Logo Text</label>
                            </div>
                        </p>
                        </Modal>
                        <button className={undoClass} onClick={this.handleUndo}>Undo</button>
                        <button className={redoClass} onClick={this.handleRedo}>redo</button>
                    </div>
                </div>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Text</span>
                        <div className="row">
                            <div className="col s4">Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleTextColorChange}
                                        value={this.props.logo.textColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Font Size:</div>
                            <div className="col s8">
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleFontSizeChange}
                                    value={this.props.logo.fontSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextEditSidebar