import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteBook = () => {
        props.deleteBook(props.book_id);
    };

    return (
        <div>
            <button type="button" className="btn btn-danger" onClick={handleClickOpen}>Delete</button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">Delete book</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete <b>{props.book_name}</b> ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose} className="btn btn-secondary">
                        Cancel
                    </button>
                    <button onClick={handleDeleteBook} className="btn btn-danger">
                        Delete
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}