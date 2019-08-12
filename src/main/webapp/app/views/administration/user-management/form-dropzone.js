import React, { Fragment } from 'react';

import {
    Row, Col,
    ListGroup, ListGroupItem
} from 'reactstrap';

import Dropzone from 'react-dropzone'

class FormDropZone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            files: []
        }
    }

    onDrop(files) {
        this.setState({ files });
    }

    onCancel() {
        this.setState({
            files: []
        });
    }


    render() {
        var path = require('path');
        

        return (
            <Fragment>
                <Row>
                    <Col md="12">
                        <div className="dropzone-wrapper dropzone-wrapper-lg">
                            <Dropzone
                                onDrop={this.onDrop.bind(this)}
                                onFileDialogCancel={this.onCancel.bind(this)}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <div className="dropzone-content">
                                            <p>Try dropping some files here, or click to select files to upload.</p>
                                            <p>File must be excel</p>
                                        </div>
                                    </div>
                                )}
                            </Dropzone>
                        </div>
                    </Col>
                    <Col md="12">
                      
                        <ListGroup>
                            {this.state.files.map((file, index) => {
                                if (path.extname(file.path) !== ".xls") {
                                    
                                      return  ''
                                  
                                } else {
                                    
                                    return <label> {path.extname(file.path)} </label>
                                   
                                }
                            }
                            )}                          
                        </ListGroup>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}

export default FormDropZone;