import React, { Component } from 'react'
import { Modal } from 'react-materialize';
import { Button } from 'react-materialize';

class TextEditSidebar extends Component {
    constructor(props) {
        super(props);

        this.handleTextValueChange = this.handleTextValueChange.bind(this);

        // WE'LL MANAGE THE UI CONTROL
        // VALUES HERE
        this.state = {
            textValue : this.props.logo.text,
            textColor : this.props.logo.textColor,
            fontSize : this.props.logo.fontSize,
            backColor : this.props.logo.backColor,
            borderColor : this.props.logo.borderColor,
            borderRadius : this.props.logo.borderRadius,
            borderThickness : this.props.logo.borderThickness,
            padding : this.props.logo.padding,
            margin : this.props.logo.margin
        }
    }

    componentDidUpdate = (prevProps) => {
        console.log("componentdidUpdate");
        console.log(this.props);
        console.log(prevProps);
        if (this.propsChanged(prevProps)){
            console.log("propsToState Called");
            this.propsToState();
        }
    }

    propsChanged(prevProps)
    {
        if (this.props.logo.text != prevProps.logo.text){return true;}
        if (this.props.logo.textColor != prevProps.logo.textColor){return true;}
        if (this.props.logo.fontSize != prevProps.logo.fontSize){return true;}
        if (this.props.logo.backColor != prevProps.logo.backColor){return true;}
        if (this.props.logo.borderColor != prevProps.logo.borderColor){return true;}
        if (this.props.logo.borderRadius != prevProps.logo.borderRadius){return true;}
        if (this.props.logo.borderThickness != prevProps.logo.borderThickness){return true;}
        if (this.props.logo.padding != prevProps.logo.padding){return true;}
        if (this.props.logo.margin != prevProps.logo.margin){return true;}
        return false;
    }

    handleUndo = () => {
        this.props.undoCallback();

        console.log("handleUndo here ");
        console.log(this.props);
    }

    handleRedo = () => {
        this.props.redoCallback();
    }

    handleText = () => {
        this.props.editTextCallback();
    }

    handleTextColorChange = (event) => {
        console.log(this.state);
        console.log("handleTextColorChange to " + event.target.value);
        console.log("---");
        this.setState({ textColor: event.target.value }, this.completeUserEditing);
    }

    handleFontSizeChange = (event) => {
        console.log(this.state);
        console.log("handleTextColorChangeComplete to " + event.target.value);
        console.log("---");
        this.setState({ fontSize: event.target.value }, this.completeUserEditing);
    }

    handleTextValueChange = (event) => {
        if(this.canSave())
        {
            console.log(this.state);
            console.log("handleTextValueChange to "+ this.text.value);
            console.log("---");
            this.setState({ textValue: this.text.value}, this.completeUserEditing);
        }
        else{
            this.text.value = "";
        }
    }

    handleBackColorChange = (event) => {
        console.log("handleBackColorChange to " + event.target.value);
        this.setState({ backColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderColorChange = (event) => {
        console.log("handleBorderColorChange to " + event.target.value);
        this.setState({ borderColor: event.target.value }, this.completeUserEditing);
    }

    handleBorderRadiusChange = (event) => {
        console.log("handleBorderRadiusChange to " + event.target.value);
        this.setState({ borderRadius: event.target.value }, this.completeUserEditing);
    }

    handleBorderThicknessChange = (event) => {
        console.log("handleBorderThicknessChange to " + event.target.value);
        this.setState({ borderThickness: event.target.value }, this.completeUserEditing);
    }

    handlePaddingChange = (event) => {
        console.log("handlePaddingChange to " + event.target.value);
        this.setState({ padding: event.target.value }, this.completeUserEditing);
    }

    handleMarginChange = (event) => {
        console.log("handleMarginChange to " + event.target.value);
        this.setState({ margin: event.target.value }, this.completeUserEditing);
    }

    completeUserEditing = () => {
        console.log("completeUserEditing");
        console.log("this.state.textColor: " + this.state.textColor);
        console.log(this.state);
        this.props.changeLogoCallback(this.props.logo, this.props.logo.key, this.state.textValue, this.state.textColor, this.state.fontSize, this.state.backColor, this.state.borderColor, this.state.borderRadius, this.state.borderThickness, this.state.padding, this.state.margin);
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

    propsToState()
    {
        this.setState({ textValue:this.props.logo.text, 
            textColor:this.props.logo.textColor,
            fontSize:this.props.logo.fontSize,
            backColor:this.props.logo.backColor,
            borderColor:this.props.logo.borderColor,
            borderRadius:this.props.logo.borderRadius,
            borderThickness:this.props.logo.borderThickness,
            padding:this.props.logo.padding,
            margin:this.props.logo.margin
        })
    }

    render() {
        console.log("Text Edit Side Bar Render Called");
        console.log(this.state);
        console.log(this.props);
        let undoDisabled = !this.props.canUndo();
        let redoDisabled = !this.props.canRedo();
        let undoClass = "waves-effect waves-light btn-small";
        let redoClass = "waves-effect waves-light btn-small";
        let saveClass = "waves-effect waves-light btn-small";
        if (undoDisabled)
            undoClass += " disabled";
        if (redoDisabled)
            redoClass += " disabled";
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
                            <div className="col s6">{this.props.logo.fontSize}pts</div>
                            <div className="col s8">
                                <input type="range" min="4" max="144" 
                                    onChange={this.handleFontSizeChange}
                                    value={this.props.logo.fontSize} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Background Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleBackColorChange}
                                        value={this.props.logo.backColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Color:</div>
                            <div className="col s8">
                                <input type="color"
                                        onChange={this.handleBorderColorChange}
                                        value={this.props.logo.borderColor}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Radius:</div>
                            <div className="col s6">{this.props.logo.borderRadius}pts</div>
                            <div className="col s8">
                                <input type="range" min="0" max="100" 
                                    onChange={this.handleBorderRadiusChange}
                                    value={this.props.logo.borderRadius} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Border Thickness:</div>
                            <div className="col s6">{this.props.logo.borderThickness}pts</div>
                            <div className="col s8">
                                <input type="range" min="0" max="50" 
                                    onChange={this.handleBorderThicknessChange}
                                    value={this.props.logo.borderThickness} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Padding:</div>
                            <div className="col s6">{this.props.logo.padding}pts</div>
                            <div className="col s8">
                                <input type="range" min="0" max="100" 
                                    onChange={this.handlePaddingChange}
                                    value={this.props.logo.padding} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s4">Margin:</div>
                            <div className="col s6">{this.props.logo.margin}pts</div>
                            <div className="col s8">
                                <input type="range" min="0" max="100" 
                                    onChange={this.handleMarginChange}
                                    value={this.props.logo.margin} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TextEditSidebar