import React from 'react';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {connect} from 'react-redux';

const DeleteModal = ({confirm, unset, toDelete, body, history}) => {
    return (
        <Modal isOpen={true}>
        <ModalHeader>Please confirm deletion</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
            <button className='btn btn-default' onClick={() => unset()}>Cancel</button>
            <button className='btn btn-primary' onClick={(history) => confirm(toDelete, history)}>Delete</button>
        </ModalFooter>
    </Modal>
    )
}

const mapStateToProps = (state, {confirm, unset, toDelete, body, history}) => {
    return {
        confirm,
        unset,
        toDelete,
        body,
        history
    };
};

export default connect(mapStateToProps)(DeleteModal);
