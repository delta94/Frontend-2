import React, { Fragment } from 'react';

import {
    Row, Col, Button,
    ListGroup, ListGroupItem
} from 'reactstrap';
import { Translate } from 'react-jhipster';

import Dropzone from 'react-dropzone'

class ButtonUpload extends React.Component {
    constructor() {
        super()
        this.state = {
            files: [],
            isClick : false
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
        const files = this.state.files.map(file => (
            <ListGroupItem key={file.name}>
                {file.name} - {file.size} bytes
            </ListGroupItem>
        ))
        return (
            <Col md="12">
            <Dropzone
                onDrop={this.onDrop.bind(this)}
                onFileDialogCancel={this.onCancel.bind(this)}
            >
                {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className="dropzone-content">
                            <Button replace color="info" onClick = {this.onClick}>
                                <span className="d-none d-md-inline">
                                    <Translate contentKey="entity.action.upload">Upload</Translate>
                                </span>
                            </Button>
                        </div>
                    </div>
                )}
            </Dropzone>
            <ListGroup>
                            {this.props.onClick(name === 'button' ? files : files)}
                        </ListGroup>
            </Col>
        )
    }
}

export default ButtonUpload;