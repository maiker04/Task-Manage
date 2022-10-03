import './App.css';
import * as React from 'react';
import { useState, useRef } from 'react';
import Input from './formulario/Input';
import useFormulario from './formulario/useformulario';
import Card from './formulario/Card';
import Container from './formulario/Container';
import Buttonfor from './formulario/Buttonfor';
import Descript from './formulario/descrip';
import * as Allimages from './images';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Home() {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [formulario, handlechange, reset] = useFormulario({
        title: '',
        description: ''
    })
    const [inputTitleEdit, setInputTitleEdit] = useState("")
    const [inputDescEdit, setInputDescEdit] = useState("")

    const handlechangeEditTitle = (event) => {
        setInputTitleEdit(event.target.value)
    }
    const handlechangeEditDesc = (event) => {
        setInputDescEdit(event.target.value)

    }
    const submitEdit = (index) => {
        console.log(index)
        console.log(inputTitleEdit)
        console.log(inputDescEdit)

        setUsuarios(usuarios => {
            return usuarios.map((item, j) => {
                return j === index ? { title: inputTitleEdit, description: inputDescEdit } : item
            })
        })
        handleClose();
    }
    const EditClickOpen = () => {
        setOpen(true);
        setEdit(true);
    };
    const handleClickOpen = () => {
        setOpen(true);
        setEdit(false);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const submit = e => {
        e.preventDefault()
        setUsuarios([
            ...usuarios,
            formulario
        ])
        reset();
    }
    const DeleteItem = (indexItem) => {
        setUsuarios((prevState) =>
            prevState.filter((index) => index.title !== indexItem.title)
        );
    };
    return (
        <div style={{ height: '100vh' }}>
            <Container>
                <Card>
                    <h1 className='logo__container'>Task Manage</h1>
                    <form onSubmit={submit} className='form-agg'>
                        <Input
                            name="title"
                            placeholder="Titulo"
                            value={formulario.title}
                            onChange={handlechange} />
                        <Descript
                            name="description"
                            placeholder="Descripción"
                            value={formulario.description}
                            onChange={handlechange} />
                        <Buttonfor>Guardar</Buttonfor>
                    </form>
                </Card>
                <Card>
                    <ul>
                        {usuarios.map((x, index) =>
                            <li key={x.title} className='list__card'>
                                <div>
                                    <p className='list__card__info'>{`${x.title}`}</p>
                                    <p className='list__card__descrip'>{`${x.description}`}</p>
                                </div>
                                <div className="icon-options">
                                    <img src={Allimages.ver} onClick={handleClickOpen} />
                                    <img src={Allimages.editar} onClick={EditClickOpen} />
                                    <img src={Allimages.eliminar} onClick={() => DeleteItem(x)} />
                                </div>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                    className='modal__task'
                                >
                                    <DialogActions className='buttons__modal'>
                                        <Button onClick={handleClose} autoFocus>
                                            <img src={Allimages.eliminar} />
                                        </Button>
                                    </DialogActions>
                                    {edit === false ?
                                        <div>
                                            <DialogTitle id="alert-dialog-title" style={{ textAlign: 'center', fontWeight: 'bold' }} >
                                                {`${x.title}`}
                                            </DialogTitle>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description" className='list__card__descrip__See'>
                                                    {`${x.description}`}
                                                </DialogContentText>
                                            </DialogContent>
                                        </div>
                                        :
                                        <div>
                                            <DialogContent>
                                                <DialogContentText id="alert-dialog-description">
                                                    <div>
                                                        <Input
                                                            name="title"
                                                            placeholder={x.title}
                                                            onChange={handlechangeEditTitle}
                                                            style={{ color: 'black' }} />
                                                        <Descript
                                                            name="description"
                                                            placeholder={x.description}
                                                            onChange={handlechangeEditDesc}
                                                            style={{ color: 'black' }} />
                                                        <Buttonfor onClick={() => submitEdit(index)}>Guardar</Buttonfor>
                                                    </div>
                                                </DialogContentText>
                                            </DialogContent>
                                        </div>
                                    }
                                </Dialog>
                            </li>)}
                    </ul>
                </Card>
            </Container>
        </div>
    );
}

export default Home;
